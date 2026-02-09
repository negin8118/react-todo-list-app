import {useState} from 'react'

const TodoList = (props) => {
//استفاده از useState برای ادیت کردن تسک ها
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

//ذخیره کردن تسک جدید جایگزین در useState
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingText(task.taskName);
  };
//ذخیره کردن تسک جایگزین شده در لیست
  const saveEdit = (id) => {
    props.edit(id, editingText);
    setEditingId(null);
  };


  return (
    <ul className="list-group w-100">
      <hr />
       {/*نمایش تمام تسک های در لیست (درصورتیکه آن تسک انجام شده باشد پس زمینه سبز میشود) */}
      {props.Tasks.map((task) => (
        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center mb-2 rounded"
          style={{ backgroundColor: task.completed ? "#90EE90" : "lightblue",
                   textDecoration: task.completed ? "line-through" : "none"
                     }}>
          {/* با دو بار کلیک کردن برروی تسک قابلیت ادیت کردن فعهال میشود  */}
        <div className="flex-grow-1 text-end">
          {editingId === task.id ? (
             <input
              className="form-control me-3"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onBlur={() => saveEdit(task.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit(task.id);
              }}
              autoFocus
             />
           ) : (
            <span
              className="flex-grow-1"
              onDoubleClick={() => startEditing(task)}
              style={{
                cursor: "pointer",

              }}
            >
              {task.taskName}
            </span>
            )}
       </div>
          {/*ایجاد دکمه های دیلیت و کامپلیت */}
          <div className="flex gap-2">
            <button className="btn btn-sm btn-success" onClick={() => props.taskComplete(task.id)}>
              Done
            </button>

            <button className="btn btn-sm btn-danger "onClick={() => props.delete(task.id)} >
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
