// Global state for the form: 'currentMode' and 'editingProjectId' are used to determine whether the form operates in "add new project" mode or "edit existing project" mode.
// The form's submit event listener is attached only once and acts based on the established values.

export const state = {
	currentMode: 'add',
	editingProjectId: null,
};
