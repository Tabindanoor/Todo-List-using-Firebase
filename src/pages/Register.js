import React,{useState} from 'react'
import "../styles/style.css"
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const move = useNavigate()
    const [error, setError] = useState(null); 
    const handleSubmit=(e)=>{

        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
      
        setError(null); 
      
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
             move("/home", { name });
          })
          .catch((error) => {
            setError(error.message);
          });

};

      return (

              <div className="flex p-3 flex-col items-center min-h-screen bg-cover  bgimg  bg-no-repeat sm:justify-center bg-blue-300 ">
                <div>
                    <a href="/">
                        <h3 className="text-4xl font-bold  text-blue-600">
                           Sign Up 
                        </h3>
                    </a>
                </div>
                <div className="w-full  p-5 sm:p-12 border-blue-700 border-2 mt-6 overflow-hidden bg-white bg-opacity-30  shadow-md sm:max-w-md sm:rounded-lg">
                    <form onSubmit={(e)=>handleSubmit(e)}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-xl font-bold text-gray-700 undefined"
                            >
                               User Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                placeholder='Enter Username'
                                    type="text"
                                    name="name"
                                    className="block w-full mt-1 h-10 px-5 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-xl  font-bold text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                placeholder='Enter Email'
                                    type="email"
                                    name="email"
                                    className="block w-full mt-1 border-gray-300 h-10 px-5 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                               
                                className="block text-xl font-bold text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                 placeholder='Enter Password'
                                    type="password"
                                    name="password"
                                    className="block w-full mt-1 border-gray-300  px-5 h-10 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center text-xl justify-end mt-4">
                            <Link   to={"/"}  className=" hover:no-underline text-sm font-bold underline hover:text-gray-900"> 
                               Account exists <span className='text-purple-600 bg-white py-2 px-4 rounded-full'>SignIn</span> 
                        </Link>

                      <br />


                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-900 border border-transparent rounded-md active:bg-gray-900 "
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
  )
}

export default Register
