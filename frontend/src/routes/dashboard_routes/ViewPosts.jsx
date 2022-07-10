import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Util from '../../Utilities/Utility';
import PostList from '../../components/PostList'

export default function ViewPosts() {
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
                url: "http://localhost:8000/dashboard/view-user-posts",
                headers: {
                    Authorization: "Bearer "+localStorage.getItem("token")
                }
            }).then(
                result => {
                const onlyPosts = Object.values(result.data);
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
    
    return (
    <>
        <div className='mt-24 text-center font-mono font-bold text-4xl text-yellow-400 pb-20'>These Are Your Posts</div>
        <div className='grid grid-cols-4 mb-24'>
    
        <div className='col-start-2 col-span-2 space-y-4'>
            <PostList posts={postObjects} />
            <div className='text-center pt-16'>
                <Link className='font-mono text-2xl text-yellow-400 font-bold' to="/dashboard">Back to Your Dashboard</Link>
            </div>

        </div>
    
    </div>
    </>
    
  )
}
