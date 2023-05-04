import { Link, NavLink } from "react-router-dom";
import { BiHome, BiChart } from 'react-icons/bi';
import { FiSettings, FiLogIn, FiLogOut  }  from 'react-icons/fi';
import useContextApi from "../../Context";
import Notifications from "../../Hooks/Notifications";
import Button from "../../Components/Buttons";
import Fetch from "../../Hooks/fetch";
import { Iadmin } from "../../Context/interface";

function SideBar() {
  const { state, dispatch } = useContextApi()
  const navStyle = 'p-2 rounded-xl capitalize text-xl md:text-3xl sm:text-2xl hover:bg-blue-300 hover:text-white hover:dark:bg-slate-900 dark:text-white'

  function handleLogout(){
    Fetch('api/logout', 'GET')
    .then( ( res: Iadmin ) => dispatch({ type: 'admin', payload: { admin: res } }) )
    .catch((err: Error) => Notifications('Logout Error', JSON.stringify(err.message)) );
  };

  const isDisabled = (path: string) => {
    if( state.admin.isloggin ){
      return path;
    }
    return '/';
  };

  const logInOrOut = () => {
    if( state.admin.isloggin ){
      return <Button
        Value={ FiLogOut }
        bg={ 'p-2 mt-2 rounded-md capitalize md:text-2xl bg-blue-600 text-white dark:text-white' }
        onClick={ handleLogout }
      />
    }
    return <Link to={'/login'}
      className={ 'p-2 mt-2 rounded-md capitalize md:text-2xl bg-blue-600 text-white dark:text-white' }
      > <FiLogIn/> 
    </Link>
  };

  return (
    <nav id="sidebar" className="flex flex-row sm:flex-col items-center justify-center w-full sm:w-20 sm:h-[85vh] gap-3">
      {
        state.addProject || state.addTask || state.editAccount ? (
          <>
            <p className={navStyle}> <BiHome /> </p>
            <p className={navStyle}> <BiChart /> </p>
            <p className={navStyle}> <FiSettings /> </p>
          </>
        ) : (
          <>
            <NavLink to={ isDisabled('/') } className={navStyle}> <BiHome /> </NavLink>
            <NavLink to={ isDisabled('/statictics') } className={navStyle} > <BiChart />  </NavLink>
            <NavLink to={ isDisabled('/settings') } className={navStyle}> <FiSettings /> </NavLink>
            {
              logInOrOut()
            }
          </>
        )
      }
    </nav>
  );
}
export default SideBar;