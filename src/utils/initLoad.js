import { initEventListeners } from '../domElemListeners';
import { domRefs } from '../domRefs';
import { handleProjectForm } from '../handlesForm/handleProjectForm';
import { handleTaskForm } from '../handlesForm/handleTaskForm';

import { stateTask } from '../objectsState';
import { Project } from '../ProjectService';
import { projectsRender } from '../projectsRender';

import { tasksRender } from '../tasksRender';
import { loadDataLocalProject } from './localStoreFuncs/loadDataLocalProject';
import { loadDataLocalTask } from './localStoreFuncs/loadDataLocalTask';
import { selectProjectWithOwnTasks } from './selectProjectWithOwnTasks';
import { sortTask } from './sortTask';

export const initLoad = () => {
	loadDataLocalProject();
	loadDataLocalTask();

	handleProjectForm();
	handleTaskForm();
	projectsRender();

	initEventListeners();

	if (!stateTask.currentProjectId) {
		stateTask.currentProjectId = 'default';

		const defaultProject = Project.storeProjects.find(
			(proj) => proj.id === 'default',
		);

		if (defaultProject) {
			domRefs.workspaceTitleProject.textContent = defaultProject.title;
		}

		const projectDefault = document.querySelector('[data-id="default"]');
		if (!projectDefault) return;

		projectDefault.classList.add('active');

		tasksRender();
	}

	selectProjectWithOwnTasks();

	domRefs.selectTodo.addEventListener('change', sortTask);
};
