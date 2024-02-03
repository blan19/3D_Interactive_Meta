import { type AvatarCreatorConfig } from '@readyplayerme/react-avatar-creator';

interface Config {
  avatar: AvatarCreatorConfig;
}

export const config: Config = {
  avatar: {
    clearCache: true,
    bodyType: 'fullbody',
    quickStart: false,
    language: 'kr',
  },
};
