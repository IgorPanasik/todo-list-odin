import { domRefs } from './domRefs';
import {
	updateProjectModalHeader,
	updateTaskModalHeader,
} from './modalHelpers';
import { stateTask } from './objectsState';

// Modal PROJECT Open
export const openModalAddNewProject = () => {
	domRefs.modalProject.inert = false;
	domRefs.modalProject.classList.add('open');
	domRefs.inputProjectTitle.focus();

	updateProjectModalHeader();
};
// Modal PROJECT Close
export const closeModalAddNewProject = () => {
	domRefs.modalProject.inert = true;
	domRefs.modalProject.classList.remove('open');
	domRefs.inputProjectTitle.value = '';
};

// Modal TASK Open
export const modalAddTask = () => {
	domRefs.modalTodo.inert = false;
	domRefs.modalTodo.classList.add('open');
	domRefs.inputTodoTitle.focus();

	updateTaskModalHeader();
};

// Modal TASK Close
export const modalCloseAddTask = () => {
	domRefs.modalTodo.inert = true;
	domRefs.modalTodo.classList.remove('open');
	if (stateTask !== 'edit') {
		domRefs.inputTodoTitle.textContent = '';
	}
};
