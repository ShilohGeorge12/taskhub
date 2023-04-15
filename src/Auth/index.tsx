import { Navigate, Outlet } from "react-router-dom";
import useContextApi from "../Context";

function Auth() {
  const { state } = useContextApi()

  return state.admin.isloggin ? <Outlet/> : <Navigate to={'/'} /> 
}
export default Auth;