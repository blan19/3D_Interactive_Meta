import { type AvatarCreatorConfig } from '@readyplayerme/react-avatar-creator';

interface Config {
  avatar: AvatarCreatorConfig;
  env: ImportMetaEnv;
}

export const config: Config = {
  avatar: {
    clearCache: true,
    bodyType: 'fullbody',
    quickStart: false,
    language: 'kr',
  },
  env: import.meta.env,
};
