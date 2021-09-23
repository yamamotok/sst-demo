import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppData } from './AppDataProvider';

export const AddMessage: React.FC = observer(() => {
  const [message, setMessage] = useState<string>('');
  const appData = useAppData();

  function onMessageChange(message: string) {
    setMessage(message);
  }

  async function post() {
    appData.postMessage(message);
  }

  if (!appData.currentBoard) {
    return null;
  }
  return (
    <div className="container">
      <h4>Post message on &quot;{appData.currentBoard.name}&quot;</h4>
      <label>
        <input
          placeholder="Message"
          onChange={(e) => onMessageChange(e.target.value)}
          value={message}
        />{' '}
        <button onClick={() => post()}>Post</button>
      </label>
    </div>
  );
});
