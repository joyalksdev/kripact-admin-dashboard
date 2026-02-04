import { useEffect } from "react";

const Modal = ({
  open,
  onClose,
  children,
  closeOnOutsideClick = true,
  closeOnEsc = true,
}) => {
  useEffect(() => {
    if (!closeOnEsc) return;

    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, closeOnEsc]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => closeOnOutsideClick && onClose?.()}
      />

      {/* modal */}
      <div
        className="relative w-full max-w-3xl mx-4 bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl p-6 animate-in fade-in zoom-in duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
