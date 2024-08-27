import { useEffect, useState } from "react";
import { FormCreateTask } from "./components/form/FormCreateTask.jsx";
import { ListActions } from "./components/list-actions/ListActions";
import { TaskList } from "./components/task-list/TaskList";
// import { tasks } from "./data/tasks.js";

function App() {
  const storageDataKey = 'todo-data';
  const storageIdKey = 'todo-last-id';
  const [taskList, setTaskList] = useState(readLocalData());
  const [id, setId] = useState(readLocalId());
  const [sortingAlgo, setSortingAlgo] = useState('timeAsc');

  useEffect(() => {
    localStorage.setItem(storageDataKey, JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    localStorage.setItem(storageIdKey, JSON.stringify(id));
  }, [id]);

  function readLocalData() {
    const localData = localStorage.getItem(storageDataKey);

    if (localData) {
      return JSON.parse(localData);
    }

    return [];
  }

  function readLocalId() {
    const localData = localStorage.getItem(storageIdKey);

    if (localData) {
      return JSON.parse(localData);
    }

    return 0;
  }

  function addTask(taskText, taskColor) {
    setTaskList(prev => [
      ...prev,
      {
        id: id + 1,
        text: taskText,
        color: taskColor,
        state: 'todo',
      },
    ]);
    setId(prev => prev + 1);
  }

  function updateTaskText(id, newText) {
    setTaskList(prev => prev.map(task => ({
      ...task,
      text: task.id === id ? newText : task.text,
    })));
  }

  function updateTaskColor(id, newColor) {
    setTaskList(prev => prev.map(task => ({
      ...task,
      color: task.id === id ? newColor : task.color,
    })));
  }

  function updateTaskState(id) {
    setTaskList(prev => prev.map(task => ({
      ...task,
      state: task.id === id ? 'done' : task.state,
    })));
  }

  function removeTask(id) {
    setTaskList(prev => prev.filter(task => task.id !== id));
  }

  function sortData() {
    const algorithmes = {
      timeAsc: (a, b) => a.id - b.id,
      timeDes: (a, b) => b.id - a.id,
      colorAsc: (a, b) => a.color < b.color ? -1 : a.color === b.color ? 0 : 1,
      colorDes: (a, b) => b.color < a.color ? -1 : a.color === b.color ? 0 : 1,
      textAsc: (a, b) => a.text < b.text ? -1 : a.text === b.text ? 0 : 1,
      textDes: (a, b) => b.text < a.text ? -1 : a.text === b.text ? 0 : 1,
    };

    // return ((typeof algorithmes[sortingAlgo]) === 'function') ? taskList.sort(algorithmes[sortingAlgo]) : taskList.sort(algorithmes.timeAsc);
    // return algorithmes[sortingAlgo] ? taskList.sort(algorithmes[sortingAlgo]) : taskList.sort(algorithmes.timeAsc);
    return sortingAlgo in algorithmes ? taskList.sort(algorithmes[sortingAlgo]) : taskList.sort(algorithmes.timeAsc);
  }

  function updateSorting(newAlgoName) {
    setSortingAlgo(newAlgoName);
  }

  window.addEventListener('keyup', (e) => {
    console.log(e.key);
  });

  return (
    <main>
      <h1>Todo</h1>
      <div>
        <p>Viso užduočių: {taskList.length}</p>
        <p>Likusios atlikti užduotys: {taskList.length}</p>
        <p>Atliktos užduotys: -</p>
        <p>Ištrintos užduotys: -</p>
      </div>
      <FormCreateTask addTaskCallback={addTask} />
      <ListActions updateSorting={updateSorting} />
      <TaskList data={sortData()}
        updateTaskText={updateTaskText}
        updateTaskColor={updateTaskColor}
        updateTaskState={updateTaskState}
        removeTask={removeTask} />
    </main>
  );
}

export default App;