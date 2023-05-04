import Button from "../../../Components/Buttons";
import { BiInfoCircle, BiTrashAlt, BiCheckCircle } from 'react-icons/bi';
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { Iprojects } from "../../../App";

interface IgridProps{
  projects: Iprojects[];
  setProjects: Dispatch<SetStateAction<Iprojects[]>>
  backColor: (string[])[];
  handleDelete: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
  Navi: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
}

function Grid(props: IgridProps) {  
  const { backColor, projects, handleDelete, Navi } = props;

  return (
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-y-scroll">
      { projects && Array.isArray(projects) && projects.map( ( project, index) => {
      let i = index % backColor.length;
      const createdAt = new Date(project.createdAt).toLocaleString('en-US', { weekday: 'short', day: 'numeric' });
      const [weekday, day] = createdAt.toLowerCase().split(' ');
      console.log( project.createdAt )
      const target = new Date(project.target).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/');
      return (
          <div key={project._id} style={{ background: backColor[i][0] }} className={'w-full flex flex-col rounded-3xl p-3 text-slate-700'}>
            <section className="grid grid-cols-2 items-center w-full">
              <p className="justify-self-start capitalize font-medium text-xl">{ weekday } { day }</p>
              <Button Value={ BiInfoCircle } more='text-3xl p-1' bg='justify-self-end' styles={{ color: backColor[i][1] }} onClick={(e)=> Navi(e, project._id)} />
            </section>
            <section className="flex flex-col items-center justify-center mt-1">
              <p className="text-lg font-bold capitalize">{ project.name }</p>
              <p className="capitalize font-semibold">{ project.description }</p>
            </section>
            <section className="flex flex-col gap-1 items-center justify-center">
              <p className="self-start text-base font-semibold ">Progress</p>
              <div className="w-full h-2 rounded-lg bg-white">
                <div style={{ width: `${project.progress}%`, background: backColor[i][1] }} className={'h-full rounded-lg'}></div>
              </div>
              <p className="self-end font-bold text-lg">{ project.progress }%</p>
            </section>
            <section className="grid grid-cols-3 place-items-center">
              <Button 
                Value={ target }
                bg={''}
                more={'p-1 px-2 text-xl'}
                styles={{ background: backColor[i][1], color: backColor[i][0] }}
              />
              {
                project.progress > 96.5 ? 
                (<Button Value={ BiCheckCircle } bg={''} more={'p-1 px-2 text-2xl'} styles={{color: backColor[i][1]}} />) :
                (<div></div>)
              }
              <Button Value={ BiTrashAlt } bg={''} more={'p-1 px-2 text-2xl'} styles={{ color: backColor[i][1]}} onClick={(e) => handleDelete(e,project._id)} />
            </section>
          </div>
        )
      })
    }
  </section>
  );
}
export default Grid;