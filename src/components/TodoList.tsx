import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, Caterogies, todoSelector } from '../atoms/todoAtom';
import CreateTodo from './CreateTodo';
import Todo from './Todo';

function TodoList() {
  const todos = useRecoilValue(todoSelector);

  const [category, setCategory] = useRecoilState(categoryState);

  const handleInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const category = e.currentTarget.value as Caterogies;
    setCategory(category);
  };

  return (
    <div>
      <h1>Todos</h1>
      <hr />

      <select onInput={handleInput} value={category}>
        <option value={Caterogies.TO_DO}>TO DO</option>
        <option value={Caterogies.DOING}>DOING</option>
        <option value={Caterogies.DONE}>DONE</option>
      </select>

      <CreateTodo />

      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
}

export default TodoList;
