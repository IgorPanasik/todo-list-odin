import { domRefs } from '../domRefs';
import { modalCloseAddTask } from '../modalControl';
import { stateTask } from '../objectsState';

import { TaskService } from '../TaskService';
import { tasksRender } from '../tasksRender';

export const handleTaskForm = () => {
	domRefs.formTodo.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData(domRefs.formTodo);

		const taskTitle = formData.get('todo_title')?.trim();
		const taskDescribe = formData.get('description')?.trim();
		const taskDueDate = formData.get('due_date');
		const taskPriority = formData.get('select_priority');
		const taskNotes = formData.get('notes')?.trim();

		if (!taskTitle) {
			alert('Title is required');
			return;
		}

		const taskData = {
			title: taskTitle,
			describe: taskDescribe,
			notes: taskNotes,
			deadline: taskDueDate,
			priority: taskPriority,
		};

		if (stateTask.currentMode === 'edit') {
			TaskService.changeTask(stateTask.editingProjectId, taskData);
			tasksRender();
			modalCloseAddTask();
		} else {
			const currentProjectID = stateTask.currentProjectId || 'default';
			TaskService.addTask(taskData, currentProjectID);
			tasksRender();
			modalCloseAddTask();
			e.target.reset();
		}
	});
};
