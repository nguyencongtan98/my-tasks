import { createModel } from "@rematch/core";
import { RootModel } from "./models";
import { TaskInfo } from "../types/task";

export const task = createModel<RootModel>()({
  state: [{ id: "", name: "", description: "" }] as TaskInfo[], // <-
  reducers: {
    fetchTaskList(state, payload: TaskInfo[]) {
      return payload;
    },
  },
  effects: (dispatch) => ({
    async setTaskAsync(payload: TaskInfo[]) {
      dispatch.task.fetchTaskList(payload);
    },
  }),
});
