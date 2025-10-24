import { createSlice } from '@reduxjs/toolkit';

// Définition de l'état initial
const initialState = []; 

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // FETCH_ALL devient une fonction 'getAll'
    FETCH_ALL: (state, action) => {
      // Immer permet de "muter" l'état temporairement, 
      // mais en arrière-plan, il crée une nouvelle copie immuable.
      return action.payload;
    },
    
    // CREATE devient 'create'
    CREATE: (state, action) => {
      state.push(action.payload); 
      console.log('there is you action.payload',action.payload)// Remplace 'return [...posts, action.payload]'
    },
    
    // UPDATE/LIKE devient 'update'
    UPDATE: (state, action) => {
      // Le payload est le post mis à jour (incluant les likes)
      const updatedPost = action.payload;
      
      // La fonction map est souvent plus facile à comprendre directement,
      // mais on peut aussi l'écrire avec des mutations pour plus de clarté
      return state.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    },
    
    // DELETE devient 'deletePost'
    DELETE: (state, action) => {
      const idToDelete = action.payload;
      console.log('this is the Id that you delete',idToDelete)
      // Immer permet l'utilisation de .filter() qui crée une nouvelle référence
      return state.filter((post) => post._id !== idToDelete); 
    },
  },
});

// Exporter les actions (pour dispatch) et le réducteur (pour le store)
export const { FETCH_ALL, CREATE, UPDATE, DELETE } = postsSlice.actions;
export default postsSlice.reducer;
