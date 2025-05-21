import { format, parseISO } from 'date-fns';
import { domRefs } from './domRefs';
import { modalAddTask } from './modalControl';
import { stateTask } from './objectsState';
import { TaskService } from './TaskService';
import { checkDoneTask } from './utils/checkDoneTask';
import { currentLocale } from './utils/currentLocale';
import { displayEmptyComponent } from './utils/displayEmptyComponent';
import { setLocalStorageTask } from './utils/localStoreFuncs/setLocalStorageTask';

export const tasksRender = () => {
	// Get the container element where tasks (todos) will be rendered
	const todosContainer = domRefs.todosContainer;

	// Clear the container's previous content
	todosContainer.textContent = '';
	// Create a new unordered list element for tasks and assign a class for styling
	const todosList = document.createElement('ul');
	todosList.classList.add('todos__list');

	// Use the selected project ID from stateTask (or default to 'default' if none is set)
	// and filter tasks to only include those that belong to the current project.
	const currentProjectID = stateTask.currentProjectId || 'default';
	const tasksToRender = TaskService.storeTasks.filter(
		(task) => task.projectID === currentProjectID,
	);
	// Iterate over each task that should be rendered
	tasksToRender.forEach((task) => {
		// Create a list item for the task and set its data-id attribute to the task's id
		const todosItem = document.createElement('li');
		todosItem.classList.add('todos__item');
		todosItem.dataset.id = task.id;

		// Create a container for the task content and mark it as done if applicable
		const todosContent = document.createElement('div');
		todosContent.classList.add('todos__content');

		if (task.doneTask) {
			todosContent.classList.add('done');
		}

		// Create and set up the task title element
		const pTitle = document.createElement('p');
		pTitle.classList.add('todos__title');
		pTitle.textContent = task.title;

		// Create and set up the task description element, prepending a label span
		const pDescribe = document.createElement('p');
		pDescribe.classList.add('todos__describe');
		const spanDescribe = document.createElement('span');
		spanDescribe.textContent = 'Describe:';
		pDescribe.appendChild(spanDescribe);
		pDescribe.append(task.describe || 'No');

		// Create and set up the task notes element, prepending a label span
		const pNotes = document.createElement('p');
		pNotes.classList.add('todos__notes');
		const spanNotes = document.createElement('span');
		spanNotes.textContent = 'Notes:';
		pNotes.appendChild(spanNotes);
		pNotes.append(task.notes || 'No');

		// Create a container for action buttons (e.g., edit and delete)
		const buttonsAction = document.createElement('div');
		buttonsAction.classList.add('todos__actions');

		// Create an edit button that switches state to 'edit' and opens the task modal
		const btnChange = document.createElement('button');
		btnChange.textContent = 'Change Task';
		btnChange.type = 'button';
		btnChange.classList.add('todos__edit');

		btnChange.addEventListener('click', () => {
			stateTask.currentMode = 'edit';
			stateTask.editingProjectId = task.id;
			modalAddTask();
		});

		// Create a delete button that removes the task and re-renders the task list
		const btnDelete = document.createElement('button');
		btnDelete.classList.add('todos__delete');
		btnDelete.type = 'button';
		btnDelete.textContent = 'Delete';

		btnDelete.addEventListener('click', () => {
			TaskService.deleteTask(task.id);
			tasksRender();
			setLocalStorageTask();
		});
		buttonsAction.append(btnChange, btnDelete);

		// Create a container for meta information (like priority, deadline, and checkbox)
		const todosMeta = document.createElement('div');
		todosMeta.classList.add('todos__meta');

		const spanPriority = document.createElement('span');
		spanPriority.classList.add('priority-marker', task.priority);

		const spanPriorityDescribe = document.createElement('span');
		spanPriorityDescribe.classList.add('todos__priority');
		spanPriorityDescribe.textContent = task.priority;

		const spanDivider = document.createElement('span');
		spanDivider.textContent = '|';

		// Process the deadline: if provided, parse and format the date using date-fns; default to 'Free'
		let deadlineForRender = 'Free';
		if (task.deadline && task.deadline.trim() && task.deadline !== 'Free') {
			const parseDate = parseISO(task.deadline);
			deadlineForRender = format(parseDate, 'P', { locale: currentLocale });
		}

		// Create a time element to display the deadline
		const dataTime = document.createElement('time');
		dataTime.classList.add('todos__date');
		dataTime.dataset.deadline = deadlineForRender;
		dataTime.textContent = deadlineForRender;

		const spanDivider2 = document.createElement('span');
		spanDivider2.textContent = '|';

		// Create a checkbox input for marking the task as done or not done
		const inputCheckbox = document.createElement('input');
		inputCheckbox.type = 'checkbox';
		inputCheckbox.name = 'status_done';
		inputCheckbox.id = `status_done-${task.id}`;

		inputCheckbox.checked = task.doneTask === true;
		inputCheckbox.addEventListener('change', checkDoneTask);

		// Create a label for the checkbox that includes a custom styled span for the appearance
		const labelForCheck = document.createElement('label');
		labelForCheck.classList.add('todos__checkbox-label');
		labelForCheck.htmlFor = inputCheckbox.id;
		labelForCheck.textContent = 'Done';

		const spanCustomCheckbox = document.createElement('span');
		spanCustomCheckbox.classList.add('custom-checkbox');

		labelForCheck.append(inputCheckbox, spanCustomCheckbox);

		todosMeta.append(
			spanPriority,
			spanPriorityDescribe,
			spanDivider,
			dataTime,
			spanDivider2,
			labelForCheck,
		);
		todosContent.append(pTitle, pDescribe, pNotes, buttonsAction, todosMeta);

		todosItem.appendChild(todosContent);
		todosList.appendChild(todosItem);
	});

	domRefs.todosContainer.appendChild(todosList);

	// If no tasks are present for the current project, display an empty state message/component
	displayEmptyComponent();
	setLocalStorageTask();
};
