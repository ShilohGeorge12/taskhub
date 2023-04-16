import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../../Components/Buttons';
import Fetch from '../../../Hooks/fetch';
import { BiTrashAlt, BiCheck, BiEdit } from 'react-icons/bi';
import Notifications from '../../../Hooks/Notifications';
import { Iprojects } from '../../../App';
import useContextApi from '../../../Context';
import AddTask from './AddTask';

interface IProjectProps{
	setProjects: Dispatch<SetStateAction<Iprojects[]>>
}

function Project({ setProjects }: IProjectProps ) {
	const { state, dispatch } = useContextApi();
	const [Project, setProject] = useState<Iprojects | null>(null);
	const params = useParams();
	const validId = params.id?.split('S')[0];
	useEffect(() => {
		Fetch(`projects/${validId}`, 'GET')
			.then((data: Iprojects | { error: string }) => {
				if ('error' in data) {
					Notifications('Fetch Error', data.error);
				} else {
					setProject(data);
				}
			})
			.catch((err: Error) => Notifications('Error While Fetching Project Details', err.message));
	}, []);

	const handleTaskCompleted = (e: MouseEvent<HTMLButtonElement>, id: number) => {
		e.preventDefault();
		if (Project) {
			const completedTask = Project.task[id];
			completedTask.completed = true;
			const completedTasksNum = Project.task.filter( task => task.completed ).length;
			let ProjectProgress = 0;
			let currentprogress = 0
			while( ProjectProgress < completedTasksNum ){
				currentprogress += completedTask.points
				ProjectProgress ++;
			}
			const toSend = {
				name: Project.name,
				description: Project.description,
				progress: currentprogress,
				target: Project.target,
				task: Project.task,
			};
			Fetch(`projects/${validId}`, 'PUT', toSend)
				.then((data: Iprojects | { error: string }) => {
					if ('error' in data) {
						Notifications('Fetch Error', data.error);
					} else {
						setProject(data);
					}
				})
				.catch((err: Error) => Notifications('Error While Fetching Project Details', err.message));

			Fetch(`projects/${validId}`, 'GET')
				.then((data: Iprojects | { error: string }) => {
					if ('error' in data) {
						Notifications('Fetch Error', data.error);
					} else {
						setProject(data);
					}
				})
				.catch((err: Error) => Notifications('Error While Fetching Project Details', err.message));
			Fetch(`projects`, 'GET')
				.then((data: Iprojects[] | { error: string }) => {
					if ('error' in data) {
						Notifications('Fetch Error', data.error);
					} else {
						setProjects(data)
					}
				})
				.catch((err: Error) => Notifications('Error While Fetching Project Details', err.message));
		}
	};

	const handleDeleteTask = (e: MouseEvent<HTMLButtonElement>, id: number) => {
		if (Project) {
			const remainingTask = Project.task.filter((project, i) => i !== id);
			const newTaskPoints = Math.round(100 / remainingTask.length);
			const newTask = remainingTask.filter((task) => (task.points = newTaskPoints));
			const completed = remainingTask.filter( task => task.completed ).length;
			let ProjectProgress = 0;
			let currentprogress = 0;
			while( ProjectProgress < completed ){
				currentprogress += newTaskPoints;
				ProjectProgress ++;
			}
			const toSend = {
				name: Project.name,
				description: Project.description,
				progress: currentprogress,
				target: Project.target,
				task: newTask,
			};
			Fetch(`projects/${validId}`, 'PUT', toSend)
				.then((data: Iprojects | { error: string }) => {
					if ('error' in data) {
						Notifications('Fetch Error', data.error);
					} else {
						setProject(data);
					}
				})
				.catch((err: Error) => Notifications('Error While Fetching Project Details', err.message));

			Fetch(`projects/${validId}`, 'GET')
				.then((data: Iprojects | { error: string }) => {
					if ('error' in data) {
						Notifications('Fetch Error', data.error);
					} else {
						setProject(data);
					}
				})
				.catch((err: Error) => Notifications('Error While Fetching Project Details', err.message));
			Fetch(`projects`, 'GET')
				.then((data: Iprojects[] | { error: string }) => {
					if ('error' in data) {
						Notifications('Fetch Error', data.error);
					} else {
						setProjects(data)
					}
				})
				.catch((err: Error) => Notifications('Error While Fetching Project Details', err.message));
		}
	};

	let myDate: string | null = null;

	if (Project) {
		myDate = new Date(Project.createdAt).toDateString();
	}
	const bg = 'bg-slate-500 hover:bg-blue-500 hover:dark:bg-blue-500 text-white';

	return (
		<section className='flex flex-col gap-3'>
			{Project && (
				<>
					<h1 className='text-center text-2xl font-bold'>{Project.name}</h1>
					<h2 className='text-center text-xl font-semibold'>{Project.description}</h2>
					<h3 className='relative text-center text-base tracking-wide font-semibold'>
						Tasks
						<div className='absolute top-0 right-0'>
							<Button
								Value={BiEdit}
								bg={bg}
								more={' text-lg p-1'}
								onClick={() => dispatch({ type: 'addTask', payload: { addTask: true } })}
							/>
						</div>
					</h3>
					<ul className='flex flex-col gap-2'>
						{Project?.task.map((task, index) => (
							<li
								key={index}
								className={` ${task.completed ? 'opacity-60 line-through' : ''} grid grid-cols-3 w-full`}>
								<p className='w-full col-span-2 whitespace-pre-line'>{task.content}</p>
								<div className='flex gap-1 justify-end'>
									{task.completed ? (
										<Button
											Value={BiCheck}
											bg={bg}
											more={'p-1 text-xl'}
										/>
									) : (
										<Button
											Value={BiCheck}
											bg={bg}
											more={'p-1 text-xl'}
											onClick={(e) => handleTaskCompleted(e, index)}
										/>
									)}
									<Button
										Value={BiTrashAlt}
										bg={'bg-slate-500 hover:bg-blue-500 hover:dark:bg-blue-500 text-white'}
										more={'p-1 text-xl'}
										onClick={(e) => handleDeleteTask(e, index)}
									/>
								</div>
							</li>
						))}
					</ul>
					<div className='w-full h-2 rounded-xl dark:bg-white'>
						<div
							style={{ width: `${Project.progress}%` }}
							className='h-full rounded-xl bg-blue-500'></div>
					</div>
					<p className='text-center text-2xl font-bold'>{Project.progress}%</p>
					<div className='text-center text-lg'>{myDate}</div>
				</>
			)}
			{ state.addTask && ( 
					<AddTask Project={ Project } setProject={ setProject } validId={validId} /> 
			) }
		</section>
	);
}
export default Project;
