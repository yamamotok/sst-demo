import React from 'react';
import { observer } from 'mobx-react-lite';
import { useAppData } from './AppDataProvider';

export const MessageList: React.FC = observer(() => {
  const appData = useAppData();

  if (!appData.currentBoard) {
    return null;
  }
  return (
    <div className="container">
      <h4>Messages on &quot;{appData.currentBoard.name}&quot;</h4>
      {appData.messages.map((m) => {
        return <p key={m.messageId}>{m.message}</p>;
      })}
    </div>
  );
});
