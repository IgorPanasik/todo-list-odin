import { setLocalStorageTask } from './utils/localStoreFuncs/setLocalStorageTask';

export class TaskService {
	static storeTasks = [];

	static addTask(taskData, projectID) {
		const newTask = {
			id: crypto.randomUUID(),
			title: taskData.title,
			describe: taskData.describe,
			notes: taskData.notes,
			deadline: taskData.deadline,
			priority: taskData.priority,
			doneTask: false,
			projectID: projectID,
		};

		TaskService.storeTasks.push(newTask);
		setLocalStorageTask();
	}

	static changeTask(id, newData) {
		const currentTask = TaskService.storeTasks.findIndex(
			(task) => task.id === id,
		);

		if (currentTask === -1) throw new Error(`Task with id ${id} not found.`);
		TaskService.storeTasks[currentTask] = {
			...TaskService.storeTasks[currentTask],
			...newData,
		};
		setLocalStorageTask();
	}

	static deleteTask(id) {
		const index = TaskService.storeTasks.findIndex((task) => task.id === id);

		if (index !== -1) {
			TaskService.storeTasks.splice(index, 1);
			setLocalStorageTask();
		} else {
			throw new Error(`Task with id ${id} not found.`);
		}
	}
}
