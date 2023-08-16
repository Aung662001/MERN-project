import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  const decode = jwtDecode(token);
  let isAdmin = false;
  let isManager = false;
  let status = "Employee";
  if (token) {
    const { username, roles } = decode.UserInfo;
    if (roles.includes("Manager")) {
      status = "Manager";
      isManager = true;
    }
    if (roles.includes("Admin")) {
      status = "Admin";
      isAdmin = true;
    }
    return { username, roles, isAdmin, isManager, status };
  }

  return { username: "", roles: [], status, isAdmin, isManager };
};

export default useAuth;
