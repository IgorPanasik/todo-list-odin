import { projectsRender } from './projectsRender';
import { TaskService } from './TaskService';
import { tasksRender } from './tasksRender';
import { setLocalStorageProject } from './utils/localStoreFuncs/setLocalStorageProject';

export class Project {
	static storeProjects = [
		{
			id: 'default',
			title: 'Default Project',
			dataCreate: new Date(),
		},
	];

	static addNewProject(projectName) {
		const newProject = {
			id: crypto.randomUUID(),
			title: projectName,
			dataCreate: new Date(),
		};
		Project.storeProjects.push(newProject);
		setLocalStorageProject();
	}

	static renameProject(id, renameProjectName) {
		const currentProject = Project.storeProjects.find(
			(project) => project.id === id,
		);
		if (!currentProject) throw new Error(`Project with id ${id} not found.`);
		currentProject.title = renameProjectName;
		setLocalStorageProject();
	}

	static deleteProject(id) {
		const index = Project.storeProjects.findIndex(
			(project) => project.id === id,
		);

		if (index !== -1) {
			Project.storeProjects.splice(index, 1);
			setLocalStorageProject();

			TaskService.storeTasks = TaskService.storeTasks.filter(
				(task) => task.projectID !== id,
			);

			projectsRender();
			tasksRender();
		} else {
			throw new Error(`Project with id ${id} not found.`);
		}
	}
}
