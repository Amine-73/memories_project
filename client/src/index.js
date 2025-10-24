import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// 1. Importer le store directement depuis votre nouveau fichier
import { store } from "./reducers/index"; // ⬅️ Assurez-vous que le chemin est correct !
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// 🛑 Les lignes pour createStore, applyMiddleware et thunk sont supprimées
// Elles sont maintenant gérées dans votre fichier 'store.js'

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme();

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* 2. Le Provider utilise le store importé */}
      <BrowserRouter>
      <Provider store={store}> 
        <App />
      </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();











// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import reducers from "./reducers"; // Assuming your rootReducer is in a file named reducers.js
// import { Provider } from "react-redux";
// import { createStore, applyMiddleware, compose } from "redux";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { thunk } from "redux-thunk";
// const store = createStore(reducers, compose(applyMiddleware(thunk)));

// const root = ReactDOM.createRoot(document.getElementById("root"));
// const theme = createTheme();
// root.render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </ThemeProvider>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



