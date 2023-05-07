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
import DashboardEvents from './components/Dashboard/DashboardEvents/DashboardEvents';
import DashboardTranscripts from './components/Dashboard/DashboardTranscripts/DashboardTranscripts';
import DashboardJobProfile from './components/Dashboard/DashboardJobProfile/DashboardJobProfile';
import DashboardJobExperience from './components/Dashboard/DashboardJobExperience/DashboardJobExperience';
import DashboardSkillSet from './components/Dashboard/DashboardSkillSet/DashboardSkillSet';
import DashboardImportantLinks from './components/Dashboard/DashboardImportantLinks/DashboardImportantLinks';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    // loader: ({ request }) =>
    //   fetch("/api/dashboard.json", {
    //     signal: request.signal,
    //   }),
    children: [
      {
        path: "/dashboard/events",
        element: <DashboardEvents />,
      },
      {
        path: "/dashboard/transcripts",
        element: <DashboardTranscripts />,
      },
      {
        path: "/dashboard/job-profile",
        element: <DashboardJobProfile />,
      },
      {
        path: "/dashboard/job-experience",
        element: <DashboardJobExperience />,
      },
      {
        path: "/dashboard/skill-set",
        element: <DashboardSkillSet />,
      },
      {
        path: "/dashboard/important-links",
        element: <DashboardImportantLinks />,
      },
    ]
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
