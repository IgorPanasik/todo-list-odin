import { domRefs } from '../domRefs';
import { TaskService } from '../TaskService';

export const displayEmptyComponent = () => {
	if (TaskService.storeTasks.length < 1) {
		domRefs.emptyState.classList.remove('hide');
	} else {
		domRefs.emptyState.classList.add('hide');
	}
};
