import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://vercel.com/abhisheks-projects-e468d787/todo-app-pern/9qRcp8gE1RDLmn7xRy7SRixKRP3N/api",
  withCredentials: true,
});
