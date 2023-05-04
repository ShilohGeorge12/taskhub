import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { BiInfoCircle, BiTrashAlt, BiCheckCircle } from 'react-icons/bi';
import { IhandleProjectProps } from '..';
import Button from "../../../Components/Buttons";
import { Iprojects } from '../../../App';

interface IlistProps{
  projects: Iprojects[];
  setProjects: Dispatch<SetStateAction<Iprojects[]>>
  backColor: (string[])[];
  handleDelete: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
  Navi: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
}

function List(props: IlistProps) {
  const { backColor, projects, handleDelete, Navi } = props;

  return (
    <section className="flex flex-col gap-4 overflow-y-scroll items-center justify-center">
      {
        projects && Array.isArray(projects) && projects.map( (project, index) => {
          let i = index % backColor.length;
          const date = new Date(project.target).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/')
          return (
            <section key={project._id} style={{ background: backColor[i][0] }} className="flex rounded-lg w-full gap-2 p-2 text-slate-700">
              <div className="w-1/5">
                <div className="capitalize whitespace-nowrap overflow-hidden text-ellipsis">{ project.name }</div>
                <div className="capitalize whitespace-nowrap overflow-hidden text-ellipsis">{ project.description }</div>
                <div style={{ background: backColor[0][1], color: backColor[i][0] }}
                  className="px-1 text-xl text-center rounded-lg whitespace-nowrap overflow-hidden text-ellipsis"
                  >{ date }
                </div>
              </div>
              <div className="w-1/2 md:w-3/5 lg:w-3/4 flex flex-col gap-1 items-center">
                <p className="self-start text-base font-semibold ">Progress</p>
                <div className="w-full h-2 bg-white rounded-md">
                  <div style={{ width: `${project.progress}%`, background: backColor[i][1] }} className="h-full rounded-md"></div>
                </div>
                <p className="self-end font-bold text-lg">{ project.progress }%</p>
              </div>
              <Button Value={ BiCheckCircle } bg={''} more={'p-1 text-2xl'} styles={{color: backColor[i][1]}} />
              <Button Value={ BiTrashAlt } bg={''} more={'p-1 text-2xl'} styles={{color: backColor[i][1]}} onClick={ (e) => handleDelete(e, project._id) } />
              <Button Value={ BiInfoCircle } bg={''} more={'p-1 text-2xl'} styles={{ color: backColor[i][1]}} onClick={ (e) => Navi(e, project._id) } />
            </section>
          )
        })
      }
    </section>
  );
}
export default List;