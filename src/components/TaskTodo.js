export const TaskTodo = (props) => {
  return (
    <div key={props.id}>
      {props.editId === props.id ? (
        <>
          <input
            type="text"
            value={props.editText}
            onChange={(t) => props.setEditText(t.target.value)}
          />
          <button onClick={() => props.updateTodo(props.id)}>Save</button>
          <button onClick={() => props.setEditId(null)}>Cancel</button>
        </>
      ) : (
        <>
          <div onClick={() => props.toggleTask(props.id)}>{props.title}</div>
          <button
            onClick={() => {
              props.setEditId(props.id);
              props.setEditText(props.title);
            }}
          >
            edit
          </button>
          <button onClick={() => props.deleteTask(props.id)}>delete</button>
        </>
      )}
      <input
        type="checkbox"
        onClick={() => props.toggleTask(props.id)}
        defaultChecked={props.completed}
      ></input>
    </div>
  );
};
