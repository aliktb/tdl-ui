import React from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

import { useAxios } from '../../utils/hooks';
import { DatePickerField } from './DatePicker';

const AddNewTask = ({newTaskAdded}) => {
  const axiosInstance = useAxios();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addTask = async (newTask) => {
    await axiosInstance.post(`/tasks/new`, newTask);
    newTaskAdded(newTask);
  };

  const submitFromModal = (values) => {
      onClose();
      let newTask = values;
      newTask.complete = false;
      addTask(newTask);
  };

  const isLight = useColorMode().colorMode === 'light';



  const validateTitle = (value) => {
    let error;
    if (!value) {
      error = 'Title is required';
    }
    return error;
  };

  return (
    <div className={isLight ? 'light-theme' : 'dark-theme'}>
      Add new task
      <Button onClick={onOpen}>New task</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new task</ModalHeader>
          <ModalCloseButton />

          <Formik
            initialValues={{ taskTitle: null, taskDescription: null, dueDate: null }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                submitFromModal(values);
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => (
              <>
                <Form>
                  <ModalBody>
                    <Field name="taskTitle" validate={validateTitle}>
                      {({ field, form }) => (
                        <FormControl
                          isRequired
                          isInvalid={
                            form.errors.taskTitle && form.touched.taskTitle
                          }
                        >
                          <FormLabel>Title</FormLabel>
                          <Input {...field} placeholder="Task title here" />
                          <FormErrorMessage>
                            {form.errors.taskTitle}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="taskDescription">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel>Description</FormLabel>
                          <Textarea
                            {...field}
                            placeholder="This is the task description"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="dueDate">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel>Due on</FormLabel>
                          <DatePickerField name='dueDate' {...field} />
                          <FormHelperText>
                            Give a due date for your task
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>
                   
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      isLoading={props.isSubmitting}
                    >
                      Add Task
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Form>
              </>
            )}
          </Formik>

        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddNewTask;
