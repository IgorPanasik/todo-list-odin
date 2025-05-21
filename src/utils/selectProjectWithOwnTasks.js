import { domRefs } from '../domRefs';
import { stateTask } from '../objectsState';
import { Project } from '../ProjectService';
import { tasksRender } from '../tasksRender';

export const selectProjectWithOwnTasks = () => {
	domRefs.projectContainer.addEventListener('click', (e) => {
		const projectItem = e.target.closest('.projects__item');

		if (!projectItem) return;

		const allProjectItems = document.querySelectorAll('.projects__item');

		allProjectItems.forEach((item) => item.classList.remove('active'));

		projectItem.classList.add('active');

		const projectID = projectItem.dataset.id;
		stateTask.currentProjectId = projectID;

		const selectedProject = Project.storeProjects.find(
			(proj) => proj.id === projectID,
		);

		if (selectedProject) {
			domRefs.workspaceTitleProject.textContent = selectedProject.title;
		}

		tasksRender();
	});
};
