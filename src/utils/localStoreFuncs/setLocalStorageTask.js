import { TaskService } from '../../TaskService';

export const setLocalStorageTask = () => {
	localStorage.setItem('tasks', JSON.stringify(TaskService.storeTasks));
};
