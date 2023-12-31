import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import NewNote from "./features/notes/NewNote";
import EditNote from "./features/notes/EditNote";
import NewUserForm from "./features/users/NewUserForm";
import EditUser from "./features/users/EditUser";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import { ROLE } from "./config/role";
import RequireAuth from "./features/auth/RequireAuth";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth accessRoles={[...Object.values(ROLE)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<Dashboard />}>
                <Route index element={<Welcome />} />
                <Route
                  element={
                    <RequireAuth accessRoles={[ROLE.Admin, ROLE.Manager]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>
                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      {/* {404} */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
