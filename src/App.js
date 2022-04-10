// import React from 'react' // for eg of class based component
import {useState , useEffect} from 'react'
import { BrowserRouter as Router ,Route , Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
const App = () => {
  // const name = 'Kunal'
  const [showAddTask , setShowAddTask] = useState(false)
  const [tasks , setTasks] = useState ([])
useEffect (() => {
const getTasks = async () => {
  const taskFromServer = await fetchTasks()
  setTasks(taskFromServer)
}
getTasks();
}, [])

//Fetch Tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  return data;
}
//Fetch Task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data;
}
//Add Task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks',{
    method : 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json();

  setTasks([...tasks,data])

  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = {id , ...task}
  // setTasks([...tasks, newTask])
  // console.log(task)
  // console.log(newTask)
}
// Delete task
const deleteTask = async (id) =>{
   await fetch(`http:localhost:5000/tasks/${id}`,{
    method: 'DELETE',
  })
  console.log('delete :' , id);
  setTasks(tasks.filter((task)=> task.id !== id))
}

const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updatedTask = {...taskToToggle,reminder: !taskToToggle.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method : 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json();
  console.log('toogle :' , id);
  setTasks ( 
    tasks.map((task) => task.id === id ? {...task , reminder : data.reminder} :task) )
}

  return (
    <Router>
    <div className='container'>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      <Routes>
        <Route
          path='/'
          element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          }
        />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  </Router>
  );
}

// For eg of class based component
// class App extends React.Component {

//   render() {
//     const name = 'Kunal';
//     return <h1> Hello {name} </h1>
//   }
// }

export default App;
