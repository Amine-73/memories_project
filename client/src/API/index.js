import axios from "axios";

const API=axios.create({baseURL:'http://localhost:5000'})


export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);

export const deletePost=(id)=>API.delete(`/posts/${id}`);

export const likePost=(id)=>API.patch(`/posts/${id}/likePost`);

// AXIOS SINGIN AND SINGUP 

export const signIn=(formaData)=>API.post('/users/signin',formaData);
export const signUp=(formaData)=>API.post('/users/signup',formaData);