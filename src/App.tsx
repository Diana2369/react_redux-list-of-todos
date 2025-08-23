import React, { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodoModal } from './components/TodoModal/TodoModal';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTodos([
        {
          id: 1,
          title: 'Quis ut nam facilis et officia qui',
          completed: true,
          userId: 1,
        },
        { id: 2, title: 'Fugiat veniam minus', completed: false, userId: 2 },
        {
          id: 3,
          title: 'Laboriosam mollitia et enim quasi adipisci',
          completed: true,
          userId: 3,
        },
        {
          id: 4,
          title: 'Distinctio vitae autem nihil ut molestias quo',
          completed: false,
          userId: 4,
        },
        { id: 5, title: 'Et porro tempora', completed: true, userId: 5 },
      ]);
      setLoading(false);
    }, 500);
  }, []);

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
      {loading ? (
        <div data-cy="loader">Loading todos...</div>
      ) : (
        <>
          <TodoFilter
            todos={todos}
            query={query}
            setQuery={setQuery}
            status={status}
            setStatus={setStatus}
          />

          <TodoList
            todos={filteredTodos}
            selectedTodoId={selectedTodo?.id ?? null}
            onSelect={setSelectedTodo}
          />

          <TodoModal
            todo={selectedTodo}
            isOpen={!!selectedTodo}
            onClose={() => setSelectedTodo(null)}
          />
        </>
      )}
    </div>
  );
};

export default App;
