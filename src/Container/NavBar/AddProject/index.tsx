import { useState, ChangeEvent, MouseEvent, SetStateAction, Dispatch } from 'react';
import Button from '../../../Components/Buttons';
import useContextApi from '../../../Context';
import Input from '../../../Components/Input';
import Fetch from '../../../Hooks/fetch';
import Notifications from '../../../Hooks/Notifications';
import { Iprojects } from '../../../App';
import { createPortal } from 'react-dom';
import { BiXCircle } from 'react-icons/bi';

type Tstate = {
	name: string;
	description: string;
	target: string;
	task: string;
};

function AddProject({ setProjects }: { setProjects: Dispatch<SetStateAction<Iprojects[]>> }) {
	const { dispatch, state } = useContextApi();
	const [newproject, setNewproject] = useState<Tstate>({ name: '', description: '', target: '', task: '' });

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setNewproject((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
	}

	function handleTextArea(e: ChangeEvent<HTMLTextAreaElement>) {
		e.preventDefault();

		setNewproject((prevState) => ({ ...prevState, task: e.target.value }));
	}

	async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		let arr = newproject.task.split('\n');
		const Points = Math.round(100 / arr.length);
		const newarr = arr.map((value) => {
			let obj: { completed?: false; content?: string; points?: number } = {};
			obj.completed = false;
			obj.content = value;
			obj.points = Points;
			return obj;
		});
		const result = {
			name: newproject.name,
			description: newproject.description,
			progress: 0,
			target: `${newproject.target} Days`,
			task: newarr,
		};
		await Fetch('api/projects', 'POST', result)
			.then((data: Iprojects[] | { error: string }) => {
				if ('error' in data) {
					Notifications('new Project Error!', data.error);
				} else {
					setProjects(data);
				}
			})
			.catch((err: Error) => Notifications('new Project Error!', err.message));

		await Fetch('api/projects', 'GET')
			.then((data) => setProjects(data))
			.catch((err) => Notifications('Fetch Error', JSON.stringify(err.message)));

		setNewproject({ name: '', description: '', target: '', task: '' });
		dispatch({ type: 'addProject', payload: { addProject: false } });
	}

	return createPortal(
		<section className={`${state.theme}`}>
			<form className='w-4/5 md:w-3/5 lmd:w-9/12 lg:w-1/2 h-5/6 md:h-2/4 lmd:h-3/4 lg:h-4/6 absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 dark:bg-slate-600 rounded-3xl p-3 shadow-2xl'>
				<div className='relative flex items-center justify-center'>
					<p className=' dark:text-white font-bold text-3xl tracking-wider'>New Project</p>
					<Button
						Value={BiXCircle}
						bg={'bg-red-500'}
						more={'text-white text-3xl p-1 rounded-xl absolute top-0 right-2'}
						onClick={() => dispatch({ type: 'addProject', payload: { addProject: false } })}
						modal
					/>
				</div>
				<div className='flex flex-col w-11/12 mx-auto pt-5 gap-4 md:gap-3'>
					<Input
						id={'name'}
						type={'text'}
						value={newproject.name}
						onChange={handleChange}
						placeholder={'Project Name'}
					/>
					<Input
						id={'description'}
						type={'text'}
						value={newproject.description}
						onChange={handleChange}
						placeholder={'Project Description'}
					/>
					<Input
						id={'target'}
						type={'text'}
						value={newproject.target}
						onChange={handleChange}
						placeholder={'Project Target ( Only Numbers )'}
					/>
					<textarea
						id={'task'}
						value={newproject.task}
						onChange={handleTextArea}
						placeholder={'Project Task ( Press Enter To Split The Task )'}
						className='h-24 rounded-xl text-gray-600 placeholder:text-gray-500 placeholder:text-lg text-xl font-semibold dark:focus:outline-slate-500 hover:border-gray-500 px-2 '
					/>


					{ newproject.name && newproject.description && newproject.target && newproject.task ? (
							<Button
								Value={'Submit'}
								bg={'bg-blue-500 text-white hover:bg-blue-400'}
								more={'font-bold tracking-widest text-xl'}
								modal
								onClick={handleSubmit}
							/>
						) : (
							<>
								<Button
									Value={'Submit'}
									bg={'bg-blue-500 text-white hover:bg-blue-400'}
									more={'font-bold tracking-widest text-xl'}
									modal
								/>
								<p className='text-center text-lg dark:text-white text-slate-600'>The Fields Should not be Empty</p>
							</>
						)
					}
				</div>
			</form>
		</section>,
		document.getElementById('modal') as HTMLDivElement
	);
}
export default AddProject;
