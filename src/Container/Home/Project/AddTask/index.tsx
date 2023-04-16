import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { createPortal } from 'react-dom';
import { BiXCircle } from 'react-icons/bi';
import { Iprojects } from '../../../../App';
import Button from '../../../../Components/Buttons';
import useContextApi from '../../../../Context';
import Fetch from '../../../../Hooks/fetch';
import Notifications from '../../../../Hooks/Notifications';

interface IaddTask{
	validId?: string,
	Project: Iprojects | null;
	setProject: Dispatch<SetStateAction<Iprojects | null>>;
}

function AddTask( { Project, setProject, validId }: IaddTask ) {
	const { state, dispatch } = useContextApi();
	const [newTasks, setNewTasks] = useState('');

const handleNewTask = (e: ChangeEvent<HTMLTextAreaElement>) => setNewTasks(e.target.value);

	function handleSubmit(){
		if( Project ){
		let arr = newTasks.split('\n');
		const len = arr.length + Project.task.length;
		const Points = Math.round(100 / len);
		const newarr = arr.map((value: string) => {
			let obj: { completed: boolean; content: string; points: number } = {
				completed: false,
				content: value,
				points: Points,
			};
			return obj;
		});
		const oldTask = Project.task.filter( task => task.points = Points );
			const Task = oldTask.concat( newarr );
			const completed = Task.filter( task => task.completed ).length;
			let numProject = 0;
			let currentprogress = 0
			while( numProject < completed ){
				currentprogress += Points
				numProject ++;
			}
			const toSend = {
				name: Project.name,
				description: Project.description,
				progress: currentprogress,
				target: Project.target,
				task: Task,
			}
			Fetch(`https://taskhub-api.onrender.com/api/projects/${validId}`, 'PUT', toSend)
			.then((data: Iprojects | { error: string }) => {
				if ('error' in data) {
					Notifications('Fetch Error', data.error);
				} else {
					setProject(data);
				}
			})
			.catch((err: Error) => Notifications('Error While Fetching Project Details', err.message));

			Fetch(`https://taskhub-api.onrender.com/api/projects/${validId}`, 'GET')
			.then((data: Iprojects | { error: string }) => {
				if ('error' in data) {
					Notifications('Fetch Error', data.error);
				} else {
					setProject(data);
				}
			})
			.catch((err: Error) => Notifications('Error While Fetching Project Details', err.message));
			dispatch({ type: 'addTask', payload: { addTask: false } })
		}
	};

	return createPortal(
		<section className={`${state.theme}`}>
			<form className='w-4/5 md:w-3/5 lg:w-1/2 h-3/5 absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 dark:bg-slate-600 rounded-3xl p-3 shadow-2xl'>
				<div className='relative flex items-center justify-center'>
					<p className=' dark:text-white font-bold text-3xl tracking-wider'>New Task</p>
					<Button
						Value={BiXCircle}
						bg={'bg-red-500'}
						more={'text-white text-3xl p-1 rounded-xl absolute top-0 right-2'}
						onClick={() => dispatch({ type: 'addTask', payload: { addTask: false } })}
						modal
					/>
				</div>
				<div className='flex flex-col w-11/12 mx-auto pt-5 gap-4 md:gap-2'>
					<textarea
						id={'task'}
						value={newTasks}
						onChange={ handleNewTask }
						placeholder={'Project Task ( Press Enter To Split The Task )'}
						className='h-40 rounded-xl text-gray-600 placeholder:text-gray-500 placeholder:text-lg text-xl font-semibold dark:focus:outline-slate-500 hover:border-gray-500 px-2 '
					/>
					{
						newTasks ? (
							<Button
								Value={'Submit'}
								bg={'bg-blue-500 text-white hover:bg-blue-400'}
								more={'font-bold tracking-widest text-xl'}
								modal
								onClick={ handleSubmit }
							/>
						) : (
							<>
							<Button
							Value={'Submit'}
							bg={'bg-blue-500 text-white hover:bg-blue-400'}
							more={'font-bold tracking-widest text-xl'}
							modal
							/>
							<p className="text-center text-xl dark:text-white text-slate-600">
								Task Must Not Be Empty!
							</p>
							</>
						)
					}
				</div>
			</form>
		</section>,
		document.getElementById('modal') as HTMLDivElement
	);
}
export default AddTask;
