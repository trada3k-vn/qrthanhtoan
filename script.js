const config = {
  qrImageUrl:
    "https://plain-apac-prod-public.komododecks.com/202607/19/AGtBD1LZKIQW5X58Pfcm/image.png",
  transferNote: "Tên facebook của bạn (Không dấu)",
  brandTitle: "Thanh toán QR",
  downloadFileName: "ma-qr-thanh-toan.jpg"
};

const qrImage = document.getElementById("qr-image");
const qrError = document.getElementById("qr-error");
const transferNote = document.getElementById("transfer-note");
const confirmBtn = document.getElementById("confirm-btn");
const modal = document.getElementById("instruction-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const acknowledgeBtn = document.getElementById("acknowledge-btn");

const focusableSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
let lastFocusedElement = null;

document.title = config.brandTitle;
transferNote.textContent = config.transferNote;
qrImage.src = config.qrImageUrl;

qrImage.addEventListener("load", () => {
  qrError.hidden = true;
  qrImage.hidden = false;
});

qrImage.addEventListener("error", () => {
  qrImage.hidden = true;
  qrError.hidden = false;
});

confirmBtn.addEventListener("click", () => {
  openModal();
});

closeModalBtn.addEventListener("click", closeModal);
acknowledgeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.closeModal === "true") {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
    return;
  }

  if (event.key === "Tab" && !modal.hidden) {
    trapFocus(event);
  }
});

function openModal() {
  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeModalBtn.focus();
}

function closeModal() {
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function trapFocus(event) {
  const focusableElements = [...modal.querySelectorAll(focusableSelector)].filter(
    (element) => !element.hasAttribute("disabled")
  );

  if (!focusableElements.length) {
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}
