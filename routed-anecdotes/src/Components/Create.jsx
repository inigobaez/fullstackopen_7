import { useNavigate } from "react-router-dom"

import { useField } from "../hooks"

const CreateNew = (props) => {

  const content = useField('text', 'content')
  const author = useField('text', 'author')
  const info = useField('text', 'url for more info')
  const inputs = [content, author, info]


  const navigate = useNavigate()



  const handleSubmit = (e) => {
    //console.log('handleSubmit', content)
    e.preventDefault()
    const newAnecdote = {
      content: content.attributes.value,
      author: author.attributes.value,
      info: info.attributes.value,
      votes: 0
    }
    props.addNew(newAnecdote)
    navigate('/')
  }

  const handleReset = () => {
    inputs.map(i => i.reset())
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        {inputs.map(i => <div key={i.label}>{i.label}<input {...i.attributes} /></div>)}
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}
export default CreateNew