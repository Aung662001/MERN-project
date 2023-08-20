import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/Persist";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, Outlet } from "react-router-dom";

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);
  const [refresh, { isError, isLoading, isSuccess, error, isUninitialized }] =
    useRefreshMutation();
  const [persist] = usePersist();
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  useEffect(() => {
    if (effectRan.current === true) {
      console.log("sending refresh token");
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
  }, []);
  let content;
  if (!persist) {
    console.log("not trusted");
    content = <Outlet />;
  } else if (isLoading) {
    console.log("loading");
    content = (
      <ClipLoader
        color={"#ffffff"}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  } else if (isError) {
    console.log("error");
    content = (
      <p className="errmsg">
        {error?.data?.message}.&nbsp;<Link to="/login">Please Login Again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("isUninitialized:", isUninitialized, "token:", token);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
