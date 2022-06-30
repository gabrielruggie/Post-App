import React, { useContext, useState } from 'react'

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmission (event) {
    event.preventDefault();

    // Check fields here

    

  }

  return (
    <div>
      <form className='grid justify-center text-center' onSubmit={handleSubmission}>
        <h1>Register</h1>
        
        <div className=''>
          <label htmlFor="firstName">Enter Your First Name</label>
          <input 
            type="text" 
            name="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="w-full"
          />
        </div>

        <label htmlFor="lastName">Enter Your Last Name</label>
        <input 
          type="text" 
          name="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

        <label htmlFor="username">Enter Your Desired Username</label>
        <input 
          type="text" 
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="email">Enter Your Email Address</label>
        <input 
          type="text" 
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="password">Enter Your Password</label>
        <input 
          type="text" 
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button>Submit</button>

      </form>
    </div>
  )
}
