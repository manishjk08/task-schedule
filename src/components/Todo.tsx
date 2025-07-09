import {useEffect, useRef, useState} from 'react'
interface Task{
  newtask:string
  priority:string
  deadline:string
}

const Todo = () => {
    const [tasks, setTask] = useState<Task[]>([]);
    const [newtask, setnewtask] = useState<string>('');
    const [priority, setpriority] = useState<string>('top');
    const [deadline, setdeadline] = useState<string>('');
    const [completed, setcompleted] = useState<Task[]>([]);
    const [editIndex,setEditIndex]=useState<number|null>(null)
    const inputRef=useRef<HTMLInputElement>(null)
  
    const handleInput=(e: React.ChangeEvent<HTMLInputElement>) =>{
      setnewtask(e.target.value)
    }
  
    const handlepriority=(e: React.ChangeEvent<HTMLSelectElement>)=> {
      setpriority(e.target.value)
    }
    const handleDeadline=(e: React.ChangeEvent<HTMLInputElement>)=> {
      setdeadline(e.target.value)
    }
    useEffect(()=>{
      if(editIndex!==null && inputRef.current){
        inputRef.current.focus
      }
    },[editIndex])
    const Addtask=()=> {
      if (newtask.trim() !== '') {
        const updateTask:Task={newtask,priority,deadline}
        if (editIndex!==null){
         const updateTask=[...tasks]
         updateTask[editIndex]={newtask,priority,deadline}
         setTask(updateTask)
         setEditIndex(null)
        }else{
          setTask([...tasks,updateTask]);
        }
        setnewtask('')
        setpriority('')
        setdeadline('')
        
  
      }
    }
    const Completedtask=(i: number)=> {
      const completetask = tasks[i]
      setcompleted([...completed, completetask])
      setTask(tasks.filter((_, index) => index !== i))
    }

    const Undo=(i:number)=>{
      const uncompletedTask = completed[i]
      setTask([...tasks,uncompletedTask])
      setcompleted(completed.filter((_, index) => index !== i))
    }
    const EditTask=(i:number)=>{
      const taskToEdit = tasks[i];
      setnewtask(taskToEdit.newtask);
      setEditIndex(i)
    }
    const DeleteTask=(i:number)=>{
      setTask(tasks.filter((_,index)=>index!==i))
    }
  
  
    return (
      <>
        <div className="task-form">
          <input type="text" placeholder="Enter a task" value={newtask} className="task-input" onChange={handleInput} ref={inputRef}/>
  
          <select id="priority" className="priority-select" onChange={handlepriority}>
            <option value="priority" disabled>Priority</option>
            <option value="top">Top</option>
            <option value="middle">Middle</option>
            <option value="low">Low</option>
          </select>
          <input type="date" value={deadline} className="deadline-input" onChange={handleDeadline} />
          <button className="add-task-btn" onClick={Addtask}>Add Task</button>
        </div>
  
        <div className="task-list">
          <h1>Upcoming Tasks</h1>
          {tasks.length === 0 ? (
            <p>No task to show</p>
          ) : (
            tasks.map((task, i) => (
  
              <div className="task" key={i}>
                <h5>Task Name:{task.newtask}</h5>
                <h5>Priority:{task.priority}</h5>
                <h5>Deadline:{task.deadline}</h5>
                <h5>Action:{<button className='btn2' onClick={() => Completedtask(i)}>Mark Done </button>}
                           {<button className='btn2' onClick={() => EditTask(i)} >Edit </button>}
                           {<button className='btn2' onClick={() => DeleteTask(i)}>Delete</button>}</h5>
              </div>
            ))
          )}
        </div>
  
        <div className="completed-tasks">
          <h1>Completed Tasks</h1>
          {completed.length === 0 ? (
            <p>No completed task</p>
          ) : (
            completed.map((task, index) => (
              <div className="task" key={index}>
                <h5>Task Name:{task.newtask}</h5>
                <h5>Priority:{task.priority}</h5>
                <h5>Deadline:{task.deadline}</h5>
                <button className='btn2' onClick={()=>Undo(index)}>Mark as Incomplete</button>
              </div>
            ))
          )}
  
        </div>
        </>
  )
}

export default Todo
