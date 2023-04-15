import { MouseEvent } from "react";
import { IconType } from "react-icons";
import useContextApi from "../../Context";

type Icon = IconType;

interface IbuttonProps {
	onClick?: (e: MouseEvent<HTMLButtonElement>, id?: any) => void; //Come Back To Change This
	bg: string;
  Value: Icon | string;
	more?: string;
	modal?: true;
	styles?: { color: string, background?: string };
}

function Button(props: IbuttonProps) {
	const { onClick, Value, more, bg, styles, modal } = props;
	const { state } = useContextApi()

	const isDisabled = (isLoggedin: boolean ,addProject: boolean, addTask: boolean, editAccount: boolean,	modal?: true): boolean => {
		if( isLoggedin ){
			if( addProject || addTask || editAccount ){
				if( modal ){
					return false
				}
				return true
			}
			return false
		}
		return true
	};


	return (
		<>
			{
				<button
					type='button'
					style={styles}
					className={` ${bg} rounded-md capitalize ${more}`}
					onClick={onClick}
					disabled={ isDisabled( state.admin.isloggin, state.addProject , state.addTask , state.editAccount, modal )  }
					>
					{ typeof Value === 'string' ? Value : <Value />}
			</button>
			}
		</>
	);
}
export default Button;
