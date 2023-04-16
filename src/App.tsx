import { useEffect, useState } from 'react';
import Home from './Container/Home';
import NavBar from './Container/NavBar/Index';
import SideBar from './Container/SideBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from './Container/Settings';
import Statictics from './Container/Statictics';
import Fetch from './Hooks/fetch';
import useContextApi from './Context';
import Notifications from './Hooks/Notifications';
import Login from './Container/Login';
import Project from './Container/Home/Project';
import NotFound from './Container/NotFound';
import ErrorBoundary from './Error';
import Account from './Container/Settings/Account';
import { Iadmin } from './Context/interface';
import Auth from './Auth';

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

	useEffect(() => {
		dispatch({ type: 'themeState', payload: { theme: theme } });
		Fetch('https://taskhub-api.onrender.com/api/projects', 'GET')
		.then((data: Iprojects[] | { error: string }) => {
			if ('error' in data) {
				Notifications('Fetch Error', data.error);
			} else {
				setProjects(data);
			}
		})
		.catch((err: Error) => Notifications('Fetch Error', JSON.stringify(err.message)));
		Fetch('https://taskhub-api.onrender.com/api/admin', 'GET')
		.then((data: Iadmin | { error: string }) => {
			if ('error' in data) {
				Notifications('Fetch Error', data.error);
			} else {
				console.log( data )
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
						changeTheme={changeTheme}
						setProjects={setProjects}
					/>
					<section className='flex flex-row w-full'>
						<SideBar />
						<main
							id='home'
							className='w-full bg-white dark:bg-gray-700 h-[95vh] rounded-[35px] p-6 mx-1'>
							<Routes>
								<Route
									path='/'
									element={
										<ErrorBoundary>
											<Home
												projects={projects}
												setProjects={setProjects}
											/>
										</ErrorBoundary>
									}
								/>

								<Route element={<Auth/>} >
									<Route
										path='/project/:id'
										element={
											<ErrorBoundary>
												<Project setProjects={setProjects} />
											</ErrorBoundary>
										}
									/>

									<Route
										path='/statictics'
										element={
											<ErrorBoundary>
												<Statictics projects={projects} />
											</ErrorBoundary>
										}
									/>

									<Route
										path='/settings'
										element={
											<ErrorBoundary>
												<Settings />
											</ErrorBoundary>
										}
									/>

									<Route
										path='/settings/account'
										element={
											<ErrorBoundary>
												<Account />
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
