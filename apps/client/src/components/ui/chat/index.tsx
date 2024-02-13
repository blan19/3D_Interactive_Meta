import { useState } from 'react';
import { useChatFocusStore, useUserStore } from '../../../store';
import { socket } from '../../../lib/socket';

const Chat = () => {
  const { id } = useUserStore((state) => state);
  const [chat, setChat] = useState('');
  const { updateFocus } = useChatFocusStore((state) => state);

  const onSubmit = () => {
    socket.emit('chat', chat);
    setChat('');
  };
  return (
    <div
      className={`${
        id ? 'absolute' : 'hidden'
      } bottom-4 right-[50%] z-[998] flex translate-x-2/4 flex-col items-center justify-end `}
    >
      <form
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <input
          className="w-[200px] rounded p-2"
          type="text"
          placeholder="chat"
          value={chat}
          onChange={(event) => {
            setChat(event.target.value);
          }}
          onFocus={() => updateFocus(true)}
          onBlur={() => updateFocus(false)}
        />
        <button
          className="w-[50px] rounded bg-white"
          type="button"
          onClick={() => {
            if (!chat.length) return;
            onSubmit();
          }}
        >
          <span>보내기</span>
        </button>
      </form>
    </div>
  );
};

export default Chat;
