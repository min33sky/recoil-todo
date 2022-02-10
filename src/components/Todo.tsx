import { motion } from 'framer-motion';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Caterogies, ITodo, todoState } from '../atoms/todoAtom';

const Container = styled(motion.li)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid silver;
  background-color: whitesmoke;
  color: black;
  padding: 8px;
  margin-bottom: 1rem;

  span {
    font-weight: 700;
  }

  &:last-child {
    margin-bottom: 0;
  }
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
    <Container
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, top: 0 }}
      exit={{ opacity: 0 }}
    >
      <span>{text}</span>
      <div>
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
      </div>
    </Container>
  );
}

export default React.memo(Todo);
