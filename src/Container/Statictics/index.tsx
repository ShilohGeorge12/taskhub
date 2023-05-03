import { Iprojects } from "../../App";
import PieChart from "./PieChart";

interface IStats{
  projects: Iprojects[] | [];
}

function Statictics({ projects }: IStats) {
  
  const totalprojects = projects.length;
  let inProgress = 0;
  let completedProgress = 0;
  if( projects && Array.isArray(projects)  ){
    inProgress = projects.filter( (project) => project.progress < 96.5 ).length
    completedProgress = projects.filter( (project) => project.progress >= 96.5 ).length
  }

  const data = [
    { status: 'completed', count: completedProgress },
    { status: 'inProgress', count: inProgress },
  ];

  return (
    <section className="flex flex-col gap-2 items-center justify-center">
      <h1 className="text-3xl">Total Project: {totalprojects}</h1>
      <div className="w-full h-1/2 sm:w-2/3 md:w-3/5 lg:w-2/4">
        <PieChart data={data} />
      </div>
    </section>
  );
}
export default Statictics;