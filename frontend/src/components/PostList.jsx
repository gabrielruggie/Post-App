import React from 'react'
import Post from './Post'

/**
 * Renders all posts to user dashboard based on list of object values passed to it
 */
export default function PostList({posts}) {
    return (
        posts.map(
            post => <Post post={post} />
        )
    )
}
