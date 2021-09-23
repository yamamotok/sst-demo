import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppData } from './AppDataProvider';

export const AddBoard: React.FC = observer(() => {
  const [name, setName] = useState<string>('');
  const appData = useAppData();

  function onNameChanged(name: string) {
    setName(name);
  }

  async function create() {
    if (!name) return;
    appData.addBoard(name);
  }

  return (
    <div className="container">
      <h4>Create new board</h4>
      <label>
        <input
          placeholder="Board name"
          onChange={(e) => onNameChanged(e.target.value)}
          value={name}
        />{' '}
        <button onClick={() => create()}>Create</button>
      </label>
    </div>
  );
});
