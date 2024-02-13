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

interface ChatFoucsState {
  focus: boolean;
  updateFocus: (focus: boolean) => void;
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

const useChatFocusStore = create<ChatFoucsState>((set) => ({
  focus: false,
  updateFocus: (focus: boolean) => set(() => ({ focus })),
}));

export { useAvatarStore, useUserStore, useWorldStore, useChatFocusStore };
