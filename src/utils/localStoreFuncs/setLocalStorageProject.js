import { Project } from '../../ProjectService';

export const setLocalStorageProject = () => {
	localStorage.setItem('projects', JSON.stringify(Project.storeProjects));
};
