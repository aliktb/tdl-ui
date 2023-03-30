import { useAuth0 } from '@auth0/auth0-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAxios } from './hooks';


const UserTasks = () => {

  const [apiResult, SetApiResult] = useState({});
  const axiosInstance = useAxios();
  const { user, isAuthenticated } = useAuth0();


  useEffect(() => {
    const getUserMetadata = async () => {

      if (axiosInstance) {

        try {

          const getTasksUrl = `/tasks/user/${user.sub}`;

          const { data } = await axiosInstance.get(getTasksUrl);

          SetApiResult(data);

        } catch (e) {
          console.log(e);
        }
      };

    }
    getUserMetadata();

  }, [axiosInstance]);



  return (
    <>
      {apiResult?.length && apiResult.map((task) => {
        return (
          <div key={task.id}>
            <h3>{task.id}</h3>
            <p>{dayjs(task.dueDate).format('HH:mm DD/MM/YYYY')}</p>
            <p>completed = {task.complete.toString()}</p>
          </div>
        )
      })}

      {isAuthenticated && <h2>{user.email}</h2>}
    </>);
}

export default UserTasks;
