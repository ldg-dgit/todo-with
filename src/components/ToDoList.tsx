import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface ITodo {
  text: string;
  id: number;
  category: "TODO" | "DOING" | "DONE";
}

const todoState = atom<ITodo[]>({
  key: "todo",
  default: [],
});

interface IForm {
  todo: string;
}

function TodoList() {
  const [todos, setTodos] = useRecoilState(todoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ todo }: IForm) => {
    setTodos((oldTodos) => [{ text: todo, id: Date.now(), category: "TODO" }, ...oldTodos]);
    setValue("todo", "");
  };
  return (
    <div>
      <h1>to do with</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("todo", { required: "Please write a To do." })}
          placeholder='Write a to do'
        />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
