import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { todoState } from "./atoms";

interface IForm {
  todo: string;
}

function CreateTodo() {
  const setTodos = useSetRecoilState(todoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ todo }: IForm) => {
    setTodos((oldTodos) => [{ text: todo, id: Date.now(), category: "TODO" }, ...oldTodos]);
    setValue("todo", "");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("todo", { required: "Please write a To do." })}
        placeholder='Write a to do'
      />
      <button>Add</button>
    </form>
  );
}

export default CreateTodo;
