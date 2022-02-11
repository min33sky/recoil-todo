import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { categoryState, Caterogies, todoSelector } from '../atoms/todoAtom';
import CreateTodo from './CreateTodo';
import Todo from './Todo';

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;

  height: 500px;
  /* overflow: hidden; */

  padding: 20px;
  border: 1px solid white;
  border-radius: 10px;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Select = styled(motion.select)`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  outline: none;
`;

const Divider = styled.hr`
  width: 100%;
  color: white;
  margin-bottom: 2rem;
`;

const List = styled(motion.ul)`
  overflow-y: auto;
  /* overflow-y: hidden; */

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: orange;
  }
`;

function TodoList() {
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const handleInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const category = e.currentTarget.value as Caterogies;
    setCategory(category);
  };

  return (
    <Background>
      <Container>
        <Title>TODO</Title>

        <Select onInput={handleInput} value={category}>
          <option value={Caterogies.TO_DO}>TO DO</option>
          <option value={Caterogies.DOING}>DOING</option>
          <option value={Caterogies.DONE}>DONE</option>
        </Select>

        <CreateTodo />

        <Divider />

        <List layout layoutScroll>
          <AnimatePresence>
            {todos.map((todo) => (
              <Todo key={todo.id} {...todo} />
            ))}
          </AnimatePresence>
        </List>
      </Container>
    </Background>
  );
}

export default TodoList;
