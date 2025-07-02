import {useState, useEffect} from 'react'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import {db} from "../firebase"
import { auth } from '../firebase';


const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [error, setError]= useState(null)  
  const [success, setSuccess]= useState(null)  
// getting the Todos 
const getTodos = async () => {
  try {
      const querySnapshot = await getDocs(collection(db, 'todos'));
      const todos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));
      return todos;
  } catch (error) {

      setError(error.message)
  }
}

const fetchTodos = async () => {
    try {
const todosFromFirebase = await getTodos();
const currentUser = auth.currentUser;

if (currentUser && Array.isArray(todosFromFirebase)) {
  const currentUserTodos = todosFromFirebase
    .filter(todo => todo.userId === currentUser.uid)
    .sort((a, b) => a.timestamp - b.timestamp); // Sort by timestamp
  setTodos(currentUserTodos);
} else {
  setTodos([]);
}
} catch (error) {
setError(error.message);
setTodos([]); // Set todos to an empty array in case of an error
}

}


  useEffect(() => {
  
    fetchTodos() 
   }
    );
  

    // adding the todos

const addTodo = async (todo) => {
   

    try {
      const user = auth.currentUser;
      if (!user) {
        setError("User not authenticated.");
        return;
      }
      
      // Add the user's ID and timestamp to the todo
      todo.userId = user.uid;
      todo.timestamp = Date.now();
  
      await addDoc(collection(db, 'todos'), todo);
      setSuccess("Todo Added Successfully");
      setTimeout(() => setSuccess(null), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  
// updating the todos
const updateTodo = async (id, updatedTodo) => {
  try {
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, updatedTodo);
      setSuccess("Todo Updated Successfully")
    setTimeout(() => setSuccess(null), 2000);


  } catch (error) {
      // console.error('Error updating todo: ', error);
      setError(error.message)

  }
}

  // deleteing the Todos
  const deleteTodo = async (id) => {
    try {
        const todoRef = doc(db, 'todos', id);
        await deleteDoc(todoRef);
        setSuccess("Todo Deleted Successfully")
        setTimeout(() => setSuccess(null), 2000);

    
    }
         catch (error) {
        // console.error('Error deleting todo: ', error);
        setError(error.message)

    }
  }
// hadnle add todo 
  const handleAddTodo = async () => {
    if (inputTodo.trim() === '') return;
    
    const newTodo = {
        text: inputTodo,
        userId : auth.currentUser.uid,
        // completed: false,
    };

    await addTodo(newTodo);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
    setInputTodo('');
};

// hadnle update todo 

const handleUpdateTodo = async (id, updatedTodo) => {
    await updateTodo(id, updatedTodo);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
    setSelectedTodo(null);
};

// handle delete todo
const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
    setSelectedTodo(null);
};

  return (
    <div>
<div className="w-full px-4 py-6 sm:px-10 sm:py-12 max-w-2xl mx-auto border-2 border-blue-700 rounded-xl shadow-lg bg-white bg-opacity-90 backdrop-blur">
            <form onSubmit={(e)=>{
                e.preventDefault()
                handleAddTodo()}}>
            
                <div className="mt-4">
                    <label
                        htmlFor="data"
                        className="block text-xl font-extrabold text-gray-700 "
                    >
                        Add Todo
                    </label>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}  

                    <div className="flex flex-col sm:flex-row items-start">
                        <input
                            placeholder="What you wanna do"
                            type="text"
                            name="inputo"
                            value={inputTodo}
                            onChange={(e) => setInputTodo(e.target.value)}
                            className="block w-full mt-1 border-gray-300  px-5 h-10 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />

                        <button
                            type="button"
                            onClick={handleAddTodo}
                           
                            className="block mt-1 text-white w-full sm:w-auto font-extrabold text-2xl bg-blue-500 border-gray-300 px-5 h-10 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            +
                        </button>
                    </div>
                </div>
            </form>

            {/* List of todos */}
            <ul className="mt-4 space-y-2">
  {todos &&
    todos.map((todo) => (
      <li
        key={todo.id}
         className="flex justify-between items-center bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white py-2 px-4 rounded-lg shadow-md"
        // className="flex flex-col sm:flex-row items-center justify-between w-full bg-blue-600 text-white border-gray-300 py-2 px-5 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        {selectedTodo && selectedTodo.id === todo.id ? (
          <div className="flex justify-between flex-col sm:flex-row items-center w-full">
            <input
              type="text"
              value={selectedTodo.text}
              onChange={(e) =>
                setSelectedTodo({
                  ...selectedTodo,
                  text: e.target.value,
                })
              }
              className="block w-full sm:w-auto mt-1 sm:mt-0 mb-2 sm:mb-0 border-gray-300 px-5 h-10 text-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <div className="flex  ml-0 sm:ml-4">
              <button
                onClick={() =>
                  handleUpdateTodo(selectedTodo.id, selectedTodo)
                }
                className="font-bold bg-purple-600 border text-white border-gray-300 px-3 h-9 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => setSelectedTodo(null)}
                className=" border bg-yellow-500  hover:bg-yellow-600 text-white px-3 py-1 rounded-md mr-2 transition duration-200 shadow-sm"
                // className="font-bold text-white bg-gray-500 border-gray-300 px-3 h-9 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <span>{todo.text}</span>
            <div className="flex mt-2 sm:mt-0">
              <button
                onClick={() => setSelectedTodo(todo)}
                className="font-bold text-white bg-lime-500 border-gray-300 px-3 h-9 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="font-bold text-white bg-red-600 border-gray-300 px-3 h-9 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:ml-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </li>
    ))}
</ul>


           
        </div>

    </div>
  )
}

export default Todo
