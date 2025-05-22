import { domRefs } from '../domRefs';
import { stateTask } from '../objectsState';
import { TaskService } from '../TaskService';

export const displayEmptyComponent = () => {
	const currentProjectID = stateTask.currentProjectId || 'default';

	const tasksForProject = TaskService.storeTasks.filter(
		(task) => task.projectID === currentProjectID,
	);

	if (tasksForProject < 1) {
		domRefs.emptyState.classList.remove('hide');
	} else {
		domRefs.emptyState.classList.add('hide');
	}
};
