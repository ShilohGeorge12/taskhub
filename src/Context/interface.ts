export interface Iadmin{
  readonly _id: string;
  username: string,
  email: string,
  isloggin: boolean,
  image: {
    data: { data: any[] },
    contentType: string
  },
}

type Taction = 
{ type: 'admin', payload: { admin: Iadmin} }| 
{ type: 'addProject', payload: { addProject: boolean} }| 
{ type: 'addTask', payload: { addTask: boolean} }| 
{ type: 'editAccount', payload: { editAccount: boolean } }| 
{ type: 'themeState', payload: { theme: 'light' | 'dark'; } }; 


interface IState{
  admin: Iadmin;
  addProject: boolean;
  addTask: boolean;
  editAccount: boolean;
  theme: 'light' | 'dark';
}

export type { Taction, IState }