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
  characters: any[];
  updateCharacters: (characters: any) => void;
}

const useAvatarStore = create<AvatarState>((set) => ({
  url: null,
  createAvatar: (newUrl: string) => set(() => ({ url: newUrl })),
}));

const useUserStore = create<UserState>((set) => ({
  id: '',
  updateId: (newId: string) => set(() => ({ id: newId })),
}));

const useCharactersStore = create<CharactersState>((set) => ({
  characters: [],
  updateCharacters: (newCharacters: any) =>
    set((state) => ({ characters: [...state.characters, newCharacters] })),
}));

export { useAvatarStore, useUserStore, useCharactersStore };
