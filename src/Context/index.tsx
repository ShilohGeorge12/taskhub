import { createContext, ReactNode, useContext, useReducer } from "react";
import { Taction, IState } from './interface';

const initState: IState = {
  admin: {
    _id: '',
    username: '',
    email: '',
    isloggin: false,
    image: {
      data: {
        data: []
      },
      contentType: ''
    },
  }, 
  addProject: false,
  addTask: false,
  editAccount: false,
  theme: 'light',
}

const context = createContext({ state: initState, dispatch: (value: Taction) => {} });

function reducer(state: IState, action: Taction){
  switch( action.type ){

    case 'admin':
      return { ...state, admin: action.payload.admin }

    case 'addTask':
      return { ...state, addTask: action.payload.addTask };

    case 'addProject':
      return { ...state, addProject: action.payload.addProject };

    case 'editAccount':
      return { ...state, editAccount: action.payload.editAccount };

    case 'themeState':
      return { ...state, theme: action.payload.theme };

    default: 
    return state;
  }
};

export const ContextProvider = ({ children }: { children: ReactNode } ) => {

  const [ state, dispatch ] = useReducer( reducer, initState );
  return (
    <context.Provider value={{ state, dispatch }}>
      { children }
    </context.Provider>
  )
};

const useContextApi = () => useContext(context) ;


export default useContextApi;