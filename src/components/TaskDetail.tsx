import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Box, Flex } from "rebass";
import styled from "styled-components";
import * as yup from "yup";
import { RootState } from "../state/store";
import firebase from "../firebase/firebase";
import { TaskInfo } from "../types/task";
import nextId from "react-id-generator";

const schema = yup.object().shape({
  name: yup.string().required("Vui long nhap truong nay"),
  description: yup.string().required("Vui long nhap truong nay"),
  status: yup.number().required("Vui long nhap truong nay"),
  // createDate: yup.string().required("Vui long nhap truong nay"),
  closingDate: yup.string().required("Vui long nhap truong nay"),
  dueDate: yup.string().required("Vui long nhap truong nay"),
});

export const TaskDetail = (): JSX.Element => {
  const onSubmit = (data: TaskInfo) => {
    const id = nextId();
    const { status, name, description, createDate, dueDate, closingDate } =
      data;

    firebase.firestore().collection("tasks").add({
      id,
      status,
      name,
      description,
      createDate,
      dueDate,
      closingDate,
    });
  };
  const taskList = useSelector((state: RootState) => state.task);
  const taskId = useSelector(
    (state: RootState) => state.taskDetail.taskId
  ) as string;
  const [task, setTask] = useState<TaskInfo>(taskList[0]);

  useEffect(() => {
    if (taskList && taskId) {
      const tmp = taskList.find((item) => item.id === taskId) || taskList[0];
      setTask(tmp);
    }
  }, [taskId, taskList]);

  const dateToString = (date: Date): string => {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  };

  console.log(dateToString(new Date()));
  console.log("2021-7-27");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInfo>({
    resolver: yupResolver(schema),
  });

  const style = {
    display: "flex",
    flexDirection: "column",
  };

  const NameProps = {
    ...register("name"),
    type: "text",
    value: "fdfdfdf",
  };
  const DesciptionProps = {
    ...register("description"),
    type: "text",
    // value: task.description,
    defaultValue: task.description,
  };
  const StatusProps = {
    ...register("status"),
    type: "number",
  };
  const CreateDateProps = {
    ...register("createDate"),
    type: "date",
    defaultValue: dateToString(new Date()),
  };
  const ClosingDateProps = {
    ...register("closingDate"),
    type: "date",
  };
  const DueDateProps = {
    ...register("dueDate"),
    type: "date",
  };

  const ErrorStyled = styled.div`
    color: red;
    margin: 0;
  `;

  const [startDate, setStartDate] = useState(new Date());

  const hanedleChange = () => {};

  return (
    <Box>
      <Typography variant="h5">{task?.name}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box aria-label="Task header" sx={style}>
          <Box sx={style}>
            <label>Name</label>
            <input {...NameProps} />
            <ErrorStyled>{errors.name?.message}</ErrorStyled>
          </Box>
          <Box sx={style}>
            <label>Desciption</label>
            <textarea rows={5} {...DesciptionProps} />
            <ErrorStyled>{errors.description?.message}</ErrorStyled>
          </Box>
          <Box sx={style}>
            <label>Status</label>
            <input {...StatusProps} />
            <ErrorStyled>{errors.status?.message}</ErrorStyled>
          </Box>
          <Box sx={style}>
            <label htmlFor="">Create Date</label>
            <DatePicker selected={startDate} onChange={hanedleChange} />
            <input
              {...CreateDateProps}
              // value={createDate as string}
              value={task?.createDate}
              // disabled={!!1}
            />
            <ErrorStyled>{errors.createDate?.message}</ErrorStyled>
          </Box>
          <Box sx={style}>
            <label htmlFor="">Closing Date</label>
            <input {...ClosingDateProps} />
            <ErrorStyled>{errors.closingDate?.message}</ErrorStyled>
          </Box>
          <Box sx={style}>
            <label htmlFor="">Due Date</label>
            <input {...DueDateProps} />
            <ErrorStyled>{errors.dueDate?.message}</ErrorStyled>
          </Box>
          <Flex>
            {taskId ? (
              <Box>
                <button type="submit">Inprogress</button>
                <button type="submit">Done</button>
                <button type="submit">Cancel</button>
                <button type="submit">Cancel</button>
              </Box>
            ) : (
              <Box>
                <button type="submit">Add new task</button>
              </Box>
            )}
          </Flex>
        </Box>
      </form>
    </Box>
  );
};
