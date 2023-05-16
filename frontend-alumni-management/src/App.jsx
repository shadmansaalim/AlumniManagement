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
import DashboardEvents from './components/Dashboard/Common/DashboardEvents/DashboardEvents';
import DashboardAnnouncements from './components/Dashboard/Common/DashboardAnnouncements/DashboardAnnouncements';
import AdminStudentsWrapper from './components/Dashboard/Admin/AdminStudents/AdminStudentsWrapper';
import AdminJobPost from './components/Dashboard/Admin/AdminJobPost/AdminJobPost';
import UserCertificates from './components/Dashboard/User/UserCertificates/UserCertificates';
import UserJobs from './components/Dashboard/User/UserJobs/UserJobs';
import UserProfile from './components/Dashboard/User/UserProfile/UserProfile';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import VerifyAlumniCertificate from './components/VerifyAlumniCertificate/VerifyAlumniCertificate';
import AdminStudentProfile from './components/Dashboard/Admin/AdminStudents/AdminStudentProfile';
import DashboardHome from './components/Dashboard/Common/DashboardHome/DashboardHome';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute userRequired={true} roles={['admin', 'user']}><Dashboard /></PrivateRoute>,
  },
  {
    path: "/login",
    element: <PrivateRoute userRequired={false}><Login /></PrivateRoute>,
  },
  {
    path: "/register",
    element: <PrivateRoute userRequired={false}><SignUp /></PrivateRoute>,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute userRequired={true} roles={['admin', 'user']}><Dashboard /></PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute userRequired={true} roles={['admin', 'user']}><DashboardHome /></PrivateRoute>,
      },
      {
        path: "/dashboard/students",
        element: <PrivateRoute userRequired={true} roles={['admin']}><AdminStudentsWrapper /></PrivateRoute>,
      },
      {
        path: "/dashboard/students/:username",
        element: <PrivateRoute userRequired={true} roles={['admin']}><AdminStudentProfile /></PrivateRoute>,
      },
      {
        path: "/dashboard/manage-job-post",
        element: <PrivateRoute userRequired={true} roles={['admin']}><AdminJobPost /></PrivateRoute>,
      },
      {
        path: "/dashboard/certificates",
        element: <PrivateRoute userRequired={true} roles={['user']}><UserCertificates /></PrivateRoute>,
      },
      {
        path: "/dashboard/profile",
        element: <PrivateRoute userRequired={true} roles={['user']}><UserProfile /></PrivateRoute>,
      },
      {
        path: "/dashboard/jobs",
        element: <PrivateRoute userRequired={true} roles={['user']}><UserJobs /></PrivateRoute>,
      },
      {
        path: "/dashboard/events",
        element: <PrivateRoute userRequired={true} roles={['admin', 'user']}><DashboardEvents /></PrivateRoute>,
      },
      {
        path: "/dashboard/announcements",
        element: <PrivateRoute userRequired={true} roles={['admin', 'user']}><DashboardAnnouncements /></PrivateRoute>,
      },
    ]
  },
  {
    path: "/verify-alumni-certificate",
    element: <VerifyAlumniCertificate />,
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
