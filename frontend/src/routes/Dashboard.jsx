import React, {useEffect} from 'react';
import { Link } from "react-router-dom";

// Authentication should be good because we will need to use a get method to retrieve posts and thats where we will
// catch any unchecked users
// Should be the same for the other links here as well
export default function Dashboard() {

    // This is how you change the background color from page to page
    // Will need to add to every element since it makes change permanent
    // useEffect(
    //     () => {
    //         document.querySelector('body').style.backgroundColor = "#022873";
    //     }
    // )

  return (
    <div className='grid grid-rows-3 grid-flow-col gap-4 m-4'>
        <div className='row-span-5 space-y-5'>
            <div 
            className='text-yellow-500 font-mono font-bold text-4xl p-10 rounded-md bg-indigo-600
            hover:bg-indigo-500'
            >
                Welcome back, John
            </div>

            <div
            className='text-yellow-500 font-mono font-bold bg-indigo-600 p-10 rounded-md h-full space-y-10 
            hover:bg-indigo-500'
            >
                <span className='text-4xl'>Manage Posts</span>
                <ul className='space-y-4 text-xl'>
                    <li className=''><Link to="/">Create Post</Link></li>
                    <li><Link to="/">View Your Posts</Link></li>
                    <li><Link to="/">View Archived Posts</Link></li>
                </ul>
            </div>
        </div>
        
        <div 
        className='col-span-10 font-mono font-bold p-10 
        bg-indigo-600 rounded-md text-4xl text-center text-yellow-500
        hover:bg-indigo-500'
        >
            Post App
        </div>
        <div className='row-span-2 text-yellow-500'>PostList</div>
    </div>
  )
}
