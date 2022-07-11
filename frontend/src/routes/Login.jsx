import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorList from '../components/ErrorList'

/**
 * Renders user login form
 * Makes request to backend to create user in database
 * If successful, will log user into their dashboard
 * If unsuccessful, will display errors given by backend and allow user to fix issues
 */
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(
    () => {
        document.querySelector('body').style.backgroundColor = "#0762B2";
    }
  )

  const nav = useNavigate();
  async function handleSubmission(event){
    event.preventDefault();

    setIsDisabled(true);
    await axios.post('http://localhost:8000/login/token', JSON.stringify(
      `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
    )).then(
      result => {   
        if (result.data["access_token"]){
          localStorage.setItem("token", result.data["access_token"])
          nav("/dashboard");
        }

        setIsDisabled(false);
        setErrors(Object.values(result.data));

      }
    )
    .catch(err => console.log(err));

  }

  return (
    <div className='grid justify-center text-center my-36'>
      <h1 className='text-7xl font-bold font-mono text-yellow-400 pb-10'>Sign In</h1>
      <ErrorList errors={errors} />
      <form className='my-10 space-y-12' onSubmit={handleSubmission}>

        <div>
          <label className='font-mono text-2xl text-yellow-400 font-bold' htmlFor="username">
            Enter Username
          </label>
          <input 
            type="text" 
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-md text-2xl font-mono"
          />
        </div>

        <div>
          <label className='font-mono text-2xl text-yellow-400 font-bold' htmlFor="password">
            Enter Password
          </label>
          <input 
            type="text" 
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-md text-2xl font-mono"
          />
        </div>

      <button 
      className={isDisabled ? 'font-mono text-4xl text-black font-bold': 'font-mono text-4xl text-yellow-400 font-bold'} 
      disabled={isDisabled}
      >
        Submit
      </button>

      <div><Link className='font-mono text-2xl text-yellow-400 font-bold' to="/">Back to Home Page</Link></div>

      </form>
    </div>
  )
}
