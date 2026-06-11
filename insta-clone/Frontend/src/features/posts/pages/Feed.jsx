import React, { useEffect } from 'react'
import Post from "../components/Post"
import "../style/feed.scss"
import { usePost } from '../hooks/usePost'

const Feed = () => {

  const {loading, handleGetFeed, feed } = usePost()

  useEffect(() =>{
    handleGetFeed()
  }, [])

  if(loading || !feed){
    return (<main><h1>Feed is Loading.......</h1></main>)
  }

  console.log(feed)


  return (
    <main className='feed-page'>
    <div className="feed">
        <div className="posts">
            {feed.map(post=>{
              return <Post user={post.user} post={post} />
            })}
        </div>
    </div>
</main>
  )
}

export default Feed