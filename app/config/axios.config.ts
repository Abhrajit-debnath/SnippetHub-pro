import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.snippethubpro.in/api",
  withCredentials: true,
  
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
