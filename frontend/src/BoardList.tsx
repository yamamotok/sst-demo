import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Board, useAppData } from './AppDataProvider';

export const BoardList: React.FC = observer(() => {
  const appData = useAppData();

  function switchBoard(board: Board) {
    appData.setCurrentBoard(board);
  }

  useEffect(() => {
    appData.loadBoards();
  }, []);

  return (
    <div className="container">
      <h4>Board list ({appData.boards.length})</h4>
      <div className="row row-cols-auto board-buttons">
        {appData.boards.map((b) => {
          return (
            <div className="col" key={b.boardId}>
              <button className="btn btn-light" onClick={() => switchBoard(b)}>
                {b.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
});
