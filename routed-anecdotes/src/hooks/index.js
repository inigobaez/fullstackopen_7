import { useState } from "react"

export const useField = (type, label) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => setValue("")




  return { attributes: { type, value, onChange }, reset, label }
}