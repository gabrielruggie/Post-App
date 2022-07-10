import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Util from '../../Utilities/Utility';

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [date, setDate] = useState("");
    const [isDisabled, setIsDisabled] = useState("");

    useEffect(
        () => {
            document.querySelector('body').style.backgroundColor = "#0762B2";
        }
    )

    const nav = useNavigate();
    async function handleSubmission(event){
        event.preventDefault();

        setIsDisabled(true);
        await axios({
            method:"POST",
            url: "http://localhost:8000/dashboard/create-post",
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token")
            },
            data: {
                'title': title,
                'message': message,
                'date_posted': date
            }
        }).then(
            result => {
                if (JSON.stringify(result.data["response"]) === "200"){
                    nav(result.data["redirect"])
                }else{
                    setIsDisabled(false);
                }

            }
        ).catch(
            () => {
                Util.clearTokenFromLocalStorage();
                nav("/login", {replace: true});
            }
        )
    }

  return (
    <div className='grid justify-center text-center my-36'>
      <h1 className='text-7xl font-bold font-mono text-yellow-400 pb-10'>Post A Post to Post App</h1>
      
      <form className='my-10 space-y-12' onSubmit={handleSubmission}>

        <div>
          <label className='font-mono text-2xl text-yellow-400 font-bold' htmlFor="title">
            Enter Title
          </label>
          <input 
            type="text" 
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-md text-2xl font-mono"
          />
        </div>

        <div>
          <label className='font-mono text-2xl text-yellow-400 font-bold' htmlFor="message">
            Enter Message
          </label>
          <textarea 
            name="message"
            cols={40}
            rows="5"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="w-full rounded-md text-2xl font-mono"
          />
        </div>

        <div>
          <label className='font-mono text-2xl text-yellow-400 font-bold' htmlFor="date">
            Enter Date
          </label>
          <input 
            type="text"
            name="date"
            cols={40}
            rows="5"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-md text-2xl font-mono"
          />
        </div>

      <button 
      className={isDisabled ? 'font-mono text-4xl text-black font-bold': 'font-mono text-4xl text-yellow-400 font-bold'} 
      disabled={isDisabled}
      >
        Submit
      </button>

      <div><Link className='font-mono text-2xl text-yellow-400 font-bold' to="/dashboard">Back to Your Dashboard</Link></div>

      </form>
    </div>
  )
}
