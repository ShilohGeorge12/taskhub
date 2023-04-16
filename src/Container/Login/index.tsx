import { ChangeEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input';
import useContextApi from '../../Context';
import { Iadmin } from '../../Context/interface';
import Fetch from '../../Hooks/fetch';
import Notifications from '../../Hooks/Notifications';

type TloginVal = { username: string; password: string };

function Login() {
	const [loginVal, setLoginVal] = useState<TloginVal>({ username: '', password: '' });
	const handleInput = (e: ChangeEvent<HTMLInputElement>) => setLoginVal((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  const navito = useNavigate();
  const { dispatch } = useContextApi()

	function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    Fetch('https://taskhub-api.onrender.com/api/login', 'PUT', loginVal)
    .then( ( res: Iadmin | { error: string } ) => {
      if( 'error' in res ){
        Notifications('Login Error', res.error )
      }else{
        dispatch({ type: 'admin', payload: { admin: res } })
      }
    })
    .catch((err: Error) => Notifications('Login Error', JSON.stringify(err.message)) );
		setLoginVal({ username: '', password: '' });
    navito('/')
	}

	return (
		<form className='flex flex-col gap-6'>
			<h1 className='text-center text-3xl tracking-wider font-bold mb-2'>Login</h1>
      <div className='flex flex-col gap-6 md:w-3/5 md:mx-auto lg:w-1/2'>
        <Input
          id={'username'}
          type={'text'}
          value={loginVal.username}
          onChange={handleInput}
          placeholder={'UserName'}
          more={'bg-slate-200'}
          />

        <Input
          type={'password'}
          id={'password'}
          value={loginVal.password}
          onChange={handleInput}
          placeholder={'Password'}
          more={'bg-slate-200'}
        />

        { loginVal.username && loginVal.password ? (
          <button 
            className='rounded-md capitalize bg-blue-600 hover:bg-blue-500 text-white text-2xl font-bold tracking-wider w-full py-1'
            onClick={handleSubmit}
            >
            Submit
          </button>
        ) : (
          <>
            <button 
              className='rounded-md capitalize bg-blue-600 hover:bg-blue-500 text-white text-2xl font-bold tracking-wider w-full py-1'
              onClick={handleSubmit}
              disabled
              >
              Submit
            </button>
            <p className='text-center text-lg dark:text-white text-slate-600'>The Fields Should not be Empty</p>
          </>
        )}
      </div>
		</form>
	);
}
export default Login;
