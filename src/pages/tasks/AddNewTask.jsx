import { Button, useColorMode } from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

import { useAxios } from "../../utils/hooks";

const AddNewTask = () => {

  const axiosInstance = useAxios();
  const [dueDate, setDueDate] = useState(new Date());


  const addTask = (newTask) => {

    console.log('new task = ', newTask)
    axiosInstance.post(`/tasks/new`, newTask)
  }

  const dummyTask = {
    dueDate: dayjs(dueDate).format(),
    complete: true
  }

  const isLight = useColorMode().colorMode==='light';


  return (
    <div className={isLight?"light-theme":"dark-theme"}>
      <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} showTimeSelect />

      <Button onClick={() => { addTask(dummyTask) }}>
        Click to add task here
      </Button>
    </div>);
}

export default AddNewTask;
