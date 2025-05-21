import { TaskService } from '../../TaskService';

export const loadDataLocalTask = () => {
	const tasksData = localStorage.getItem('tasks');

	if (!tasksData || tasksData === '[]') {
		localStorage.removeItem('tasks');
	}

	if (tasksData) {
		TaskService.storeTasks = JSON.parse(tasksData);
	}
};
