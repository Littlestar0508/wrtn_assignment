import { useModalStateStore } from "@/store/useModalStateStore";
import { useUserSettingStore } from "@/store/useUserSettingStore";

export default function OpenModalButton({ year }: { year: number }) {
  const { setYear } = useUserSettingStore();
  const { setModalOpen } = useModalStateStore();

  const setOpenModal = () => {
    setYear(year);
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
