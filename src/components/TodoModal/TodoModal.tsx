import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface TodoModalProps {
  todo: Todo | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (todo) {
      setLoading(true);
      setTimeout(() => {
        setUser(`User ${todo.id}`);
        setLoading(false);
      }, 500);
    }
  }, [todo]);

  if (!isOpen || !todo) {
    return null;
  }

  return (
    <div data-cy="modal">
      {loading ? (
        <div data-cy="loader">Loading...</div>
      ) : (
        <div>
          <h2 data-cy="modal-header">{todo.title}</h2>
          <p data-cy="modal-user">{user}</p>
          <button data-cy="modal-close" onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};
