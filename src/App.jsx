import { Routes, Route } from "react-router-dom";

/* ---------- PAGES ---------- */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePortfolio from "./pages/CreatePortfolio";
import PublicPortfolio from "./pages/PublicPortfolio";

/* ---------- COMPONENTS ---------- */
import ProtectedRoute from "./components/ProtectedRoute";
import EditPortfolio from "./pages/EditPortfolio";
import Template from "./pages/Template";
import ViewPortfolio from "./pages/ViewPortfolio";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-portfolio"
          element={
            <ProtectedRoute>
              <CreatePortfolio />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-portfolio"
          element={
            <ProtectedRoute>
              <EditPortfolio />
            </ProtectedRoute>
          }
        />


        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <Template />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view"
          element={
            <ProtectedRoute>
              <ViewPortfolio />
            </ProtectedRoute>
          }
        />


        {/* Public Portfolio View */}
        <Route
          path="/portfolio/:username/:templateId"
          element={<PublicPortfolio />}
        />
      </Routes>
    </div>
  );
}

export default App;
