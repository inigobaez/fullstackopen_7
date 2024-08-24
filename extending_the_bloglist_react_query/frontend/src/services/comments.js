import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = () => {
  const config = { headers: { Authorization: token } };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const addComment = (blogId, comment) => {
  try {
    console.log("commentService.add", blogId, comment);
    const endpoint = `${baseUrl}/${blogId}/comments`;
    const request = axios.post(endpoint, comment);
    return request.then((response) => response.data);
  } catch (error) {
    console.log(error);
  }
};

export default { getAll, add };
