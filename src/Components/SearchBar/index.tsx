import { ChangeEvent } from "react";
import useContextApi from "../../Context";

interface ISearchProps{
  value: string;
  onChange: ( e: ChangeEvent<HTMLInputElement> ) => any;
}

function Searchbar(props: ISearchProps) {
  const { value, onChange } = props;
  const { state } = useContextApi()
  return (
    <input type={'input'}
      placeholder='Search Project...'
      onChange={ onChange }
      value={ value }
      disabled={ state.addProject || state.addTask || state.editAccount ? true : false }
      className="w-full h-full rounded-xl sm:rounded-lg md:rounded-2xl px-2 placeholder:text-gray-500 text-gray-600 outline-none drop-shadow-2xl text-lg tracking-wide text-bold"
    />
  );
}
export default Searchbar;