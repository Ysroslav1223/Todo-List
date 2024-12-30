import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "./components/headers";
import { InputTodo } from "./components/inputTodo";
import { TaskTodo } from "./components/TaskTodo";

function App() {
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState([]);
  const [done, setDone] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  let copiTask = tasks;
  useEffect(() => {
    axios
      .get("http://localhost:3005/todos")
      .then((TodoData) => setTasks(TodoData.data));
  }, []);
  const addTask = () => {
    const taskTodo = {
      id: Date.now(),
      title: todo,
      completed: false,
    };
    axios
      .post("http://localhost:3005/todos", taskTodo)
      .then((rawResponse) => setTasks([rawResponse.data, ...tasks]));
    setTodo("");
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3005/todos/${id}`)
      .then(() => setTasks(tasks.filter((e) => e.id !== id)));
  };

  const toggleTask = (id) => {
    let toggle = tasks.map((e) =>
      e.id === id ? { ...e, completed: true } : { ...e }
    );
    setTasks(toggle);
  };

  const updateTodo = (id) => {
    if (editText === "") return;
    const update = tasks.find((todo) => todo.id === id);
    update.title = editText;

    axios.put(`http://localhost:3005/todos/${id}`, update).then(() => {
      setTasks(tasks.map((todo) => (todo.id === id ? update : todo)));
      setEditText("");
      setEditId(null);
    });
  };

  switch (done) {
    case "All":
      copiTask = tasks;
      break;
    case "Active":
      copiTask = tasks.filter((e) => e.completed === false);
      break;
    case "completes":
      copiTask = tasks.filter((e) => e.completed === true);
      break;
    default:
      break;
  }

  const taskTodoList = copiTask.map((e) => (
    <TaskTodo
      key={e.id}
      id={e.id}
      completed={e.completed}
      title={e.title}
      editText={editText}
      editId={editId}
      setEditId={setEditId}
      setEditText={setEditText}
      deleteTask={deleteTask}
      toggleTask={toggleTask}
      updateTodo={updateTodo}
    />
  ));
  return (
    <div className="App">
      <Header />
      <InputTodo addTask={addTask} todo={todo} setTodo={setTodo} />
      {taskTodoList}
      <button onClick={() => setDone("All")}>Все</button>
      <button onClick={() => setDone("Active")}>Активные</button>
      <button onClick={() => setDone("completes")}>Выполненые</button>
    </div>
  );
}

export default App;
