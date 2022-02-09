import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState, todoState } from '../atoms/todoAtom';

const Form = styled.form`
  display: flex;
  margin-bottom: 1rem;

  input {
    flex-grow: 1;
    outline: none;
    padding: 2px 4px;
    font-size: 1.2rem;
  }
`;

export interface IForm {
  toDo: string;
}

function CreateTodo() {
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = (data: IForm) => {
    //? Atom에 상태값을 추가하고 localStorage에도 값을 저장한다.
    setTodos((prev) => [{ text: data.toDo, id: Date.now(), category }, ...prev]);
    if (localStorage.getItem('recoilTodos')) {
      localStorage.setItem(
        'recoilTodos',
        JSON.stringify([
          { text: data.toDo, id: Date.now(), category },
          ...JSON.parse(localStorage.getItem('recoilTodos')!),
        ])
      );
    } else {
      localStorage.setItem(
        'recoilTodos',
        JSON.stringify([{ text: data.toDo, id: Date.now(), category }])
      );
    }
    setValue('toDo', '');
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        type="text"
        {...register('toDo', {
          required: 'Write a To Do',
        })}
      />
      <button type="submit">Add</button>
    </Form>
  );
}

export default CreateTodo;
