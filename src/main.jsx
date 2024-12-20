import { configureStore } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { allReducer } from "./reducers/allReducer.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = configureStore({ reducer: allReducer });
createRoot(document.getElementById("root")).render(
	<GoogleOAuthProvider clientId="321439735918-iblk980p3kgemuq3207eo73hf3lqpm59.apps.googleusercontent.com">
		<Provider store={store}>
			<BrowserRouter
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true,
				}}
			>
				<App />
			</BrowserRouter>
		</Provider>
	</GoogleOAuthProvider>
);
