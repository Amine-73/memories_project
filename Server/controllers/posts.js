import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const createPost = async (req, res) => {
//   const post = req.body;
//   const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date.toISOString()});
//   try {
//     await newPost.save();
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };


export const createPost = async (req, res) => {
    // 1. Check for authentication (req.userId is set by your auth middleware)
    if (!req.userId) {
        // If the user is not authenticated, stop here.
        return res.status(401).json({ message: "Unauthenticated: User ID missing." });
    }

    const post = req.body;
    
    // 🔑 CORRECTION: Add parentheses (new Date()).toISOString()
    const newPost = new PostMessage({
        ...post,
        creator: req.userId,
        createdAt: (new Date()).toISOString()
    });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        // Log the specific error on the server for debugging
        console.error("Post Creation Error:", error.message);
        
        // 409 Conflict is typically for uniqueness violations; 400 Bad Request 
        // is often more appropriate for general validation errors.
        res.status(400).json({ message: error.message }); 
    }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      {...post,_id},
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with this ID");
  }

  try {
    const postToDelete = await PostMessage.findById(id);

    if (!postToDelete) {
      return res.status(404).json({ message:"Post not found."});
    }

    await PostMessage.findByIdAndDelete(id); // La correction est ici

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const likePost = async (req, res) => {
  const { id } = req.params;
  
  if(!req.userId) return res.json({message:'Unauthenticated'});

  // 1. Validation de l'ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send('No post with that ID');
  }

  try {
      // 2. Trouver le post
      const post = await PostMessage.findById(id);

      const index=post.likes.findIndex((id)=>id===String(req.userId))

      if(index === -1){
        post.likes.push(req.userId);
      }else{
        post.likes=post.likes.filter((id)=>id!= String(req.userId))
      }
      // 3. Mettre à jour le compteur de likes
      const updatedPost = await PostMessage.findByIdAndUpdate(
          id,
          post, 
          { new: true } // {new: true} retourne le document mis à jour
      );

      // 4. Renvoyer le post mis à jour (CORRECTION ici)
      res.json(updatedPost); 
  } catch (error) {
      // Pour une API robuste, il faut toujours gérer les erreurs de base de données
      res.status(500).json({ message: error.message });
  }
};