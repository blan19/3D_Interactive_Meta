import { create } from 'zustand';

interface AvatarState {
  url: null | string;
  createAvatar: (url: string) => void;
}

const useAvatarStore = create<AvatarState>((set) => ({
  url: null,
  createAvatar: (newUrl: string) => set(() => ({ url: newUrl })),
}));

export { useAvatarStore };
