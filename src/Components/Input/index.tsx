import { ChangeEvent } from "react";

interface Iinput{
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id: string;
  placeholder: string;
  type: string;
  more?: string;
}

function Input(props: Iinput) {
  const { value, onChange, id, placeholder, type, more } = props;

	return (
		<input
			type={ type }
      id={ id }
			className={`rounded-xl h-12 md:h-10 text-gray-600 placeholder:text-gray-500 placeholder:text-lg text-xl font-semibold px-2 dark:focus:border-2 dark:focus:border-blue-400 shadow-sm outline-none  ${more}`}
      value={ value }
      onChange={ onChange }
			placeholder={ placeholder }
      autoComplete='off'
		/>
	);
}
export default Input;
