import React, { useContext, useMemo } from 'react';
import { autorun, makeAutoObservable, observable, runInAction } from 'mobx';
import axios from 'axios';

export interface Board {
  boardId: string;
  name: string;
}

export interface Message {
  messageId: string;
  message: string;
}

class AppData {
  currentBoard: Board | undefined = undefined;
  boards: Board[] = [];
  messages: Message[] = [];

  constructor() {
    makeAutoObservable(this, {
      currentBoard: observable.ref,
      boards: observable.ref,
      messages: observable.ref,
    });
    autorun(() => {
      if (this.currentBoard) this.loadMessages();
    });
  }

  setCurrentBoard(board: Board): void {
    this.messages = [];
    this.currentBoard = board;
  }

  async loadBoards(): Promise<void> {
    const endpoint = `${process.env.REACT_APP_API_URL}/boards`;
    const { data } = await axios.get(endpoint);
    runInAction(() => (this.boards = data.boards));
  }

  async addBoard(name: string): Promise<void> {
    const endpoint = `${process.env.REACT_APP_API_URL}/boards`;
    await axios.post(endpoint, { name });
    setTimeout(() => this.loadBoards(), 200);
  }

  async loadMessages(): Promise<void> {
    if (!this.currentBoard) {
      return;
    }
    const boardId = this.currentBoard.boardId;
    const endpoint = `${process.env.REACT_APP_API_URL}/boards/${boardId}`;
    const { data } = await axios.get(endpoint);
    runInAction(() => (this.messages = data.messages));
  }

  async postMessage(message: string): Promise<void> {
    if (!this.currentBoard) {
      return;
    }
    const boardId = this.currentBoard.boardId;
    const endpoint = `${process.env.REACT_APP_API_URL}/boards/${boardId}`;
    await axios.post(endpoint, { message });
    setTimeout(() => this.loadMessages(), 200);
  }
}

const Context = React.createContext<AppData | undefined>(undefined);

export const AppDataProvider: React.FC = (props) => {
  const instance = useMemo(() => new AppData(), []);
  return <Context.Provider value={instance}>{props.children}</Context.Provider>;
};

export const useAppData = (): AppData => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('Context is not ready yet');
  }
  return context;
};
