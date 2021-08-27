import { createModel } from "@rematch/core";
import { RootModel } from "./models";

type TaskDetail = {
  taskId?: string;
  taskDeleteId?: string;
};

export const taskDetail = createModel<RootModel>()({
  state: { taskId: "", taskDeleteId: "" } as TaskDetail,
  reducers: {
    setTaskDetail(state, payload: TaskDetail) {
      return {
        ...state,
        taskId: payload.taskId,
        taskDeleteId: payload.taskDeleteId,
      };
    },
  },
  effects: (dispatch) => ({
    async setTaskDetailAsync(payload: TaskDetail) {
      dispatch.taskDetail.setTaskDetail(payload);
    },
  }),
});
