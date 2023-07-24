import axios from "axios";
const requestor = axios.create({
  baseURL: "http://localhost:3000/", // All request address prefix parts
  timeout: 60000, // Request timeout time milliseconds
  withCredentials: true, // Asynchronously requesting Cookie
  headers: {
    // Set the parameter type required for the back end
    "Content-Type": "application/json",
    // token: "your token",
    "X-Requested-With": "XMLHttpRequest",
  },
});
export default requestor;
