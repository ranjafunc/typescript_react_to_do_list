import React, {
  useContext,
  createContext,
  useState,
  FC,
  useEffect,
} from "react";
import { ToDo, TodoContextType } from "../type";

const ToDoContext = createContext<TodoContextType | null>(null);

export const useTodoContext = (): TodoContextType => {
  return useContext(ToDoContext) as TodoContextType;
};

const TodosProvider: FC<React.ReactNode> = ({ children }) => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  const addTodo = (todo: ToDo) => {
    setTodos((prev) => prev.concat(todo));
  };

  const updateTodo = (id: number, content: string) => {
    setTodos((prev) =>
      prev.map((todo, i) => {
        return todo.id === id ? { ...todo, content } : todo;
      })
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const checkTodo = (id: number, status: boolean) => {
    setTodos((prev) =>
      prev.map((todo, i) => {
        return todo.id === id ? { ...todo, status } : todo;
      })
    );
  };

  useEffect(() => {
    console.table(todos);
  }, [todos]);

  const value = {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    checkTodo,
  };

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
};

export default TodosProvider;
