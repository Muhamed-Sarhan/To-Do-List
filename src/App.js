import React , {useState , useEffect} from 'react';
import './App.css';
import Form from './component/Form';
import TodoList from './component/ToDoList'

function App() {

  const [ inputText , setInputText ] = useState("");
  const [todos , setTodos] = useState([]);
  const [status , setStatus] = useState("all");
  const [filterTodos  , setFilterTodos] = useState([]);

  useEffect(()=>{
    getLocalTodos();
  }, [])

  useEffect(() =>{
    filterHandler();
    saveLocalTodos();
  }, [todos,status])

  const filterHandler = () =>{
     switch(status){
       case("completed"):
        setFilterTodos(todos.filter(todo => todo.complete === true))
        break;
        case("uncompleted"):
        setFilterTodos(todos.filter(todo => todo.complete === false))
        break;
        default:
          setFilterTodos(todos);
          break;
     }
  } 

  const saveLocalTodos = () => {
    localStorage.setItem('todos' , JSON.stringify(todos))
  }

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos' , JSON.stringify([]))
    }else{
     let todoLocal =  JSON.parse(localStorage.getItem("todos"));
     setTodos(todoLocal);
    }
  }

    return (
      <div className="App">
       <header>
        <h2>MS14 Todo List</h2>
       </header>
    <Form  
    setStatus={setStatus} 
    todos={todos} 
    setTodos={setTodos} 
    inputText={inputText} 
    setInputText={setInputText}
    />
    <TodoList 
    filterTodos={filterTodos} 
    setTodos={setTodos} 
    todos={todos}
    />
      </div>
    );
  }


export default App;
