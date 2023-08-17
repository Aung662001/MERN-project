import { store } from "../../app/store";
import { usersApiSlice } from "../users/usersApiSlice";
import { notesApiSlice } from "../notes/notesApiSlice";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
    store.dispatch(
      notesApiSlice.util.prefetch("getNotes", "nodesList", { force: true })
    );
    // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    // return () => {
    //   users.unsubscribe();
    //   notes.unsubscribe();
    // };
  }, []);
  return <Outlet />;
};

export default Prefetch;
