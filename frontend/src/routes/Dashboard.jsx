import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Util from '../Utilities/Utility';
import PostList from '../components/PostList';


export default function Dashboard() {
    const [firstname, setFirstname] = useState("");
    const [postObjects, setPostObjects] = useState([]);
    const nav = useNavigate();

    useEffect(
        () => {
            document.querySelector('body').style.backgroundColor = "#0762B2";
        }
    )

    useEffect(()=>{
        const onLoad = async() => {
            axios({
                method: "GET",
                url: "http://localhost:8000/dashboard",
                headers: {
                    Authorization: "Bearer "+localStorage.getItem("token")
                }
            }).then(
                result => {
                setFirstname(result.data["firstname"]);
                
                const onlyPosts = Object.values(result.data);
                // remove user data from object
                onlyPosts.splice(-3);
                console.log(onlyPosts);

                setPostObjects(onlyPosts);

            }).catch(
                () => {
                    Util.clearTokenFromLocalStorage();
                    nav("/login", {replace: true});
                }
                )
            }
            onLoad()
        },[]
    )

    useEffect(
        () => {
            document.querySelector('body').style.backgroundColor = "#0762B2";
        }
      )

  return (
    <div className='grid grid-flow-col gap-4 m-4'>
        <div className='row-span-5 space-y-5'>
            <div 
            className='text-blue-900 font-mono font-bold text-4xl p-10 rounded-md bg-yellow-500'
            >
                Welcome back, {firstname}
            </div>

            <div
            className='text-yellow-500 font-mono font-bold bg-slate-800 p-10 rounded-md space-y-10 
            hover:bg-slate-900'
            >
                <span className='text-4xl'>Manage Posts</span>
                <ul 
                className='space-y-4 text-xl pb-10'
                >
                    <li className='hover:text-2xl'><Link to="/dashboard/create-post">Create Post</Link></li>
                    <li className='hover:text-2xl'><Link to="/dashboard/view-user-posts">View Your Posts</Link></li>
                    <li className='hover:text-2xl'><Link to="/dashboard">View Archived Posts</Link></li>
                </ul>
            </div>

            <div 
            className='font-mono text-3xl font-bold p-10 bg-slate-800 rounded-md text-yellow-500
            hover:bg-slate-900'
            >
                <Link to='/'>Sign Out</Link>
            </div>

        </div>
        
        <div 
        className='col-span-10 font-mono font-bold p-10 
        bg-yellow-500 rounded-md text-6xl text-center text-blue-900'
        >
            Post App
        </div>
        <div className='row-span-2 text-yellow-500 col-span-10 space-y-5'>
            <PostList posts={postObjects}/>
        </div>
        
    </div>
  )
}
