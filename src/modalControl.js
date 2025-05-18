import { domRefs } from './domRefs';
import { state } from './stateProject';

export const openModalAddNewProject = () => {
	domRefs.modalProject.classList.add('open');
	domRefs.inputProjectTitle.focus();

	const title = domRefs.modalProject.querySelector('#modal-project-title');
	const btnSave = domRefs.modalProject.querySelector('.modal__submit');

	if (state.currentMode === 'edit') {
		title.textContent = 'Rename Project';
		btnSave.textContent = 'Save Name';
	} else {
		title.textContent = 'Add Your Project';
		btnSave.textContent = 'Add Project';
	}
};

export const closeModalAddNewProject = () => {
	domRefs.modalProject.classList.remove('open');
	domRefs.inputProjectTitle.value = '';
};

domRefs.addProjectButton.addEventListener('click', () => {
	state.currentMode = 'add';
	state.editingProjectId = null;
	openModalAddNewProject();
});
domRefs.modalCloseButton.addEventListener('click', closeModalAddNewProject);
