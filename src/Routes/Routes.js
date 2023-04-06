import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Appointment from "../Pages/Appointment/Appointment/Appointment";
import Login from "../Pages/Login/Login/Login";
import SignUp from "../Pages/Shared/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout/DashboardLayout";
import MyAppointment from "../Pages/Dashboard/MyAppointment/MyAppointment";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddDoctor from "../Pages/Dashboard/AddDoctor/AddDoctor";
import ManageDoctors from "../Pages/Dashboard/ManageDoctors/ManageDoctors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/appointment",
        element: <Appointment />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MyAppointment />,
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/adddoctor",
        element: (
          <AdminRoute>
            <AddDoctor />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/managedoctors",
        element: (
          <AdminRoute>
            <ManageDoctors />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
