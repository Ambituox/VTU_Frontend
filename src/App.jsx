import App_Routes from "./routes/App_Routes";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { signOutUserSuccess } from "./store/userReducers";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { existingUser } = useSelector((state) => state.user);

  
  useEffect(() => {
    if (existingUser?.token) {
      try {
        const decoded = jwtDecode(existingUser.token);
        const isExpired = decoded.exp * 1000 < Date.now();
        
        if (isExpired) {
          console.log('Expired');
          dispatch(signOutUserSuccess());
          window.location.href = "/login"; // 👈 Navigate without React Router
          console.log('Expired');
          return;
        }
      } catch (err) {
        console.error("Invalid token:", err);
        dispatch(signOutUserSuccess());
        window.location.href = "/login"; // 👈 Navigate without React Router
      }
    }
  }, [existingUser, dispatch]);

  return <App_Routes />;
}

export default App;
