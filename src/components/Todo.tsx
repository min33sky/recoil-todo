import { motion } from 'framer-motion';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Caterogies, ITodo, todoState } from '../atoms/todoAtom';

const Container = styled(motion.li)`
  /* TODO */
`;

function Todo({ text, category, id }: ITodo) {
  const setTodos = useSetRecoilState(todoState);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newCategory = e.currentTarget.name;
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            category: newCategory as Caterogies,
          };
        }
        return todo;
      })
    );

    if (localStorage.getItem('recoilTodos')) {
      const localTodos = JSON.parse(localStorage.getItem('recoilTodos')!) as ITodo[];
      const updatedTodos = localTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            category: newCategory as Caterogies,
          };
        }
        return todo;
      });
      localStorage.setItem('recoilTodos', JSON.stringify(updatedTodos));
    }
  };

  const deleteTodo = () => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    if (localStorage.getItem('recoilTodos')) {
      const localTodos = JSON.parse(localStorage.getItem('recoilTodos')!) as ITodo[];
      localStorage.setItem(
        'recoilTodos',
        JSON.stringify(localTodos.filter((prev) => prev.id !== id))
      );
    }
  };

  return (
    <Container layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <span>{text}</span>
      {category !== Caterogies.DOING && (
        <button name="DOING" onClick={handleClick}>
          Doing
        </button>
      )}
      {category !== Caterogies.TO_DO && (
        <button name="TO_DO" onClick={handleClick}>
          To Do
        </button>
      )}
      {category !== Caterogies.DONE && (
        <button name="DONE" onClick={handleClick}>
          Done
        </button>
      )}
      <button onClick={deleteTodo}>삭제</button>
    </Container>
  );
}

export default Todo;
