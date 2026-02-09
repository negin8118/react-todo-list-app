const AddTask =(props) =>{

return (

<div className="d-flex align-items-center d-flex mb-3">
<div className="flex-fill">
{/* ورودی گرفتن تسک جدید از کاربر و کال شدن handleChange */}
    <input type="text" class="form-control me-3" placeholder="Write a task..." value={props.newTask} onChange={props.change}
    /* با زدن دکمه انتر، دکمه add فعال میشود */
    onKeyDown={(e) => {
                if (e.key === "Enter") props.Add();
     }}/>
 </div>
{/* با زدن دکمه add متد AddToList کال میشود  */}
<button onClick={props.Add} class="btn btn-info ms-3 text-white">Add</button>
</div>
);
};
export default AddTask;

