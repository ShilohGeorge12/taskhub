import { ChangeEvent, useState } from "react";
import { createPortal } from "react-dom";
import { BiXCircle } from "react-icons/bi";
import Button from "../../../../Components/Buttons";
import Input from "../../../../Components/Input";
import useContextApi from "../../../../Context";
import { Iadmin } from "../../../../Context/interface";
import Fetch from "../../../../Hooks/fetch";
import Notifications from "../../../../Hooks/Notifications";
import avater from '../../../../assets/Images/man.png';

function EditProfile() {

  const { state, dispatch } = useContextApi();
  const [inputVal, setInputVal] = useState<{ username: string, email: string, profilePic: File | null }>({
    username: state.admin.username,
    email: state.admin.email,
    profilePic: null
  });

  function handleProfileImage(e: ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files.length > 0){
      setInputVal({ ...inputVal, profilePic: e.target.files[0]})
    }
  };

  function convertToBase64(file: Blob){
    return new Promise<string | null | ArrayBuffer>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error)
    })
  };
  
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setInputVal( prevState => ({ ...prevState, [e.target.id]: e.target.value}) )
  
  async function handleSubmit(){
    const authKey = `${import.meta.env.VITE_authKey}`;
    const apiKey = `${import.meta.env.VITE_apiKey}`;

    if( inputVal.profilePic ){
      const data = new FormData()
      data.append('image', inputVal.profilePic)
      data.append('email', inputVal.email)
      data.append('username', inputVal.username)

      fetch('editaccount', {
        method: 'POST',
        body: data,
        headers: {
          'x-api-key': apiKey,
          'Authorization': authKey
        }
      })
    // Fetch('http://localhost:4550/api/editaccount', 'POST', result )
    .then( res => res.json())
    .then( ( response: any | { error: string } ) => {
      if( 'error' in response ){
        Notifications( "Fetch Error", response.error );
      }
      console.log(response)
    })
    .catch( ( err: Error ) => Notifications( 'Error While Updating Account', err.message ) );

    Fetch('admin', 'GET')
    .then( ( response: Iadmin | { error: string } ) => {
      if( 'error' in response ){
        Notifications( "Fetch Error", response.error );
      }else{
        dispatch({ type: 'admin', payload: { admin: response } })
      }
    })
    .catch( ( err: Error ) => Notifications( 'Error While Updating Account', err.message ) );
    }
    dispatch({ type: 'editAccount', payload: { editAccount: false } })
  };

  return createPortal(
		<section className={`${state.theme}`}>
			<form className='w-4/5 md:w-3/5 lg:w-1/2 h-3/5 absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 dark:bg-slate-600 rounded-3xl p-3 shadow-2xl'>
				<div className='relative flex items-center justify-center'>
					<p className=' dark:text-white font-bold text-3xl tracking-wider'>Edit Profile</p>
          <Button
						Value={ BiXCircle }
						bg={'bg-red-500'}
						more={'text-white text-2xl md:text-3xl p-1 rounded-xl absolute top-0 right-1 md:right-2'}
						onClick={ () => dispatch({ type:'editAccount', payload: { editAccount: false  } }) }
						modal
					/>
        </div>

        <div className="flex flex-col w-11/12 mx-auto mt-5 gap-4">

          <input 
            type={'file'}
            id='profilePic'
            accept={'Image/*'}
            className={'rounded-xl h-12 md:h-10 text-gray-600 dark:text-white text-xl font-semibold dark:focus:outline-slate-500 hover:border-gray-500 px-2'}
            onChange={ handleProfileImage }
          />

          <Input
            type="text"
            id="username"
            placeholder="username"
            value={ inputVal.username }
            onChange={ handleInput }
          />

          <Input
            type="email"
            id="email"
            placeholder="email"
            value={inputVal.email}
            onChange={ handleInput }
          />
        </div>

        <div className="w-full flex items-center mt-6">
          <Button
            Value={'Submit'}
            bg={'bg-blue-500 hover:bg-blue-400'}
            more={'w-3/4 mx-auto text-white text-2xl md:text-3xl font-bold p-1 rounded-xl tracking-wider '}
            onClick={ handleSubmit }
            modal
          />
        </div>  
      </form>
    </section>
    ,
    document.getElementById('modal') as HTMLDivElement
  );
}
export default EditProfile;