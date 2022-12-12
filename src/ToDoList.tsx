import React, { useState } from "react";
import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [todo, setTodo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={todo} onChange={onChange} placeholder='Write a to do' />
        <button>Add</button>
      </form>
    </div>
  );
} */

interface IFormData {
  todo: string;
  errors: {
    todo: {
      message: string;
    };
  };
}

function TodoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      todo: "Here!",
    },
  });
  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <span>{errors?.todo?.message}</span>
        <input
          {...register("todo", { required: "todo is required" })}
          placeholder='Write a to do'
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
