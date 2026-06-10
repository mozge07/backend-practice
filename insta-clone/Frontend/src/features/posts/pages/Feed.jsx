import React from 'react'
import Post from "../components/Post"
import "../style/feed.scss"


const Feed = () => {
  return (
    <main className='feed-page'>
    <div className="feed">
        <div className="posts">
            <Post />
        </div>
    </div>
</main>
  )
}

export default Feed