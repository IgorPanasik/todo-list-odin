import { domRefs } from './domRefs';
import { closeModalAddNewProject } from './modalControl';
import { Project } from './projectService';
import { projectsRender } from './projectsRender';
import { state } from './stateProject';

export const handleProjectForm = () => {
	domRefs.formProject.addEventListener('submit', (e) => {
		e.preventDefault();
		let projectTitle = e.target.elements.project_title.value.trim();

		if (!projectTitle) {
			alert('You need to give a name to your project');
			return;
		}

		if (state.currentMode === 'edit') {
			Project.renameProject(state.editingProjectId, projectTitle);
			projectsRender();

			closeModalAddNewProject();
			e.target.reset();
		} else {
			Project.addNewProject(projectTitle);
			projectsRender();

			closeModalAddNewProject();
			e.target.reset();
		}
	});
};
