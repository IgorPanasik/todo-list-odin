import { domRefs } from './domRefs';
import {
	closeModalAddNewProject,
	modalAddTask,
	modalCloseAddTask,
	openModalAddNewProject,
} from './modalControl';
import { stateProject, stateTask } from './objectsState';

export const initEventListeners = () => {
	// For buttons of Projects
	domRefs.addProjectButton.addEventListener('click', () => {
		stateProject.currentMode = 'add';
		stateProject.editingProjectId = null;
		openModalAddNewProject();
	});

	domRefs.modalCloseButton.addEventListener('click', closeModalAddNewProject);

	// For buttons of Tasks
	domRefs.buttonAddTask.addEventListener('click', () => {
		stateTask.currentMode = 'add';
		stateTask.editingProjectId = null;
		modalAddTask();
	});

	domRefs.buttonTodoClose.addEventListener('click', modalCloseAddTask);

	// SELECT WRAPPER for arrow icon transform
	domRefs.selectWrapper.forEach((select) => {
		select.addEventListener('click', () => {
			select.classList.toggle('open');
		});
	});
};
