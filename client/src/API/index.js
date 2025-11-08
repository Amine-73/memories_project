import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${JSON.parse(
//       localStorage.getItem("profile")
//     )}`;
//   }
//   return req;
// });


API.interceptors.request.use((req) => {
    const profileString = localStorage.getItem('profile');
    
    if (profileString) {
        // 1. Parse the JSON string retrieved from localStorage
        const profileData = JSON.parse(profileString);
        
        // 2. **CRITICAL:** Access the 'token' property, which holds the JWT string
        const jwtToken = profileData.token; 
        
        // Ensure the Authorization header uses the string token
        req.headers.Authorization = `Bearer ${jwtToken}`; 
    }
    
    return req;
});

export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatePost) =>
  API.patch(`/posts/${id}`, updatePost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// AXIOS SINGIN AND SINGUP

export const signIn = (formaData) =>  API.post("/users/signin", formaData);
export const signUp = (formaData) =>  API.post("/users/signup", formaData);
