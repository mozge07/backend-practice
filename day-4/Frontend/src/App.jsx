import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [notes, setnotes] = useState([])

  function fetchNotes(){
    axios.get("http://localhost:3000/api/notes")
    .then((res)=>{
      setnotes(res.data.note)
    })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e){
    e.preventDefault()

    const {title, description} = e.target.elements

    console.log(title.value, description.value);

    axios.post("http://localhost:3000/api/notes", {
      title: title.value,
      description: description.value
    })
    .then(res=>{
      console.log(res.data);
      fetchNotes()
    })
    
  }

  function handleDelete(id){
    axios.delete('http://localhost:3000/api/notes/'+id)
    .then(res =>{
      console.log(id)
      fetchNotes()
    })
  }

  return (
    <>

    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name= 'title' type="text" placeholder='enter title' />
      <input name= 'description' type="text" placeholder='enter description' />
      <button>Create Note</button>
    </form>

      <div className="notes">


        {
          notes.map((note)=>{
            return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => handleDelete(note._id)}>Delete</button>
          </div>
          })
        }

        
    </div>
    </>
  )
}

export default App
