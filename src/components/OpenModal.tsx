import { useModalStateStore } from "@/store/useModalStateStore";

export default function OpenModalButton() {
  const { isModalOpen, setModalOpen } = useModalStateStore();

  return (
    <>
      <button
        type="button"
        onClick={setModalOpen}
        className="bg-primary p-2 rounded-xl mt-4 border border-secondary active:bg-emphasize"
      >
        선택
      </button>
    </>
  );
}
