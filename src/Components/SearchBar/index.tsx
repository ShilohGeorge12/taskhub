import useContextApi from "../../Context";

function Searchbar() {
  const { state } = useContextApi()
  return (
    <input type={'search'}
      placeholder='Search'
      disabled={ state.addProject || state.addTask || state.editAccount ? true : false }
      className="w-full h-full rounded-xl sm:rounded-lg md:rounded-2xl px-2 placeholder:text-gray-500 text-gray-600 outline-none drop-shadow-2xl text-lg tracking-wide text-bold"
    />
  );
}
export default Searchbar;