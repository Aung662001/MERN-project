import React, { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => (document.title = "Phone Doctor");
  }, [title]);
};

export default useTitle;
