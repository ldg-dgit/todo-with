import { useRecoilValue } from "recoil";
import { todoState } from "./atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

function TodoList() {
  const todos = useRecoilValue(todoState);
  return (
    <div>
      <h1>to do with</h1>
      <br />
      <CreateTodo />
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
