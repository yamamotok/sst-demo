import React from 'react';
import { BoardList } from './BoardList';
import { AddBoard } from './AddBoard';
import { AppDataProvider } from './AppDataProvider';
import { MessageList } from './MessageList';
import { AddMessage } from './AddMessage';
import './App.css';

function App() {
  return (
    <AppDataProvider>
      <div className="App">
        <BoardList />
        <hr />
        <AddBoard />
        <hr />
        <MessageList />
        <hr />
        <AddMessage />
      </div>
    </AppDataProvider>
  );
}

export default App;
