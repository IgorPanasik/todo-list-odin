import { TaskService } from '../TaskService';
import { setLocalStorageTask } from './localStoreFuncs/setLocalStorageTask';

export const checkDoneTask = (e) => {
	const todosItem = e.target.closest('.todos__item');
	const todosContent = todosItem?.querySelector('.todos__content');

	if (todosContent && todosItem) {
		const taskId = todosItem.dataset.id;
		const task = TaskService.storeTasks.find((task) => task.id === taskId);

		if (e.target.checked) {
			todosContent.classList.add('done');
			if (task) task.doneTask = true;
		} else {
			todosContent.classList.remove('done');
			if (task) task.doneTask = false;
		}
	}

	setLocalStorageTask();
};
