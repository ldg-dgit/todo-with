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

function TodoList() {
  const { register } = useForm();

  return (
    <div>
      <form>
        <input {...register("todo")} placeholder='Write a to do' />
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
