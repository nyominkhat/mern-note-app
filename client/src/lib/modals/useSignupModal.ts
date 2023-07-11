import { create } from "zustand";

interface SignupModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useSignupModal = create<SignupModal>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useSignupModal;
