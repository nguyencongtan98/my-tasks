import React from "react";
import { Box, Flex } from "rebass";
import { Button } from "antd";
import { TaskInfo } from "../types/task";
import "./general.css";

type TaskProps = {
  taskInfo: TaskInfo;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onDelete: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Task = (props: TaskProps): JSX.Element => {
  const {
    taskInfo: { id, name, status },
    onClick,
    onDelete,
  } = props;

  let statusText = "";
  let bgColor = "d";

  switch (status) {
    case 1:
      statusText = "Open";
      bgColor = "#6d24e3";
      break;
    case 2:
      statusText = "Doing";
      bgColor = "#dbbd5a";
      break;
    case 3:
      statusText = "Done";
      bgColor = "#9fe09d";
      break;
    case 4:
      statusText = "Cancel";
      bgColor = "darkGray";
      break;
    case 5:
      statusText = "Re Open";
      bgColor = "6d24e3";
      break;

    default:
      break;
  }

  return (
    <Flex
      id={id}
      onClick={onClick}
      sx={{
        textAlign: "left",
        background: bgColor,
        fontWeight: "bold",
        ml: "5px",
        mb: "5px",
        mr: "20px",
        pl: "5px",
        height: "50px",
        lineHeight: "50px",
        borderRadius: "5px",
        ":hover": { background: "grey", cursor: "pointer" },
      }}
    >
      {/* <Link to={`/task-detail/${id}`} id={id} onClick={onClick}>{name}</Link> */}
      <Box width="80%">{name}</Box>
      <Box width="20%" pr="10px" textAlign="right">
        <Button size="small" id={id} onClick={onDelete}>
          Delete
        </Button>
        <p hidden>{statusText}</p>
      </Box>
    </Flex>
  );
};
