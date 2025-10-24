import {configureStore} from '@reduxjs/toolkit';
import Post from './Posts';

export const store=configureStore({
    reducer:{
        posts:Post,
    }
})