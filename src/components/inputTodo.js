export const InputTodo = (props) => {
  return (
    <>
      <input
        value={props.todo}
        onChange={(e) => props.setTodo(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={() => props.todo.trim() && props.addTask()}>Add</button>
    </>
  );
};
