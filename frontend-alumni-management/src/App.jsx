// Styling
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components import
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

// React Router DOM
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
