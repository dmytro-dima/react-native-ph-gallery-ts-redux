import * as ActionTypes from "./ActionTypes";
import { Task } from "./types/expense";
import { TaskActionTypes } from "./types/actions";

interface StateInterface {
  errMess: string | null;
  tasks: Task[];
  deleted: Task[];
  history: Task[];
}

const initialState: StateInterface = {
  errMess: null,
  tasks: [],
  deleted: [],
  history: [],
};

export const TaskReducer = (
  state = initialState,
  action: TaskActionTypes
): StateInterface => {
  switch (action.type) {
    case ActionTypes.SET_TASKS:
      return { ...state, errMess: null, tasks: action.payload };
    case ActionTypes.SET_TASKS_HISTORY:
      return { ...state, errMess: null, history: action.payload };
    case ActionTypes.TASKS_FAILED:
      return { ...state, errMess: action.payload };
    case ActionTypes.ADD_TASK:
      return {
        ...state,
        tasks: state.tasks.concat(action.payload),
        history: state.tasks.concat(action.payload),
      };
    case ActionTypes.REMOVE_TASK:
      return {
        ...state,
        deleted: state.deleted.filter((task) => task.id !== action.payload),
      };
    case ActionTypes.ADD_TASK_DELETED:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
        deleted: state.deleted.concat(action.payload),
      };
    case ActionTypes.COMPLETED_TASK:
      return {
        ...state,
        tasks: state.tasks.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
        history: state.history.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    default:
      return state;
  }
};
