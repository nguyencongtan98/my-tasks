import { Models } from '@rematch/core'
import { count } from './count'
import { task } from './task'
import { taskDetail } from './task-detail'

export interface RootModel extends Models<RootModel> {
    count: typeof count;
    task: typeof task;
    taskDetail: typeof taskDetail;
}

export const models: RootModel = { count, task, taskDetail }