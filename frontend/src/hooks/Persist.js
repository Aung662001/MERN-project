import { useEffect, useState } from "react";

const Persist = () => {
  const [persist, setPersist] = useState(
    Boolean(localStorage.getItem("persist")) || false
  );
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);
  return [persist, setPersist];
};
export default Persist;
