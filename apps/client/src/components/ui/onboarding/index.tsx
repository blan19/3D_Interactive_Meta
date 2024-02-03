import { useState } from 'react';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import { config } from '../../../lib/config';
import { useAvatarStore } from '../../../store';

const OnBoarding = () => {
  const { url, createAvatar } = useAvatarStore((state) => state);
  const [avatarMode, setAvatarMode] = useState(false);

  return (
    <div
      className={`${
        url ? 'hidden' : 'fixed'
      } left-0 top-0 z-[998] h-screen w-screen bg-black`}
    >
      <form className="flex h-full w-full flex-col items-center justify-center gap-3">
        <input
          className="rounded px-3 py-2"
          type="text"
          placeholder="닉네임을 입력해주세요."
        />
        <button onClick={() => setAvatarMode(true)} type="button">
          <a>
            <span className="text-lg text-white">다음</span>
          </a>
        </button>
        {avatarMode && (
          <AvatarCreator
            className="fixed left-0 top-0 z-[999] h-full w-full"
            subdomain={config.env.VITE_PUBLIC_AVATAR_DOMAIN}
            config={config.avatar}
            onAvatarExported={(event) => {
              const avatarUrl = event.data.url + '?meshlod=1&quality=medium';
              createAvatar(avatarUrl);
              setAvatarMode(false);
            }}
          />
        )}
      </form>
    </div>
  );
};

export default OnBoarding;
