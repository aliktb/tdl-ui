import { Heading } from '@chakra-ui/react'
import AddNewTask from '../pages/tasks/AddNewTask';
import UserTasks from "../pages/tasks/UserTasks";

const MyTasks = () => {
  return (
    <>
    <Heading>This is my tasks</Heading>
      <UserTasks />
      <AddNewTask/>
    </>
  );
}

export default MyTasks;
