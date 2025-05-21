// Global states for the form: 'currentMode' and 'editingProjectId' are used to determine whether the form operates in "add new project/task" mode or "edit existing project/task" mode.
// The form's submit event listener is attached only once and acts based on the established values.

export const stateProject = {
	currentMode: 'add',
	editingProjectId: null,
};

export const stateTask = {
	currentMode: 'add',
	editingProjectId: null,
};
