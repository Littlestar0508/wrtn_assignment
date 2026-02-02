import { create } from "zustand";

type ModalState = {
  isModalOpen: boolean;

  setIsModalOpen: () => void;
  setModalOpen: () => void;
  setModalClose: () => void;
};

export const useModalStateStore = create<ModalState>()((set) => ({
  isModalOpen: false,

  setIsModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  setModalOpen: () => set(() => ({ isModalOpen: true })),
  setModalClose: () => set(() => ({ isModalOpen: false })),
}));
