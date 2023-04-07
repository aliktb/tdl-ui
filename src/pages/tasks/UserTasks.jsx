import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import dayjs from 'dayjs';
import _ from 'lodash';
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useAxios } from '../../utils/hooks';
import './tasks.css';

const UserTasks = ({ hasTaskUpdated }) => {
  const [listOfTasks, setListOfTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [orderOfList, setOrderOfList] = useState('asc');
  const [taskToDelete, setTaskToDelete] = useState(null);
  const axiosInstance = useAxios();
  const { user, isAuthenticated } = useAuth0();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const sortTasks = (tasksToSort, order) => {
    const sortedByDate = _.orderBy(tasksToSort, ['dueDate'], [order]);
    setSortedTasks(sortedByDate);
  };

  const getUserMetadata = async () => {
    if (axiosInstance) {
      try {
        const getTasksUrl = `/tasks/user`;

        const { data } = await axiosInstance.get(getTasksUrl);

        setListOfTasks(data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getUserMetadata();
  }, [axiosInstance, setListOfTasks, setSortedTasks, hasTaskUpdated]);

  useEffect(() => {
    sortTasks(listOfTasks, orderOfList);
  }, [listOfTasks, orderOfList, hasTaskUpdated]);

  const changeOrder = (e) => {
    setOrderOfList(e.target.value);
  };

  const openDeleteTaskModal = (task) => {
    setTaskToDelete(task);

    onOpen();
  };

  const deleteTask = async () => {
    await axiosInstance.delete(`/tasks/delete/${taskToDelete.id}`);
    onClose();
    getUserMetadata();
  };

  return (
    <>
      <Flex className="sort-order">
        <Text>Sort by:&nbsp;</Text>
        <Select defaultValue="asc" onChange={changeOrder}>
          <option value="asc">Earliest due date</option>
          <option value="desc">Latest due date</option>
        </Select>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete {taskToDelete.taskTitle}?
            </ModalBody>
            <ModalFooter>
              <Button onClick={deleteTask}>Yes</Button>
              <Button variant="ghost" onClick={onClose}>
                No
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      {sortedTasks?.length &&
        sortedTasks.map((task) => {
          // return (
          //   <div key={task.id}>
          //     <Card m={3}>
          //       <CardBody className="task-card">
          //         <h3>{task.taskTitle}</h3>
          //         <Text>{task.taskDescription}</Text>
          //         <Flex>
          //           <Text fontWeight={800}>Due on:&nbsp;</Text>
          //           <Text>
          //             {dayjs(task.dueDate).format('DD/MM/YYYY HH:mm')}
          //           </Text>
          //         </Flex>
          //         <Checkbox colorScheme="green" defaultChecked={task.complete}>
          //           done
          //         </Checkbox>
          //         <Button
          //           variant="outline"
          //           colorScheme="red"
          //           onClick={() => {
          //             openDeleteTaskModal(task);
          //           }}
          //         >
          //           Delete
          //         </Button>
          //       </CardBody>
          //     </Card>
          //   </div>
          // );
        })}

      {isAuthenticated && <h2>{user.email}</h2>}
    </>
  );
};

export default UserTasks;
