import Button from '../../Components/Buttons';
import { BiListUl, BiGridAlt } from 'react-icons/bi';
import Grid from './Grid';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import List from './List';
import { Iprojects } from '../../App';
import Fetch from '../../Hooks/fetch';
import Notifications from '../../Hooks/Notifications';
import { useNavigate } from 'react-router-dom';

export interface IhandleProjectProps{
  projects: Iprojects[] | [];
  setProjects: Dispatch<SetStateAction<Iprojects[]>>
}

function Home(props: IhandleProjectProps) {
  const { projects, setProjects } = props;
  const [view, setView] = useState<'grid'|'list'>('grid');

  const getDate = () => {
    const currentDate = new Date();
    return `${currentDate.toLocaleDateString('en-Us', { month: 'long', day: 'numeric' })}`
  }
  const backColor = [
    ['#f2dac4', '#e19f5c'],
    ['#e8e7fd', '#5d56bb'],
    ['#Dbf6fd', '#2e7081'],
    ['#f2c9d8', '#b55675'],
    ['#c9f6da', '#5fbc86'],
    ['#d6dffe', '#6074cc']
  ];

  const totalprojects = projects.length;
  let inProgress = 0;
  let completedProgress = 0;
  if( projects && Array.isArray(projects)  ){
    inProgress = projects.filter( (project) => project.progress < 96.5 ).length
    completedProgress = projects.filter( (project) => project.progress >= 96.5 ).length
  }

  const naviTo = useNavigate()
  const Navi = (e: MouseEvent<HTMLButtonElement>, id: string) => naviTo(`/project/${id}SSvc44cq`);

  function handleDelete(e: MouseEvent<HTMLButtonElement>, id: string){
    Fetch(`https://taskhub-api.onrender.com/api/projects/${id}`, 'DELETE')
    .then( (data: { message: string }| { error: string } ) => {
      if( 'error' in data  ){
        Notifications( "Fetch Error", data.error );
      }else{
        Notifications('Message', data.message )
      }
    })
    .catch( ( err: Error ) => Notifications( 'Error While Deleting', err.message ) );

    Fetch( 'https://taskhub-api.onrender.com/api/projects', 'GET' )
    .then( ( res: Iprojects[] ) => setProjects(res) )
    .catch( ( err: Error ) => Notifications( 'Error While Deleting', err.message ) );
  };

  return (
    <main id="home" className="w-full h-full flex flex-col gap-2">
      <section className='grid grid-cols-2 font-bold md:text-2xl text-xl mb-6'>
        <p className="justify-self-start">Projects</p>
        <p className="justify-self-end">{getDate()}</p>
      </section>
      <section className='flex w-full mb-8'>
        <div className='flex lg:gap-6 md:gap-4 gap-2 justify-self-end w-4/5'>
          <div className="">
            <p className="text-xl lg:text-2xl font-bold">{ inProgress }</p>
            <p className="text-sm lg:text-xl font-extralight">In progress</p>
          </div>
          <div className="">
            <p className="text-xl lg:text-2xl font-bold">{ completedProgress }</p>
            <p className="text-sm lg:text-xl font-extralight">Completed</p>
          </div>
          <div className="">
            <p className="text-xl lg:text-2xl font-bold">{ totalprojects }</p>
            <p className="text-sm lg:text-xl font-extralight">Total</p>
          </div>
        </div>
        <div className='flex justify-end items-center w-1/5 lg:gap-3 md:gap-2 gap-1'>
          <Button Value={ BiListUl } onClick={() => setView('list')} more='p-2 text-2xl' bg={`${view === 'list' ? 'bg-slate-400 text-white': ''} hover:bg-slate-600`} />
          <Button Value={ BiGridAlt } onClick={() => setView('grid')} more='p-2 text-2xl' bg={`${view === 'grid' ? 'bg-slate-400 text-white': ''} hover:bg-slate-600`} />
        </div>
      </section>
      {
        view === 'grid' ? 
        ( <Grid projects={projects} setProjects={setProjects}  backColor={backColor} handleDelete={handleDelete} Navi={Navi} /> ) :
        ( <List projects={projects} setProjects={setProjects} backColor={backColor} handleDelete={handleDelete} Navi={Navi} /> )
      }
    </main>
  );
}
export default Home;