import { Heading } from '@chakra-ui/react'
import { useState } from 'react';
import AddNewTask from '../pages/tasks/AddNewTask';
import UserTasks from "../pages/tasks/UserTasks";

const MyTasks = () => {

  const [newTask, setNewTask] = useState({});

  const hasTaskUpdated = (value) => {
    setNewTask(value);
  }

  return (
    <>
    <Heading>This is my tasks</Heading>
      <AddNewTask newTaskAdded={hasTaskUpdated}/>
      <UserTasks hasTaskUpdated={newTask} />
    </>
  );
}

export default MyTasks;
