import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  selectedTodoId: number | null;
  onSelect: (todo: Todo | null) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodoId,
  onSelect,
}) => {
  return (
    <table>
      <tbody>
        {todos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={todo.completed ? 'has-background-info-light' : ''}
          >
            <td>{todo.title}</td>
            <td>
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  ✔
                </span>
              )}
              <i
                data-cy="selectButton"
                className={
                  selectedTodoId === todo.id ? 'fas fa-eye-slash' : 'far fa-eye'
                }
                onClick={() =>
                  onSelect(selectedTodoId === todo.id ? null : todo)
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
