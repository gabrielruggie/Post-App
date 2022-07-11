import React from 'react'

/**
 * Post object that represents a user's post to Post App
 */
export default function Post({post}) {
  return (
    <div 
    className='font-mono font-bold text-xl text-amber-400 bg-slate-800 w-full p-10  rounded-md space-y-6
    hover:bg-slate-900'
    >
        <span className='text-4xl ml-10 mr-10'>{post.title}</span>
        <p className='text-xl ml-10 mr-10'>{post.message}</p>
        <div className='text-slate-200 italic ml-10'>Date Posted: {post.date_posted}</div>
    </div>
  )
}
