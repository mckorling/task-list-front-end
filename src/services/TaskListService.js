import axios from 'axios';

export function TaskListService(id) {
  return axios.patch(`/tasks/${id}/mark_incomplete`);
}
