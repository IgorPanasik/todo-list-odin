import { format } from 'date-fns';
import imgDelSvg from './assets/images/del.svg';
import imgEditSvg from './assets/images/edit.svg';
import { openModalAddNewProject } from './modalControl';
import { Project } from './projectService';
import { state } from './stateProject';

export const projectsRender = () => {
	// Find container for projects
	const projectsDom = document.querySelector('.projects');
	projectsDom.textContent = '';

	const projectsList = document.createElement('ul');
	projectsList.classList.add('projects__list');

	Project.storeProjects.forEach((project) => {
		// Create list's element
		const projectItem = document.createElement('li');
		projectItem.classList.add('projects__item');
		projectItem.setAttribute('data-id', project.id);

		// Create button with name project
		const projectBtn = document.createElement('button');
		projectBtn.type = 'button';
		projectBtn.classList.add('projects__btn');
		projectBtn.textContent = project.title;

		// Create action's block
		const projectActions = document.createElement('div');
		projectActions.classList.add('projects__action');

		// Create container for action's buttons
		const buttonControls = document.createElement('div');
		buttonControls.classList.add('buttons__control');

		// Create Button for Edit Project Name
		const buttonEdit = document.createElement('button');
		buttonEdit.setAttribute('aria-label', 'Edit Name Project');
		buttonEdit.classList.add('projects__rename');
		buttonEdit.type = 'button';

		buttonEdit.addEventListener('click', () => {
			state.currentMode = 'edit';
			state.editingProjectId = project.id;
			openModalAddNewProject();
		});

		const imgEdit = document.createElement('img');
		imgEdit.src = imgEditSvg;
		imgEdit.alt = 'Edit Name Project';

		buttonEdit.appendChild(imgEdit);

		// Create Button for Delete Project
		const buttonDel = document.createElement('button');
		buttonDel.setAttribute('aria-label', 'Delete Project');
		buttonDel.classList.add('projects__delete');
		buttonDel.type = 'button';

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
		spanData.textContent = format(project.dataCreate, 'MM/dd/yyyy');

		// Add buttons and data to action's block
		projectActions.append(buttonControls, spanData);

		projectItem.append(projectBtn, projectActions);
		projectsList.appendChild(projectItem);
	});

	projectsDom.appendChild(projectsList);
};
