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
  extraError?: string;
}

function TodoList() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      todo: "Here!",
    },
  });
  const onValid = (data: any) => {
    if (data.todo === "Here!") {
      setError("todo", { message: "It is Default Value." }, { shouldFocus: true });
    }
    //setError("extraError", { message: "Server offline." });
  };
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <span>{errors?.todo?.message}</span>
        <input
          {...register("todo", {
            required: "Todo is required",
            validate: {
              badword: (value) => (value.includes("Bad") ? "no bad words allowed" : true),
              badword2: (value) => (value.includes("bad") ? "no bad words allowed" : true),
            },
          })}
          placeholder='Write a to do'
        />
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default TodoList;
