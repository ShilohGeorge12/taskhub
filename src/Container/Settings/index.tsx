import { useNavigate } from 'react-router-dom';
import useContextApi from '../../Context';

function Settings() {

  const { state } = useContextApi()
  const naviTo = useNavigate()

  const base64 = btoa( String.fromCharCode(...new Uint8Array((state.admin.image.data.data))) )
  const profileImage= `data:${state.admin.image.contentType};base64,${base64}`

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="flex w-1/2 p-1 mx-auto items-center justify-center">
        <img src={ profileImage } alt="profileImage" />
      </div>
      <h2 className='text-3xl font-bold'>{ state.admin.username }</h2>
      <h3 className='text-xl font-semibold tracking-wide'>{ state.admin.email }</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:w-5/6 gap-4">
        <div className="rounded-2xl bg-slate-200 dark:bg-slate-500 p-2 hover:cursor-pointer" onClick={() => naviTo('/settings/account')}>
          <h4 className="text-center font-semibold text-xl"> Account </h4>
          <p className="text-center text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quasi minus nisi hic at impedit cumque nobis eligendi.
          </p>
        </div>
        <div className="rounded-2xl bg-slate-200 dark:bg-slate-500 p-2">
          <h4 className="text-center font-semibold text-xl"> Set Goals </h4>
          <p className="text-center text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quasi minus nisi hic at impedit cumque nobis eligendi.
          </p>
        </div>
      </div>
    </section>
  );
}
export default Settings;