import { compareAsc, parseISO } from 'date-fns';
import { domRefs } from '../domRefs';
import { TaskService } from '../TaskService';
import { tasksRender } from '../tasksRender';

export const sortTask = () => {
	const selectedOption = domRefs.selectTodo.value;

	const priorityMap = {
		high: 1,
		medium: 2,
		low: 3,
	};

	switch (selectedOption) {
		case 'title':
			TaskService.storeTasks.sort((a, b) => a.title.localeCompare(b.title));
			break;
		case 'data':
			TaskService.storeTasks.sort((a, b) => {
				const aHasValidDeadline =
					a.deadline && a.deadline.trim() && a.deadline !== 'Free';
				const bHasValidDeadline =
					b.deadline && b.deadline.trim() && b.deadline !== 'Free';

				if (aHasValidDeadline && bHasValidDeadline) {
					const dateA = parseISO(a.deadline);
					const dateB = parseISO(b.deadline);
					return compareAsc(dateA, dateB);
				}

				if (aHasValidDeadline && !bHasValidDeadline) {
					return -1;
				}
				if (!aHasValidDeadline && bHasValidDeadline) {
					return 1;
				}

				return 0;
			});
			break;
		case 'status':
			TaskService.storeTasks.sort((a, b) => a.doneTask - b.doneTask);
			break;
		case 'priority':
			TaskService.storeTasks.sort(
				(a, b) => priorityMap[a.priority] - priorityMap[b.priority],
			);
	}
	tasksRender();
};
