const CompletedHandling = (props) => {
const completedCount = props.todoList.filter((task) => task.completed).length;//شمارش تعداد تسک های انجام شده
return(
 <div className="d-flex align-items-center mb-3 w-100">
              {/* نمایش تعداد تسک های انجام شده */}
              <h4 className="mb-0 flex-grow-1 text-end">
                <span className="badge bg-secondary fw-semibold">
                  {props.todoList.length === 0
                    ? "0/0 Completed"
                    : completedCount === props.todoList.length
                    ? "All done!! 🎉"
                    : `${completedCount}/${props.todoList.length} completed`}
                </span>
              </h4>

              {/* ایجاد دکمه حذف تمام تسک های انجام شده */}
              {completedCount > 0 && (
                <button className="btn btn btn-info fw-semibold fs-6 text-white" onClick={props.clear}>
                  Clear all done tasks
                </button>
              )}
            </div>

);

};

export default CompletedHandling;