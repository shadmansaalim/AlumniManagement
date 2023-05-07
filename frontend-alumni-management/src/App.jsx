// Styling
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// React Router DOM
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

// Components import
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ContextProvider from './context/ContextProvider';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </div>
  )
}

export default App
