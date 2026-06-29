import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import CreateIssue from "./pages/CreateIssue";
import MyIssues from "./pages/MyIssues";
import IssueDetails from "./pages/IssueDetails";
import Leaderboard from "./pages/leaderboard"
import AdminIssues from "./pages/AdminIssues"
import AdminDashboard from "./pages/AdminDashboard";
import AdminIssueDetails from "./pages/AdminIssuesDetails";
import AdminRoute from "./components/AdminRoute";
import NotFound from "./pages/NotFound";


function App() {
  // const navigate = Navigate;
  return (
    <Routes>
      <Route
        path="/register"
        element={<Register />}
      />
{/* 
      <Route path="/" element={<Navigate to="/login" replace />} /> */}

      <Route
  path="/login"
  element={<Login />}
/>

      <Route
        path="/dashboard"
        element={<ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>}
      />

      <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>

      <Route
      path="/create-issue"
      element={
      <ProtectedRoute>
        <CreateIssue />
      </ProtectedRoute>
      }
      />

      <Route
      path="/my-issues"
      element={
      <ProtectedRoute>
        <MyIssues />
      </ProtectedRoute>
      }
      />

      <Route
  path="/issues/:id"
  element={
    <ProtectedRoute>
      <IssueDetails />
    </ProtectedRoute>
  }
/>
      <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard/></ProtectedRoute>}/>


<Route
  path="/admin/dashboard"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/admin/issues"
  element={
    <ProtectedRoute adminOnly>
      <AdminIssues />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/issue/:id"
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminIssueDetails />
    </ProtectedRoute>
  }
/>
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;