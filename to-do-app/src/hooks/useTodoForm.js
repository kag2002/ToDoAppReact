import { useState } from 'react';

export const useTodoForm = () => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("normal");
  const [dueDate, setDueDate] = useState(null);

  const clearFields = () => {
    setText("");
    setDueDate(null);
    setPriority("normal");
  };

  return {
    text,
    setText,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    clearFields
  };
}; 