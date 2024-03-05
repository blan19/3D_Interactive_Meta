import { type FormEvent, useState } from 'react';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import { config } from '../../../lib/config';
import { useAvatarStore } from '../../../store';
import { socket } from '../../../lib/socket';

const OnBoarding = () => {
  const { url, createAvatar } = useAvatarStore((state) => state);
  const [avatarMode, setAvatarMode] = useState(false);
  const [nickname, setNickname] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nickname.length) {
      alert('닉네임을 입력해주세요');
      return;
    }

    setAvatarMode(true);
  };

  return (
    <div
      className={`${
        url ? 'hidden' : 'fixed'
      } left-0 top-0 z-[998] h-screen w-screen bg-black`}
    >
      <form
        className="flex h-full w-full flex-col items-center justify-center gap-3"
        onSubmit={onSubmit}
      >
        <input
          className="rounded px-3 py-2"
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
        <button className="rounded bg-white px-3 py-1" type="submit">
          <a>
            <span className="text-lg font-bold text-black">다음</span>
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
              socket.emit('worldJoin', nickname, avatarUrl);
              setAvatarMode(false);
            }}
          />
        )}
      </form>
    </div>
  );
};

export default OnBoarding;
