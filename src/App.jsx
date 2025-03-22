import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")

    if(todoString){
      let savedTodos = JSON.parse(todoString)
      // console.log(savedTodos)
      setTodos(savedTodos)
    }
  }, [])
  

  const saveToLocal = (params)=>{
    localStorage.setItem("todos", JSON.stringify(params))
  }

  const handleEdit = (e, id) => {
    let index = todos.findIndex(item=>{
      return item.id == id;
    })
    let newTodos = [...todos]
    let editItem = newTodos.splice(index,1)[0]
    setTodo(editItem.todo)
    saveToLocal(newTodos);
    setTodos(newTodos)
  }

  const handleDelete = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id
    })

    let newTodos = [...todos]
    newTodos.splice(index,1)
    saveToLocal(newTodos);
    setTodos(newTodos)

  }

  const handleAdd = () => {
    if(todo !=""){
      let newTodos = [...todos, { id:uuidv4(), todo, isComplete: false }]
      saveToLocal(newTodos);
      setTodos(newTodos)
      setTodo("")
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e)=>{
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index]= {...newTodos[index], isComplete: !newTodos[index].isComplete}
    saveToLocal(newTodos);
    setTodos(newTodos)
  }

  const handleKeyDown = (e)=>{
    if(e.key == 'Enter'){
      handleAdd();
    }
  }

  const handleShowFinished = ()=>{
    setShowFinished(!showFinished);
  }

  return (
    <>
      <Navbar />
      {/* Body container */}
      <div className="min-h-[100vh] py-5 md:container mx-auto bg-violet-300 text-center md:my-5 md:rounded-xl md:p-5 md:min-h-[80vh]">
        {/* Add Todo Section */}
        <h2 className='text-lg font-bold my-3'>Add a Todo</h2>
        <div className="addTodo flex gap-3 justify-center">
          <input onChange={handleChange} onKeyDown={handleKeyDown} type="text" value={todo} className='bg-white rounded-md w-3/4 lg:w-1/2 p-4' />
          <button onClick={handleAdd} className='bg-violet-900 hover:bg-violet-950 text-white py-2 px-4 rounded-xl font-semibold'>
            Add
          </button>
        </div>
        <div className='text-left w-3/4 lg:w-1/2 mx-auto my-3'>
          <input type='checkbox' onChange={handleShowFinished} checked={showFinished} className='showFinished'  id='showFinished'></input> 
          <label htmlFor="showFinished"> Show Finished </label>
        </div>

        {/* Display Todo */}
        <h2 className='text-lg font-bold my-4'>Your Todos</h2>

        {/* Todo List */}

        {/* For empty list */}
        <div className="todoList flex flex-col">
          {todos.length === 0 && <>
            <div className='font-light text-md opacity-50'>
              Your list is empty !
            </div>
          </>}
          {/* Elements of the list */}
          {todos.map(item => {

            // If show finished is false
            if(!showFinished && item.isComplete){
              return("")
            }
            // If show finished is ture 
            return (
              <div key={item.id} className="todo flex justify-around md:justify-between my-2 w-full md:w-3/4 mx-auto border border-transparent hover:bg-violet-200 hover:border-violet-400  hover:border-3 hover:px-7 hover:py-5 transition-all duration-200  p-4 rounded-lg">
                <div className='flex items-center gap-2'>

                  <input name={item.id}  onChange={handleCheckbox} type="checkbox" checked={item.isComplete} />
                  <div className={item.isComplete ? "line-through" : ""}>{item.todo}</div>

                </div>
                <div className="buttons flex gap-2">
                  <button name = {item.id} onClick={(e)=>{
                    handleEdit(e, item.id);
                  }} className='bg-violet-900 hover:bg-violet-950 text-white py-1 px-1 font-semibold rounded-md'><MdEdit/></button>
                  <button name = {item.id} onClick={handleDelete} className='bg-violet-900 hover:bg-violet-950 text-white py-1 px-1 font-semibold rounded-md'><MdDelete /></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
