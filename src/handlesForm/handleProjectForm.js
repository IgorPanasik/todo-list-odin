import { domRefs } from '../domRefs';
import { closeModalAddNewProject } from '../modalControl';
import { stateProject } from '../objectsState';
import { Project } from '../ProjectService';

import { projectsRender } from '../projectsRender';

export const handleProjectForm = () => {
	domRefs.formProject.addEventListener('submit', (e) => {
		e.preventDefault();
		let projectTitle = e.target.elements.project_title.value.trim();

		if (!projectTitle) {
			alert('You need to give a name to your project');
			return;
		}

		if (stateProject.currentMode === 'edit') {
			Project.renameProject(stateProject.editingProjectId, projectTitle);
			projectsRender();

			closeModalAddNewProject();
		} else {
			Project.addNewProject(projectTitle);
			projectsRender();

			closeModalAddNewProject();
			e.target.reset();
		}
	});
};
