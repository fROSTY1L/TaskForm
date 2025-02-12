import { useState } from 'react';

const TaskForm = () => {
  const [token, setToken] = useState(''); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budgetFrom, setBudgetFrom] = useState(1000);
  const [budgetTo, setBudgetTo] = useState(5000);
  const [deadline, setDeadline] = useState(1);
  const [tags, setTags] = useState('');

  function replaceSpacesWithPercent(str: string) {
    return str.replace(/ /g, '%');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const link = `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=${token}&title=${replaceSpacesWithPercent(title)}&description=${replaceSpacesWithPercent(description)}&tags=${replaceSpacesWithPercent(tags)}&budget_from=${budgetFrom}&budget_to=${budgetTo}&deadline=${deadline}&reminds=3&all_auto_responses=false&rules=%7B%22budget_from%22%3A5000%2C%22budget_to%22%3A8000%2C%22deadline_days%22%3A5%2C%22qty_freelancers%22%3A1%7D`
    const response = await fetch(link, {
      method: 'GET',
    });

    if (response.ok) {
      alert('Задача опубликована!');
      setTitle('');
      setDescription('');
      setBudgetFrom(1000);
      setBudgetTo(5000);
      setDeadline(1);
      setTags('');
      
    } else {
      alert('Ошибка при публикации задачи.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4 mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Создать новую задачу</h2>
      
      <input
        type="text"
        placeholder="Токен"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded"
        required
      />
      
      <input
        type="text"
        placeholder="Название задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded"
        required
      />
      <textarea
        placeholder="Описание задачи"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded"
        required
      />
      <input
        type="number"
        placeholder="Бюджет от"
        value={budgetFrom}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value >= 0) {
            setBudgetFrom(value);
          }
        }}
        className="border border-gray-300 p-2 w-full rounded"
        required
      />
      <input
        type="number"
        placeholder="Бюджет до"
        value={budgetTo}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value >= 0) {
            setBudgetTo(value);
          }
        }}
        className="border border-gray-300 p-2 w-full rounded"
        required
      />
      <input
        type="number"
        placeholder="Срок (дни)"
        value={deadline}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value >= 0) {
            setDeadline(value);
          }
        }}
        className="border border-gray-300 p-2 w-full rounded"
        required
      />
      <input
        type="text"
        placeholder="Теги (через запятую)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition">Опубликовать</button>
    </form>
  );
};

export default TaskForm;
