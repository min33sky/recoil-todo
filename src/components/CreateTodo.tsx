import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, todoState } from '../atoms/todoAtom';

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
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        type="text"
        {...register('toDo', {
          required: 'Write a To Do',
        })}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default CreateTodo;