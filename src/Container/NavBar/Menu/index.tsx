import { Dispatch, SetStateAction } from 'react';
import { BiHome, BiChart } from 'react-icons/bi';
import { FiSettings }  from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Menu({ setMenu }: { setMenu: Dispatch<SetStateAction<boolean>> }) {

  const handleClick = () => setMenu(false);
  return (
    <ul className={'flex gap-3 absolute top-11 left-[56%] items-center p-2 rounded-lg bg-white dark:bg-slate-600'}>
      <li className='text-xl hover:text-blue-500 hover:text-2xl'>
        <Link to={'/'} onClick={handleClick}>
          <BiHome />
        </Link>
      </li>
      <li className='text-xl hover:text-blue-500 hover:text-2xl'>
        <Link to={'/statictics'} onClick={handleClick}>
          <BiChart />
        </Link>
      </li>
      <li className='text-xl hover:text-blue-500 hover:text-2xl'>
        <Link to={'/settings'} onClick={handleClick}>
          <FiSettings />
        </Link>
      </li>
    </ul>
  );
}
export default Menu;