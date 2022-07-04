import React, {useEffect}from 'react';
import { Link } from "react-router-dom";

// If you want to change the background color maybe write a function that will change it in App.css
export default function About() {

  useEffect(
        () => {
            document.querySelector('body').style.backgroundColor = "#F2AB39";
        }
    )

  return (
    <div className="grid grid-cols-1 gap-3 m-5">
      <div 
      className='text-center font-mono font-bold text-6xl text-rose-400 bg-yellow-400 rounded-md p-7'
      >
        POST APP
      </div>
      
      <div
       className='text-center font-mono font-bold text-3xl text-rose-400 bg-yellow-400 rounded-md p-7 space-x-32'
      >
        <span><Link to="/">Home Page</Link></span>
        <span><Link to="/">Register Today</Link></span>
        <span><Link to="/">Login</Link></span>
      </div>
      
      <div
      className='text-center font-mono font-bold p-10 bg-yellow-400 rounded-md text-rose-400 space-y-10'
      >
        <span className='text-4xl'>So... What is it?</span>
        <p className='text-left text-xl ml-10 mr-10'>Post App is a user-based social media app that encourages all users to 
        share their thoughts. 
        </p>
        <p className='text-left text-xl ml-10 mr-10 '>Take a look below at a couple examples of posts made by Posters! 
        </p>
      </div>

      <div
      className='font-mono font-bold p-10 ml-10 mr-10 bg-yellow-700 rounded-md text-amber-300 space-y-6
      hover:bg-yellow-800'
      >
        <span className='text-4xl ml-10 mr-10'>Youth Ministry Basketball League Open Gym's Coming Soon</span>
        <p className='text-xl ml-10 mr-10'>Stay tuned and watch our website for updates. We are cooking up something big!</p>
        <div className='text-slate-200 italic ml-10'>by: user123, March 13th, 2022 @11:00pm</div>
      </div>

      <div
      className='font-mono font-bold p-10 ml-10 mr-10 bg-yellow-700 rounded-md text-amber-300 space-y-6
      hover:bg-yellow-800'
      >
        <span className='text-4xl ml-10 mr-10'>How bout that uzi concert!?!</span>
        <div className='text-slate-200 italic ml-10'>by: userEFG, August 26th, 2021 @1:00pm</div>
      </div>

      <div
      className='text-center font-mono font-bold p-10 bg-yellow-400 rounded-md text-rose-400'
      >
        Closing Remarks
      </div>
      <div
      className='text-center first font-mono font-bold p-10 bg-rose-400 rounded-md text-yellow-300'
      >
        Footer
      </div>
    </div>
  )
}
