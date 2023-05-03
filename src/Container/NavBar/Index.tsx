import { BiMoon, BiBell, BiSearch, BiPlusCircle, BiMenu } from 'react-icons/bi';
import Button from '../../Components/Buttons';
import Searchbar from '../../Components/SearchBar';
import useContextApi from '../../Context';
import AddProject from './AddProject';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Iprojects } from '../../App';
import logo from '../../assets/Images/tasks.png';

interface INavprops {
	changeTheme: () => void;
	setProjects: Dispatch<SetStateAction<Iprojects[]>>;
	projects: Iprojects[];
  searchQuery: string;
  handleSearchQuery: (e: ChangeEvent<HTMLInputElement>) => void
}

function NavBar(props: INavprops) {
	const { changeTheme, setProjects,  searchQuery, handleSearchQuery } = props;

	const { dispatch, state } = useContextApi();
	const buttonBg = 'dark:bg-gray-800 font-bold dark:text-white hover:bg-blue-600 hover:text-white dark:hover:bg-slate-500';

	const base64 = btoa( String.fromCharCode(...new Uint8Array((state.admin.image.data.data))) );
  const profileImage = `data:${state.admin.image.contentType};base64,${base64}`;

	return (
		<nav
			id='nav'
			className='relative w-full h-16 p-2 flex items-center font-bold  mb-3 sm:mb-6'>
			<div className='hidden sm:flex sm:items-center sm:justify-center sm:w-14 md:w-16 sm:self-center'>
				<img
					src={ logo }
					alt='logo'
					className='sm:w-2/3 self-center'
				/>
			</div>
			<p className='hidden md:block text-xl tracking-wider sm:mr-3 lg:mr-6 text-center font-bold text-gray-700 dark:text-white ml-3 lg:ml-5'>Taskhub</p>
			<div className='relative w-1/2 md:w-80 sm:w-80 lg:w-[450px] h-9 lg:mr-8 sm:mr-9'>
      	<Searchbar value={ searchQuery } onChange={ handleSearchQuery } />
				<span className='absolute top-1/4 right-3 text-xl text-gray-600'>
					<BiSearch />
				</span>
			</div>
			<div className='h-10 w-3/6 lg:w-1/2 flex flex-row items-center px-2 gap-1 justify-end'>
				<Button
					Value={BiMoon}
					bg={buttonBg}
					more={'lg:text-2xl text-lg sm:text-base md:text-lg p-1 '}
					onClick={changeTheme}
				/>
				<Button
					Value={BiPlusCircle}
					bg={buttonBg}
					more={'lg:text-3xl text-lg sm:text-base md:text-lg p-1 '}
					onClick={() => dispatch({ type: 'addProject', payload: { addProject: true } })}
				/>
				<Button
					Value={BiBell}
					bg={buttonBg}
					more={'lg:text-2xl text-lg sm:text-base md:text-lg p-1 '}
				/>

				<div className='border-l-2 border-gray-400 dark:border-white flex items-center'>
					<img
						src={ profileImage }
						alt='profile'
						className='w-8 ml-2 lg:w-10'
					/>
					<p className='hidden sm:block sm:pl-1 sm:text-base md:text-lg lg:ml-1'>{ state.admin.username }</p>
				</div>
			</div>
			{state.addProject && <AddProject setProjects={setProjects} />}
		</nav>
	);
}
export default NavBar;
