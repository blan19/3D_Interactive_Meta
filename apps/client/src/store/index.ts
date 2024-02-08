import { create } from 'zustand';

interface AvatarState {
  url: null | string;
  createAvatar: (url: string) => void;
}

interface UserState {
  id: string;
  updateId: (url: string) => void;
}

interface CharactersState {
  world: any[];
  updateWorld: (characters: any) => void;
}

const useAvatarStore = create<AvatarState>((set) => ({
  url: null,
  createAvatar: (newUrl: string) => set(() => ({ url: newUrl })),
}));

const useUserStore = create<UserState>((set) => ({
  id: '',
  updateId: (newId: string) => set(() => ({ id: newId })),
}));

const useWorldStore = create<CharactersState>((set) => ({
  world: [],
  updateWorld: (newWorld: any) => set(() => ({ world: newWorld })),
}));

export { useAvatarStore, useUserStore, useWorldStore };
