import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
//اضافه کردن کامپوننت های برنامه
import AddTask from "./AddTask"
import TodoList from "./TodoList"
import ErrorHandling from "./ErrorHandling";
import CompletedHandling from "./CompletedHandling";

function App() {
//استفاده از useState برای دخیره کردن دیتا
const [newTask, setNewTask ] = useState("");
const [todoList, setTodoList] = useState([]);
const [error, setError] = useState("");

//استفاده از useEffect برای ذخیره کردن لیست در  local storage و لود کردن آن پس از ریفرش
useEffect(() => {
  const savedTodos = localStorage.getItem("todoList");
  if (savedTodos) {
      const parsed = JSON.parse(savedTodos);
      if (parsed.length > 0) { // only set if array is non-empty
        setTodoList(parsed);
      }

  }
}, []);

useEffect(() => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}, [todoList]);

//ذخیره تسک وارد شده
const handleChange = (event) => {
  setNewTask(event.target.value);
   if (error) setError("");
};
//اضافه کردن تسک وارد شده در لیست
const addToList =() => {
if (!newTask.trim()){
 setError("You haven't written a task yet!");
 return;
 }
const task = {
id: todoList.length === 0 ? 1 : todoList[todoList.length -1].id +1,
taskName:newTask,
completed:false,
};
setTodoList([...todoList ,task ]);
 setNewTask("");
 setError("");
};

//حذف کردن تسک با توجه به id
const deleteTask = (id) => {
setTodoList(todoList.filter((task) => task.id !== id));
};

//ادیت کردن تسک انتخاب شده
const editTask = (id, changedTask) => {

 if (!changedTask.trim()) {
    setError("You can't leave a task empty");
    return;
 }
  setError("");

  setTodoList(
    todoList.map((task) =>
      task.id === id ? { ...task, taskName: changedTask } : task
    )
  );
};

//تغییر تسک انتخاب شده یه انجام شده با استفاده از id
const taskComplete = (id) => {
 setTodoList(
  todoList.map((task) => {
   if(task.id===id && !task.completed){
    return {...task, completed: true};
    }
    else if(task.id===id && task.completed) {
    return {...task, completed: false}
    }
    else {
    return task;
    }
    }))
}


//حذف کردن تسک های انجام شده از لیست
const clearCompleted = () => {
  setTodoList(todoList.filter((task) => !task.completed));
};

return (
  <div className="App">
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">

            {/* اسم برنامه  */}
            <h1 className="text-center fw-bold mb-4 text-white">My To Do List</h1>
            {/*کامپوننت پیام خظا */}
            <ErrorHandling message={error} />
            {/* کامپوننت تسک های انجام شده */}
           <CompletedHandling todoList = {todoList} clear={clearCompleted} />

            <div className="shadow p-3 card">
              <div className="card-body p-5">

                {/* کامپوننت اضافه کردن تسک جدید*/}
                <AddTask newTask={newTask} change={handleChange} Add={addToList}  />

                {/* کامپوننت لیست تسک ها */}
                <TodoList Tasks={todoList} delete={deleteTask} edit={editTask} taskComplete={taskComplete} />

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
);

}


export default App;


