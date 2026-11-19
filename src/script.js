(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const video = $("video"), canvas = $("scanCanvas"), ctx = canvas.getContext("2d", { willReadFrequently: true });
  const startBtn = $("startBtn"), stopBtn = $("stopBtn"), switchBtn = $("switchCameraBtn");
  const placeholder = $("cameraPlaceholder"), overlay = $("scanOverlay"), cameraError = $("cameraError"), resultCard = $("resultCard"), imageInput = $("imageInput");
  let stream = null, scanTimer = null, activeFacing = "user", detected = false, currentPayload = "", toastTimer = null;
  const appPackages = { phonepe: "com.phonepe.app", paytm: "net.one97.paytm", gpay: "com.google.android.apps.nbu.paisa.user" };
  $("year").textContent = new Date().getFullYear();
  function toast(message) {
    const el = $("toast"); el.textContent = message; el.classList.add("show"); clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 3000);
  }
  function stopCamera() {
    if (scanTimer) { clearInterval(scanTimer); scanTimer = null; }
    if (stream) { stream.getTracks().forEach(track => track.stop()); stream = null; }
    video.pause(); video.srcObject = null; video.style.display = "none"; placeholder.hidden = false; overlay.hidden = true;
    stopBtn.disabled = true; startBtn.disabled = false; switchBtn.disabled = true;
    startBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>Start scanning';
  }
  async function startCamera(facing = "user") {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showCameraError("Camera access is not available. Open this site using HTTPS or localhost in a recent Chrome browser."); return;
    }
    if (!window.jsQR) { showCameraError("The QR scanning library could not load. Check your internet connection and reload."); return; }
    stopCamera(); cameraError.hidden = true; startBtn.disabled = true; startBtn.textContent = "Opening camera…";
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { ideal: facing }, width: { ideal: 1280 }, height: { ideal: 720 } } });
      activeFacing = facing; video.srcObject = stream; video.style.display = "block"; placeholder.hidden = true; overlay.hidden = false;
      await video.play(); stopBtn.disabled = false; switchBtn.disabled = false; startBtn.disabled = true; startBtn.textContent = "Scanning…";
      scanTimer = setInterval(scanVideoFrame, 180);
    } catch (error) {
      stopCamera(); let message = "Could not access the camera.";
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") message = "Camera permission was denied. Allow camera access for this website in browser settings, then retry.";
      else if (error.name === "NotFoundError" || error.name === "OverconstrainedError") message = "No suitable camera was found on this device.";
      else if (error.name === "NotReadableError") message = "The camera is busy in another app. Close other camera apps and retry.";
      showCameraError(message);
    }
  }
  function showCameraError(message) { cameraError.textContent = message; cameraError.hidden = false; placeholder.hidden = true; startBtn.disabled = false; startBtn.textContent = "Try camera again"; }
  function scanVideoFrame() {
    if (detected || video.readyState !== video.HAVE_ENOUGH_DATA || !video.videoWidth) return;
    const scale = Math.min(1, 900 / video.videoWidth); canvas.width = Math.round(video.videoWidth * scale); canvas.height = Math.round(video.videoHeight * scale);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(image.data, image.width, image.height, { inversionAttempts: "attemptBoth" });
    if (code && code.data) handlePayload(code.data);
  }
  function parseUpi(raw) {
    let uri; try { uri = new URL(raw.trim()); } catch (_) { return null; }
    if (uri.protocol.toLowerCase() !== "upi:" || uri.hostname.toLowerCase() !== "pay") return null;
    const p = uri.searchParams, pa = p.get("pa") || "", pn = p.get("pn") || "", am = p.get("am") || "", cu = p.get("cu") || "INR", tn = p.get("tn") || "";
    const validVpa = /^[A-Za-z0-9._-]{2,256}@[A-Za-z0-9.-]{2,64}$/.test(pa);
    return { raw, pa, pn, am, cu, tn, validVpa };
  }
  function handlePayload(raw) {
    if (detected) return; detected = true; currentPayload = raw; stopCamera(); renderResult(raw);
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function formatAmount(value, currency) {
    const n = Number(value); if (!Number.isFinite(n)) return value + " " + currency;
    try { return new Intl.NumberFormat("en-IN", { style: "currency", currency: currency || "INR" }).format(n); }
    catch (_) { return value + " " + (currency || "INR"); }
  }
  function renderResult(raw) {
    const d = parseUpi(raw);
    $("merchantName").textContent = d && d.pn ? d.pn : (d && d.pa ? "UPI recipient" : "QR code scanned");
    $("merchantVpa").textContent = d && d.pa ? d.pa : "";
    $("amountRow").hidden = !(d && d.am); $("amountValue").textContent = d && d.am ? formatAmount(d.am, d.cu) : "";
    $("noteRow").hidden = !(d && d.tn); $("noteValue").textContent = d && d.tn ? d.tn : "";
    $("nonUpiWarning").hidden = !!(d && d.validVpa);
    $("handoffNote").textContent = d && d.validVpa
      ? "The selected payment app will receive this UPI link if it supports external UPI intents. Verify the recipient and amount inside the payment app before entering your UPI PIN."
      : "This QR is not a validated UPI payment address. You can copy its contents, but payment-app handoff may not work.";
    resultCard.hidden = false; resultCard.dataset.validUpi = d && d.validVpa ? "true" : "false"; refreshPreferredButton();
  }
  function buildIntent(raw, packageName) {
    if (!/^upi:\/\/pay\?/i.test(raw.trim())) return null;
    const afterScheme = raw.trim().replace(/^upi:\/\//i, "");
    return "intent://" + afterScheme + "#Intent;scheme=upi" + (packageName ? ";package=" + packageName : "") + ";end";
  }
  const appLabels = { phonepe: "PhonePe", paytm: "Paytm", gpay: "Google Pay", any: "Other UPI app" };
  const preferenceKey = "frontpay.preferredPaymentApp";
  const preferredPayBtn = $("preferredPayBtn"), changePreferredBtn = $("changePreferredBtn"), paymentModal = $("paymentModal");
  function getPreferredApp() {
    try { const value = localStorage.getItem(preferenceKey); return Object.hasOwn(appLabels, value) ? value : null; }
    catch (_) { return null; }
  }
  function savePreferredApp(app) {
    try { localStorage.setItem(preferenceKey, app); return true; }
    catch (_) { toast("Could not save your preference in this browser."); return false; }
  }
  function refreshPreferredButton() {
    const preferred = getPreferredApp();
    preferredPayBtn.textContent = preferred ? "Pay with " + appLabels[preferred] : "Choose payment app";
    changePreferredBtn.hidden = !preferred;
  }
  function openPaymentApp(app) {
    const d = parseUpi(currentPayload);
    if (!d || !d.validVpa) { toast("This QR is not a valid UPI payment QR."); return; }
    const target = app === "any" ? currentPayload : buildIntent(currentPayload, appPackages[app]);
    if (!target) { toast("This UPI QR format cannot be opened directly."); return; }
    $("handoffNote").textContent = "Opening " + appLabels[app] + ". If it does not open, change your preferred app or copy the payment link. Confirm all details in your payment app.";
    window.location.href = target;
  }
  function openPaymentChooser() {
    const saved = getPreferredApp(), choice = saved || "phonepe";
    document.querySelectorAll('input[name="paymentApp"]').forEach(input => { input.checked = input.value === choice; });
    $("rememberPaymentApp").checked = true;
    paymentModal.hidden = false;
    $("paymentModalContinue").focus();
  }
  function closePaymentChooser() { paymentModal.hidden = true; preferredPayBtn.focus(); }
  preferredPayBtn.addEventListener("click", () => {
    const preferred = getPreferredApp();
    if (preferred) openPaymentApp(preferred); else openPaymentChooser();
  });
  changePreferredBtn.addEventListener("click", openPaymentChooser);
  $("paymentModalContinue").addEventListener("click", () => {
    const selected = document.querySelector('input[name="paymentApp"]:checked');
    if (!selected) { toast("Choose a payment app to continue."); return; }
    const app = selected.value;
    if ($("rememberPaymentApp").checked) savePreferredApp(app);
    refreshPreferredButton();
    paymentModal.hidden = true;
    openPaymentApp(app);
  });
  $("paymentModalCancel").addEventListener("click", closePaymentChooser);
  $("paymentModalClose").addEventListener("click", closePaymentChooser);
  paymentModal.querySelector("[data-close-modal]").addEventListener("click", closePaymentChooser);
  document.addEventListener("keydown", event => { if (event.key === "Escape" && !paymentModal.hidden) closePaymentChooser(); });
  refreshPreferredButton();
  async function scanImage(file) {
    if (!file) return;
    if (!window.jsQR) { toast("QR scanner library did not load. Check your internet connection."); return; }
    try {
      const bitmap = await createImageBitmap(file), maxSide = 1800, scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
      canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height); if (bitmap.close) bitmap.close();
      const image = ctx.getImageData(0, 0, canvas.width, canvas.height), code = jsQR(image.data, image.width, image.height, { inversionAttempts: "attemptBoth" });
      if (!code || !code.data) { toast("No QR code found in that image. Try a clearer image."); return; }
      detected = false; handlePayload(code.data);
    } catch (_) { toast("Could not read this image. Try another image format."); }
    finally { imageInput.value = ""; }
  }
  startBtn.addEventListener("click", () => startCamera("user"));
  stopBtn.addEventListener("click", stopCamera);
  switchBtn.addEventListener("click", () => startCamera(activeFacing === "user" ? "environment" : "user"));
  imageInput.addEventListener("change", event => scanImage(event.target.files[0]));

  $("copyUpiBtn").addEventListener("click", async () => {
    if (!currentPayload) return;
    try { await navigator.clipboard.writeText(currentPayload); toast("QR contents copied."); }
    catch (_) { toast("Clipboard access unavailable in this browser."); }
  });
  function resetResult() { resultCard.hidden = true; currentPayload = ""; detected = false; }
  $("closeResultBtn").addEventListener("click", resetResult);
  $("scanAgainBtn").addEventListener("click", () => { resetResult(); startCamera("user"); });
  window.addEventListener("pagehide", stopCamera);
})();
