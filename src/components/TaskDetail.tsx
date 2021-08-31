import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControl, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import nextId from "react-id-generator";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as yup from "yup";
import firebase from "../firebase/firebase";
import { RootState } from "../state/store";
import { TaskInfo, Status } from "../types/task";

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

  const [statusList, setStatusList] = useState<Status[]>([]);

  useEffect(() => {
    let tmp: Status[] = [];
    firebase
      .firestore()
      .collection("status")
      .get()
      .then((item) => {
        item.docs.forEach((st) => {
          tmp.push(st.data() as unknown as Status);
        });
      });
    setStatusList(tmp);
  }, []);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInfo>({
    resolver: yupResolver(schema),
  });

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const style = {
    display: "flex",
    flexDirection: "column",
  };

  const NameProps = {
    ...register("name"),
    type: "text",
    defaultValue: task.name,
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
    value: task.createDate,
  };
  const ClosingDateProps = {
    ...register("closingDate"),
    type: "date",
    defaultValue: task.closingDate,
  };
  const DueDateProps = {
    ...register("dueDate"),
    type: "date",
    defaultValue: task.dueDate,
  };

  const ErrorStyled = styled.div`
    color: red;
    margin: 0;
  `;

  const FormGroupStyled = styled(FormControl)`
    width: 100%;
  `;

  const ButtonGroupStyled = styled.div`
    display: flex;
    justify-content: space-between;
    button {
      width: 23%;
    }
  `;

  const FormContainerStyled = styled.div`
    height: 100vh;
    padding: 10px;
    box-shadow: 5px 10px 8px 10px #888888;
  `;

  return (
    <FormContainerStyled>
      <form action="">
        <FormGroupStyled>
          <TextField
            margin="dense"
            // error
            // helperText="required"
            id="taskName"
            label="Task Name"
            variant="filled"
            multiline
            value={task.name}
          />
          <TextField
            margin="dense"
            id="taskDesciption"
            label="Task Desciption"
            multiline
            rows={7}
            variant="filled"
            value={task.description}
          />
          <TextField
            margin="dense"
            id="taskStatus"
            label="Task Status"
            variant="filled"
            select
            value={task.status}
            SelectProps={{ native: true }}
          >
            {statusList.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="createDate"
            label="Create date"
            type="date"
            variant="filled"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="closedDate"
            label="Closed date"
            type="date"
            variant="filled"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="dueDate"
            label="Due date"
            type="date"
            variant="filled"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormGroupStyled>
        {taskId ? (
          <ButtonGroupStyled>
            <Button variant="contained" color="default">
              Open
            </Button>
            <Button variant="contained" color="inherit">
              Doing
            </Button>
            <Button variant="contained" color="secondary">
              Done
            </Button>
            <Button variant="contained" color="primary">
              Cancel
            </Button>
          </ButtonGroupStyled>
        ) : (
          <Button variant="contained" fullWidth color="secondary">
            Submit
          </Button>
        )}
      </form>
    </FormContainerStyled>
  );
};
