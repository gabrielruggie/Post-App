import './App.css';
import React, {useEffect} from 'react'
import { Link } from "react-router-dom";

function App() {

  useEffect(
    () => {
        document.querySelector('body').style.backgroundColor = "#0762B2";
    }
  )

  return (
    <div className="App w-full">
      <div className='text-center text-8xl font-bold font-mono text-yellow-500 pt-20 my-10'>POST APP</div>
      <ul className='flex space-x-3 flex-wrap items-center justify-center'>
        <li className='p-10 bg-yellow-500 rounded-md text-xl font-mono font-bold self-auto'>
          <Link to="/login">Login</Link>  
        </li>
        <li className='p-10 bg-yellow-500 rounded-md text-xl font-mono font-bold self-auto'>
          <Link to="/register">Register</Link>  
        </li>
        <li className='p-10 bg-yellow-500 rounded-md text-xl font-mono font-bold self-auto'>
          <Link to="/about-us">About Post App</Link>
        </li>
      </ul>
    </div>  
  );
}

export default App;
