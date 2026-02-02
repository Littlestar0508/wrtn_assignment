import { useModalStateStore } from "@/store/useModalStateStore";
import { useEffect, useRef } from "react";

export default function Modal() {
  const { setModalClose } = useModalStateStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    overlayRef.current?.focus();
  }, []);
  return (
    <>
      <div
        className="bg-black/50 fixed inset-0 flex items-center justify-center"
        ref={overlayRef}
        role="button"
        tabIndex={0}
        aria-label="모달 닫기"
        onClick={setModalClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") setModalClose();
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-modal rounded-2xl p-6 border-2 border-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          모달 내용
        </div>
      </div>
    </>
  );
}
