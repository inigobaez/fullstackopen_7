import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = () => {
  const config = { headers: { Authorization: token } }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}
const update = async (blog) => {
  const config = { headers: { Authorization: token } }
  const url = `${baseUrl}/${blog.id}`
  const response = await axios.put(url, blog, config)
  return response.data

}
const create = (blog) => {
  const config = { headers: { Authorization: token } }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}
const deleteBlog = async (blog) => {
  const config = { headers: { Authorization: token } }
  const url = `${baseUrl}/${blog.id}`
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, update, deleteBlog, setToken }