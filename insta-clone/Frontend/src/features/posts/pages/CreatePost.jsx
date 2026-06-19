import React, {useState, useRef} from 'react'
import "../style/createPost.scss"
import { usePost } from '../hooks/usePost'
import { useNavigate } from "react-router"

const CreatePost = () => {

  const [caption, setCaption] = useState("")
  const postImgInputFieldRef = useRef(null)

  const navigate = useNavigate()

  const {loading, handleCreatePost } = usePost()

  async function handleSubmit(e){
    e.preventDefault()

    const file = postImgInputFieldRef.current.files[0]

    await handleCreatePost(file, caption)

    navigate('/')
  }

  if(loading){
    return (
      <main>
        <h1>Creating Post</h1>
      </main>
    )
  }

  return (
    <div className="post-container">
      <div className="form-container">
        <h1>Create Post</h1>

        <form onSubmit={handleSubmit}>
          <label className='post-img-label' htmlFor="postImg">Crate Post</label>
          <input ref={postImgInputFieldRef} hidden type="file" name='postImg' id='postImg' />
          <input 
          onChange={(e)=>{setCaption(e.target.value)}}
          type="text" name='caption' id='caption' />
          <button>Create Post</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost