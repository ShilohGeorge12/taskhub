import { useEffect, useState, lazy, Suspense, ChangeEvent } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuspenseUi from './Components/SuspenseUi';
import Fetch from './Hooks/fetch';
import Auth from './Auth';
import useContextApi from './Context';
import { Iadmin } from './Context/interface';
import Home from './Container/Home';
import NavBar from './Container/NavBar/Index';
import SideBar from './Container/SideBar';
const Project = lazy( () => import('./Container/Home/Project'));
const Statictics = lazy( ()=> import('./Container/Statictics'));
const Settings = lazy( ()=> import('./Container/Settings'));
const Account = lazy( () => import('./Container/Settings/Account'));
import Login from './Container/Login';
import NotFound from './Container/NotFound';
import Notifications from './Hooks/Notifications';
import ErrorBoundary from './Error';
import Search, { BSearch } from './Hooks/Search';

export interface Iprojects {
	readonly _id: string;
	name: string;
	description: string;
	progress: number;
	target: string;
	task: { completed: boolean; content: string; points: number }[];
	createdAt: Date;
}

function App() {
	const [theme, setTheme] = useState<'light' | 'dark'>('dark');
	const [projects, setProjects] = useState<Iprojects[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');
  const [result, setResult] = useState<Iprojects[] | 'Not Found!' | BSearch>('Not Found!');
	const { state, dispatch } = useContextApi();

	function changeTheme() {
		if (theme !== 'dark') {
			setTheme('dark');
			dispatch({ type: 'themeState', payload: { theme: 'dark' } });
		} else {
			setTheme('light');
			dispatch({ type: 'themeState', payload: { theme: 'light' } });
		}
	}

	const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery( e.target.value )
    setResult( () => Search( projects, e.target.value ));
  };

	useEffect( ()=> {
		if( state.admin.isloggin === false ){
			Notifications( 'User\'s Logged Out', 'Log In To Use Features Of The App' );
		}
	}, [state.admin.isloggin] )


	useEffect(() => {
		dispatch({ type: 'themeState', payload: { theme: theme } });
		Fetch('api/projects', 'GET')
		.then((data: Iprojects[] | { error: string }) => {
			if ('error' in data) {
				Notifications('Fetch Error', data.error);
			} else {
				setProjects(data);
			}
		})
		.catch((err: Error) => Notifications('Fetch Error', JSON.stringify(err.message)));
		Fetch('api/admin', 'GET')
		.then((data: Iadmin | { error: string }) => {
			if ('error' in data) {
				Notifications('Fetch Error', data.error);
			} else {
				dispatch({ type: 'admin', payload: { admin: data } })
			}
		})
		.catch((err: Error) => Notifications('Fetch Error', JSON.stringify(err.message)));
	}, []);

	return (
		<section className={`${theme} relative flex flex-col w-full screen ${state.addProject || state.addTask || state.editAccount ? 'blur-sm' : 'blur-0'}`}>
			<div className='bg-slate-100 dark:bg-gray-800 min-h-screen text-gray-800 dark:text-white'>
				<Router>
					<NavBar
						changeTheme={ changeTheme }
						setProjects={ setProjects }
						projects={ projects }
						searchQuery={ searchQuery }
						handleSearchQuery={ handleSearchQuery }
					/>
					<section className='flex flex-col-reverse sm:flex-row w-full'>
						<SideBar />
						<main
							id='home'
							className='w-full bg-white dark:bg-gray-700 h-[84vh] rounded-[35px] p-6'>
							<Routes>
								<Route
									path='/'
									element={
										<ErrorBoundary>
											<Home
												projects={projects}
												setProjects={setProjects}
												result={ result }
												searchQuery={ searchQuery }
											/>
										</ErrorBoundary>
									}
								/>

								<Route element={<Auth/>} >
									<Route
										path='/project/:id'
										element={
											<ErrorBoundary>
												<Suspense fallback={<SuspenseUi />}>
													<Project setProjects={setProjects} />
												</Suspense>
											</ErrorBoundary>
										}
									/>

									<Route
										path='/statictics'
										element={
											<ErrorBoundary>
												<Suspense fallback={<SuspenseUi />}>
													<Statictics projects={projects} />
												</Suspense>
											</ErrorBoundary>
										}
									/>

									<Route
										path='/settings'
										element={
											<ErrorBoundary>
												<Suspense fallback={<SuspenseUi />}>
													<Settings />
												</Suspense>
											</ErrorBoundary>
										}
									/>

									<Route
										path='/settings/account'
										element={
											<ErrorBoundary>
												<Suspense fallback={<SuspenseUi />}>
													<Account />
												</Suspense>
											</ErrorBoundary>
										}
									/>
								</Route>

								<Route
									path='/login'
									element={<Login />}
								/>

								<Route
									path='*'
									element={<NotFound />}
								/>
							</Routes>
						</main>
					</section>
				</Router>
			</div>
		</section>
	);
}

export default App;