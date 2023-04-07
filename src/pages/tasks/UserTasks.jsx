import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Card, CardBody, Checkbox, Flex, Select, Text } from '@chakra-ui/react';
import { useAxios } from '../../utils/hooks';
import './tasks.css';

const UserTasks = ({hasTaskUpdated}) => {
  const [listOfTasks, setListOfTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [orderOfList, setOrderOfList] = useState('asc');
  const axiosInstance = useAxios();
  const { user, isAuthenticated } = useAuth0();

  const sortTasks = (tasksToSort, order) => {

    const sortedByDate = _.orderBy(tasksToSort, ['dueDate'], [order]);
    setSortedTasks(sortedByDate);
  }

  useEffect(() => {
    const getUserMetadata = async () => {
      if (axiosInstance) {
        try {
          const getTasksUrl = `/tasks/user/${user.sub}`;

          const { data } = await axiosInstance.get(getTasksUrl);

          setListOfTasks(data);
        } catch (e) {
          console.log(e);
        }
      }
    };

    getUserMetadata();

  }, [axiosInstance, setListOfTasks, setSortedTasks, hasTaskUpdated]);


  useEffect(() => {
    sortTasks(listOfTasks, orderOfList);
  }, [listOfTasks, orderOfList, hasTaskUpdated]);

  const changeOrder = (e) => {setOrderOfList(e.target.value)}

  return (
    <>
      <Flex className='sort-order'>
      <Text>Sort by:&nbsp;</Text>
      <Select defaultValue='asc' onChange={changeOrder}>
        <option value='asc'>Earliest due date</option>
        <option value='desc'>Latest due date</option>
        </Select>
        </Flex>
      {sortedTasks?.length &&
        sortedTasks.map((task) => {
          return (
            <div key={task.id}>
              <Card m={3}>
                <CardBody className='task-card'>
                  <h3>{task.taskTitle}</h3>
                  <Text>
                    {task.taskDescription}
                  </Text>
                  <Flex>
                    <Text fontWeight={800}>Due on:&nbsp;</Text>
                    <Text>
                      {dayjs(task.dueDate).format('DD/MM/YYYY HH:mm')}
                    </Text>
                  </Flex>
                  <Checkbox colorScheme="green" defaultChecked={task.complete}>
                    done
                  </Checkbox>
                </CardBody>
              </Card>
            </div>
          );
        })}

      {isAuthenticated && <h2>{user.email}</h2>}
    </>
  );
};

export default UserTasks;
