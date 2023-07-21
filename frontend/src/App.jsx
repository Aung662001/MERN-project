import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import Users from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="dash" element={<Dashboard />}>
          <Route index element={<Welcome />} />
          <Route path="notes">
            <Route index element={<NotesList />} />
          </Route>
          <Route path="users">
            <Route index element={<Users />} />
          </Route>
        </Route>
      </Route>
      {/* {404} */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
