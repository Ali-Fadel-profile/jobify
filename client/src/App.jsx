import { Landing, Error, Register, ProtectedRoute } from "@pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { Profile, Stats, AllJobs, AddJob } from "@pages/dashboard";
import { SharedLayout } from "@components/index";
import { useAppContext } from "./context/appContext";

function App() {
  const { user } = useAppContext();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Stats />} />
        <Route path="add-job" element={<AddJob />} />
        <Route path="all-jobs" element={<AllJobs />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
      <Route
        path="/landing"
        element={user ? <Navigate to="/" replace /> : <Landing />}
      />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
