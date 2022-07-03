import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  // Add freeze to screen when button is clicked
  // Config css --> display
  async function handleSubmission(event){
    event.preventDefault();

    await axios.post('http://localhost:8000/register', {
      'firstname': firstName,
      'lastname': lastName,
      'username': username,
      'password': password,
      'email': email
    }).then(
      result => {
        nav(result.data["redirect"])
      }
    )
    .catch(err => console.log(err));
  }

  return (
    <div className='grid justify-center text-center my-20'>
      <h1 className='text-7xl font-bold font-mono text-yellow-400'>Register</h1>
      <form className='my-20 space-y-10' onSubmit={handleSubmission}>
        
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

      <button className='font-mono text-4xl text-yellow-400 font-bold '>Submit</button>

      <div><Link className='font-mono text-2xl text-yellow-400 font-bold' to="/">Back to Home Page</Link></div>

      </form>
    </div>
  )
}
