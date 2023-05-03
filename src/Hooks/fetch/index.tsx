
type Tmethod = 'POST'| 'GET'| 'DELETE'| 'PUT';

type TRequestApi =  ( endPoint: string, method: Tmethod, body?: unknown ) => Promise<any>

interface Ioptions{
  method: Tmethod;
  headers: Headers,
  body?: string,
}

const Fetch: TRequestApi = async (endPoint, method, body ) =>  {

  const authKey = `${import.meta.env.VITE_authKey}`;
  const apiKey = `${import.meta.env.VITE_apiKey}`;

  const h = new Headers();
  h.append('Content-Type','application/json');
  h.append('x-api-key', apiKey);
  h.append('Authorization', authKey);

  const options: Ioptions = {
    method,
    headers: h,
  }

  if( method === 'POST' || method === 'PUT' ){
    options.body = JSON.stringify(body)
  }
  const url = `http://localhost:1550/${endPoint}`;
  // const url = `https://taskhub-api.onrender.com/${endPoint}`;

  const req = new Request(url, options);
  const Response = await fetch(req);
  return Response.json();
}
export default Fetch;