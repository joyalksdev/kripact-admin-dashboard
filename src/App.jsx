import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import Dashboard from "./pages/Dashboard";
import Inmates from "./pages/Inmates";
import Staffs from "./pages/Staffs";
import Tasks from "./pages/Tasks";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import InmatesDetails from "./pages/InmateDetails";
import StaffsDetails from "./pages/StaffsDetails";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RootLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="inmates" element={<Inmates />} />
            <Route path="inmates/:id" element={<InmatesDetails />} />
            <Route path="staffs" element={<Staffs />} />
            <Route path="staffs/:id" element={<StaffsDetails />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="support" element={<Support />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
