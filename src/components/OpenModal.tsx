import { useModalStateStore } from "@/store/useModalStateStore";

export default function OpenModalButton() {
  const { isModalOpen, setModalOpen } = useModalStateStore();

  const setOpenModal = () => {
    setModalOpen();
  };

  return (
    <>
      <button
        type="button"
        onClick={setOpenModal}
        className="bg-primary p-2 rounded-xl mt-4 border border-secondary active:bg-emphasize"
      >
        선택
      </button>
    </>
  );
}
