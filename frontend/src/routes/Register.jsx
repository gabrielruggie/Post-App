import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorList from '../components/ErrorList'


export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
    await axios.post('http://localhost:8000/register', {
      'firstname': firstName,
      'lastname': lastName,
      'username': username,
      'password': password,
      'email': email
    }).then(
      result => {   
        if (result.data["result"] === "User Registered"){
          nav(result.data["redirect"]);
        }
        setIsDisabled(false);
        
        setErrors(Object.values(result.data));

      }
    )
    .catch(err => console.log(err));

  }

  // Add 3D text to registration
  return (
    <div className='grid justify-center text-center my-20'>
      <h1 className='text-7xl font-bold font-mono text-yellow-400 pb-10'>Registration</h1>
      <ErrorList errors={errors} />
      <form className='my-10 space-y-9' onSubmit={handleSubmission}>
        
        <div>
          <label className='font-mono text-2xl text-yellow-400 font-bold' htmlFor="firstName">Enter Your First Name</label>
          <input 
            type="text" 
            name="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="w-full rounded-md text-2xl font-mono"
          />
        </div>

        <div>
          <label className='font-mono text-2xl text-yellow-400 font-bold' htmlFor="lastName">Enter Your Last Name</label>
          <input 
            type="text" 
            name="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className="w-full rounded-md text-2xl font-mono"
          />
        </div>

        <div>
          <label className='font-mono text-2xl text-yellow-400 font-bold' htmlFor="username">Enter Your Desired Username</label>
          <input 
            type="text" 
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-md text-2xl font-mono"
          />
        </div>

        <div>
          <label className='font-mono text-2xl text-yellow-400 font-bold' htmlFor="email">Enter Your Email Address</label>
          <input 
            type="text" 
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md text-2xl font-mono"
          />
        </div>

        <div>
          <label className='font-mono text-2xl text-yellow-400 font-bold' htmlFor="password">Enter Your Password</label>
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
