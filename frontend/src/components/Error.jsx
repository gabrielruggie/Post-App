import React from 'react'

/***
 * Error component that gets displayed in an ErrorList 
 */
export default function Error({error}) {
  return (
    <div className='text-red-600 font-bold font-mono text-xl p-1'>{error}</div>
  )
}
