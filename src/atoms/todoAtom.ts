import { atom, selector } from 'recoil';

export enum Caterogies {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export interface ITodo {
  text: string;
  id: number;
  category: Caterogies;
}

export const todoState = atom<ITodo[]>({
  key: 'todos',
  default: [],
});

export const categoryState = atom<Caterogies>({
  key: 'todoCategory',
  default: Caterogies.TO_DO,
});

export const todoSelector = selector({
  key: 'todoSelector',
  get: ({ get }) => {
    const toDos = get(todoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
