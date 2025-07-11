import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import AuthProtectRoute from "./Components/AuthProtectRoute/AuthProtectRoute";
import WorkspaceDetailScreen from "./Screens/WorkspaceDetailScreen/WorkspaceDetailScreen";
import NewWorkspaceScreen from "./Screens/NewWorkspaceScreen/NewWorkspaceScreen";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { logout } from "./utils/LogoutScreen";
import NotFound from "./Screens/NotFound/NotFound";
import VerificacionExitosa from "./Screens/VerificacionExitosa/VerificacionExitosa";

const App = () => {
  return (
    <div>
      <Navbar onLogout={logout} />
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/verificacion-exitosa" element={<VerificacionExitosa />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<AuthProtectRoute />}>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/new" element={<NewWorkspaceScreen />} />
          <Route
            path="/workspaces/:workspace_id"
            element={<WorkspaceDetailScreen />}
          />
          <Route
            path="/workspaces/:workspace_id/channels/:channel_id"
            element={<WorkspaceDetailScreen />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
