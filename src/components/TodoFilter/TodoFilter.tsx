import React from 'react';
import type { Todo } from '../../types/Todo';

interface TodoFilterProps {
  todos: Todo[];
  query: string;
  setQuery: (value: string) => void;
  status: 'all' | 'active' | 'completed';
  setStatus: (value: 'all' | 'active' | 'completed') => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  todos,
  query,
  setQuery,
  status,
  setStatus,
}) => {
  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  return (
    <div>
      <input
        data-cy="searchInput"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {query && (
        <button
          className="delete"
          data-cy="clear-btn"
          onClick={() => setQuery('')}
        />
      )}

      <select
        data-cy="statusSelect"
        value={status}
        onChange={e =>
          setStatus(e.target.value as 'all' | 'active' | 'completed')
        }
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <ul data-cy="filtered-todos">
        {filteredTodos.map(todo => (
          <li key={todo.id} data-cy="filtered-todo">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
