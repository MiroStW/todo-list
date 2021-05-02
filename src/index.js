import showProjectList from './layout/projects_view';
import { showTodoList } from './layout/todos_view';

const container = document.querySelector('#content');

// header
const header = document.createElement('div');
header.classList.add('header');
header.textContent = 'Todo system';
container.appendChild(header);

// project list
const projectArea = document.createElement('div');
projectArea.classList.add('projectarea');
container.appendChild(projectArea);

// Todo list
const todoArea = document.createElement('div');
todoArea.classList.add('todoarea');
container.appendChild(todoArea);

showProjectList();
showTodoList('showProject');
