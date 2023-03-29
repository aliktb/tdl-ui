import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { AUTH0_AUDIENCE, TDL_API_URL } from '../constants/paths';


const AxiosTest = () => {

  const [apiResult, SetApiResult] = useState({});
  const { user, isAuthenticated, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  const getThing = async (url, token) => {
    try {
      const response = await axios.get(url, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
      });
      SetApiResult(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getUserMetadata = async () => {
  
      try {
        const accessToken = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: AUTH0_AUDIENCE,
            scope: "read:current_user",
          },
        });


  
        const getTasksUrl = `${TDL_API_URL}/tasks/user/${user.sub}`;
  

        getThing(getTasksUrl, accessToken);
  
      } catch (e) {
        console.log(e);
      }
    };
  
    isAuthenticated && getUserMetadata();
  }, [getAccessTokenWithPopup, isAuthenticated]);



  return (<>
    {apiResult.data?.length && apiResult.data.map((task) => {
      return (<div key={task.id}>
        <h3>{task.id}</h3>
        <p>{dayjs(task.dueDate).format('HH:mm DD/MM/YYYY')}</p>
        <p>completed = {task.complete.toString()}</p>
      
      </div>)
    })}
    
    {isAuthenticated && <h2>{user.email}</h2>}
  </>);
}
 
export default AxiosTest;
