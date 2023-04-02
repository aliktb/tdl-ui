import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";


export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      dateFormat='dd/MM/yyyy HH:mm'
      showTimeSelect
      selected={(field.value && new Date(field.value)) || new Date()}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
    />
  );
};
