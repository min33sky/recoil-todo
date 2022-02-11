import { atom, selector } from 'recoil';

export enum Caterogies {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export interface ITodo {
  id: number;
  text: string;
  category: Caterogies;
}

export const todoState = atom<ITodo[]>({
  key: 'todos',
  default: [],
  effects: [
    ({ onSet, node, setSelf }) => {
      const data = localStorage.getItem(node.key);
      if (data !== null) {
        setSelf(JSON.parse(data));
      }

      onSet((newValue) => {
        localStorage.setItem(node.key, JSON.stringify(newValue));
      });
    },
  ],
});

export const categoryState = atom<Caterogies>({
  key: 'todoCategory',
  default: Caterogies.TO_DO,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        console.debug('select Category: ', newValue);
      });
    },
  ],
});

export const todoSelector = selector({
  key: 'todoSelector',
  get: ({ get }) => {
    const toDos = get(todoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
