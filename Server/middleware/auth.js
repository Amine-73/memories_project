// import jwt from 'jsonwebtoken';
// const auth=async (req,res,next)=>{

//     try {
//         if (!req.headers.authorization) {
//             return next(); // Or send an appropriate 401 Unauthorized response
//         }
//         const token=req.headers.authorization.split(" ")[1];
//         const isCustomAuth=token.length<500
//         let decodedData;

//         if(token && isCustomAuth){
//             decodedData=jwt.verify(token,'test');
//             req.userId=decodedData?.id;
//         }else{
//             decodedData=jwt.decode(token);
//             req.userId=decodedData?.sub;
//         }

//         next();
//     } catch (error) {
//         console.error("Auth Middleware Error:", error);
//         next()
//     }
// }

// export default auth;

import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // 1. Vérification de l'existence et du format de l'en-tête
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // Si pas de token, on ne peut pas authentifier. On envoie une erreur 401.
      return res
        .status(401)
        .json({ message: "Access Denied: No Token Provided." });
    }

    // 2. Extraction du token
    const token = authHeader.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;

    // 3. Logique de Vérification JWT
    if (token && isCustomAuth) {
      // Utiliser jwt.verify() pour les tokens générés par vous (custom)
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      // Utiliser jwt.decode() pour les tokens Google (longs)
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; // 'sub' est l'ID unique dans les tokens Google
    }

    // 4. Si tout est valide, passer au contrôleur
    next();
  } catch (error) {
    // 5. GESTION DE L'ERREUR DE VÉRIFICATION (Token invalide, expiré, mal formé)

    // Loggez l'erreur pour le débogage (sur le serveur)
    console.error("Auth Middleware Error:", error.message);

    // 🔑 Bloquez la requête si l'authentification échoue
    return res.status(401).json({
      message: "Authentication Failed: Invalid or Expired Token.",
    });
  }
};

export default auth;
