import { useForm } from "react-hook-form";

interface IForm {
  todo: string;
}

function TodoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    console.log(data.todo);
    setValue("todo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("todo", { required: "Please write a To do." })}
          placeholder='Write a to do'
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
