import React from 'react'
import Todo from '../components/Todo'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const history = useNavigate();

    const logout = () => {
        signOut(auth)
            .then(() => {
                history("/");
            })
            .catch((error) => {
                document.write(error);
            });
    }
    
  return (
    <div className=' bg-blue-300 p-5 sm:p-10 min-h-screen bgimg  '>
        <div className='flex flex-col sm:flex-row justify-between '>

        <h1 className='text-2xl font-extrabold '>Welcome to The Dashboard  </h1>
        <button
        onClick={logout}
                               className="inline-flex mt-4 sm:mt-0 mx-auto sm:mx-0 items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-700 border border-transparent rounded-md active:bg-gray-900 false"
                           >
                               LOGOUT
                           </button>
        </div>
       
        
       
        
        <Todo />
    </div>
  )
}

export default Home
