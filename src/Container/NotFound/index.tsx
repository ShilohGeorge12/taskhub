import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Buttons";

function NotFound() {

  const naviTo = useNavigate()
  const Navi = (e: MouseEvent<HTMLButtonElement>, id: string) => naviTo(`/`);

  return (
    <section className="flex flex-col gap-5 items-center justify-center">
      <p className="text-2xl"> Page Not Found </p>
      <Button Value={'Back To Home'} bg={'dark:bg-slate-500 hover:dark:bg-blue-600 hover:bg-blue-600 hover:text-white'} more={'p-2 text-lg lg:text-xl'} onClick={Navi} />
    </section>
  );
}
export default NotFound;