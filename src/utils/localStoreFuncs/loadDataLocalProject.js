import { Project } from '../../ProjectService';

export const loadDataLocalProject = () => {
	const projectsData = localStorage.getItem('projects');

	if (!projectsData || projectsData === '[]') {
		localStorage.removeItem('projects');
	}

	if (projectsData) {
		Project.storeProjects = JSON.parse(projectsData);
	}
};
