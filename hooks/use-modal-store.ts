import { create } from 'zustand';

export type ModalType = 'image' | 'video';

interface ModalData {
  content?: { src: string; name: string };
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () =>
    set({ type: null, isOpen: false, data: { content: undefined } }),
}));
