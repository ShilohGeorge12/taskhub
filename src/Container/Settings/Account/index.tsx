import { useNavigate } from 'react-router-dom';
import { FiSettings, FiEdit } from 'react-icons/fi';
import Button from '../../../Components/Buttons';
import useContextApi from '../../../Context';
import EditProfile from './EditAccount';

function Account() {
	const naviTo = useNavigate();
	const { state, dispatch } = useContextApi()

	const base64 = btoa( String.fromCharCode(...new Uint8Array((state.admin.image.data.data))) )
  const profileImage= `data:${state.admin.image.contentType};base64,${base64}`

	return (
		<section className='relative'>
			<div className='absolute top-0 right-0'>
				<Button
					Value={FiSettings}
					bg={' bg-slate-300 hover:bg-blue-500 hover:text-white dark:hover:bg-slate-500 dark:bg-slate-600 '}
					more={'p-2 text-2xl'}
					onClick={() => naviTo('/settings')}
				/>
			</div>
			<h1 className='w-full text-center text-2xl lg:text-3xl font-bold tracking-widest'>Account</h1>
			<div className='flex flex-col items-center justify-center gap-6'>
				<div className='w-1/2 mt-6 flex items-center justify-center'>
					<img
						src={ profileImage }
						alt='profilePic'
					/>
				</div>
				<div className='text-center md:w-2/3 flex flex-col gap-4'>
					<div className='w-full'>
						<p className='text-2xl font-bold hover:bg'>{ state.admin.username }</p>
					</div>
					<div className='w-full'>
						<p className='text-lg font-semibold tracking-wide'>{ state.admin.email }</p>
					</div>
				</div>
				<div className="flex justify-center w-full">
					<Button
						Value={ FiEdit }
						bg={'bg-blue-500 text-white dark:bg-slate-500 hover:bg-blue-600 dark:hover:bg-slate-600'}
						more={'text-2xl p-2'}
						onClick={ () => dispatch({ type:'editAccount', payload: { editAccount: true } }) }
					/>
				</div>
			</div>
			{ state.editAccount && <EditProfile /> }
		</section>
	);
}
export default Account;
