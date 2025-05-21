import { domRefs } from './domRefs';
import { stateProject, stateTask } from './objectsState';
import { Project } from './ProjectService';
import { TaskService } from './TaskService';

// Update Project Modal Header
export const updateProjectModalHeader = () => {
	const title = domRefs.modalProject.querySelector('#modal-project-title');
	const btnSave = domRefs.modalProject.querySelector('.modal__submit');

	if (stateProject.currentMode === 'edit') {
		title.textContent = 'Rename Project';
		btnSave.textContent = 'Save Name';

		const projectToEdit = Project.storeProjects.find(
			(project) => project.id === stateProject.editingProjectId,
		);

		domRefs.inputProjectTitle.value = projectToEdit.title;
	} else {
		title.textContent = 'Add Your Project';
		btnSave.textContent = 'Add Project';
		domRefs.formProject.reset();
	}
};

// Update Task Modal Header
export const updateTaskModalHeader = () => {
	const title = domRefs.modalTodo.querySelector('#modal-todo-title');

	if (stateTask.currentMode === 'edit') {
		title.textContent = 'Edit Task';

		const taskToEdit = TaskService.storeTasks.find(
			(task) => task.id === stateTask.editingProjectId,
		);

		if (taskToEdit) {
			domRefs.inputTodoTitle.value = taskToEdit.title;
			domRefs.inputTodoDescription.value = taskToEdit.describe;
			domRefs.inputTodoDueDate.value = taskToEdit.deadline;
			domRefs.inputSelectPriority.value = taskToEdit.priority;
			domRefs.inputTodoNote.value = taskToEdit.notes;
		}
	} else {
		title.textContent = 'Add Task';
		domRefs.formTodo.reset();
	}
};
