import { createBrowserRouter, Navigate } from "react-router";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

const router = createBrowserRouter([
  { path: "*", element: <Navigate to="/auth/login" replace/> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/signup", element: <Signup /> },
]);

export default router;
