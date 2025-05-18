export class Project {
	static storeProjects = [
		{
			id: 'default',
			title: 'Default Project',
			dataCreate: new Date(),
			tasks: [],
		},
	];

	static addNewProject(projectName) {
		const newProject = {
			id: crypto.randomUUID(),
			title: projectName,
			dataCreate: new Date(),
			tasks: [],
		};

		Project.storeProjects.push(newProject);
	}

	static renameProject(id, renameProjectName) {
		const currentProject = Project.storeProjects.find(
			(project) => project.id === id,
		);
		if (!currentProject) throw new Error(`Project with id ${id} not found.`);
		currentProject.title = renameProjectName;
	}

	static deleteProject(id) {
		const index = Project.storeProjects.findIndex(
			(project) => project.id === id,
		);

		if (index !== -1) {
			Project.storeProjects.splice(index, 1);
		} else {
			throw new Error(`Project with id ${id} not found.`);
		}
	}
}
