import { format } from 'date-fns';
import imgDelSvg from './assets/images/del.svg';
import imgEditSvg from './assets/images/edit.svg';
import { domRefs } from './domRefs';
import { openModalAddNewProject } from './modalControl';
import { Project } from './ProjectService';

import { stateProject } from './objectsState';
import { currentLocale } from './utils/currentLocale';

export const projectsRender = () => {
	// Locate the container element where the projects will be rendered.
	const projectsDom = domRefs.projectContainer;

	// Clear any existing content in the container to prepare for re-rendering.
	projectsDom.textContent = '';

	// Create an unordered list element to hold all project items,
	// and add a CSS class for styling.
	const projectsList = document.createElement('ul');
	projectsList.classList.add('projects__list');

	// Iterate over each project stored in Project.storeProjects.
	Project.storeProjects.forEach((project) => {
		// Create a list item element for the current project.
		const projectItem = document.createElement('li');
		projectItem.classList.add('projects__item');
		projectItem.setAttribute('data-id', project.id);

		// Create a button element that displays the project's title.
		const projectBtn = document.createElement('button');
		projectBtn.type = 'button';
		projectBtn.classList.add('projects__btn');
		projectBtn.textContent = project.title;

		// Create a container for project action elements (e.g., edit and delete buttons).
		const projectActions = document.createElement('div');
		projectActions.classList.add('projects__action');

		// Create a container for the action buttons.
		const buttonControls = document.createElement('div');
		buttonControls.classList.add('buttons__control');

		// Create the Edit Project button.
		const buttonEdit = document.createElement('button');
		buttonEdit.setAttribute('aria-label', 'Edit Name Project');
		buttonEdit.classList.add('projects__rename');
		buttonEdit.type = 'button';

		// Attach a click event listener to trigger editing mode and open the modal.
		buttonEdit.addEventListener('click', () => {
			stateProject.currentMode = 'edit';
			stateProject.editingProjectId = project.id;
			openModalAddNewProject();
		});

		const imgEdit = document.createElement('img');
		imgEdit.src = imgEditSvg;
		imgEdit.alt = 'Edit Name Project';

		buttonEdit.appendChild(imgEdit);

		// Create the Delete Project button.// Create Button for Delete Project
		const buttonDel = document.createElement('button');
		buttonDel.setAttribute('aria-label', 'Delete Project');
		buttonDel.classList.add('projects__delete');
		buttonDel.type = 'button';

		// Attach a click event listener that deletes the project and re-renders the project list.
		buttonDel.addEventListener('click', () => {
			Project.deleteProject(project.id);
			projectsRender();
		});

		const imgDel = document.createElement('img');
		imgDel.src = imgDelSvg;
		imgDel.alt = 'Delete Project';

		buttonDel.appendChild(imgDel);

		// Add buttons to block control buttons
		buttonControls.append(buttonEdit, buttonDel);

		// Show data create for project
		const spanData = document.createElement('span');

		spanData.textContent = format(project.dataCreate, 'P', {
			locale: currentLocale,
		});

		// Add buttons and data to action's block
		projectActions.append(buttonControls, spanData);

		projectItem.append(projectBtn, projectActions);
		projectsList.appendChild(projectItem);
	});

	projectsDom.appendChild(projectsList);
};
