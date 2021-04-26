import { isInbox, getProjects } from '../application_logic/crud';
import {
  addIcon, createRenameBtn, createDeleteBtn, createNewItemBtn, createSeparator,
} from './buttons';
import { showTodoList } from './todos_view';

const clearProjectList = (projectArea) => {
  // clear displayed project Area
  if (projectArea && projectArea.childNodes.length > 0) {
    while (projectArea.firstChild) {
      projectArea.removeChild(projectArea.lastChild);
    }
  }
};

const showProject = (action, project) => {
  const projectArea = document.querySelector('.projectarea');
  const projectDiv = document.createElement('div');

  const projectName = document.createElement('span');
  switch (action) {
    case 'showToday': {
      const icon = addIcon(projectDiv, 'star');
      icon.classList.add('todayIcon');
      projectName.textContent = 'Today';
      projectDiv.addEventListener('click', () => {
        showTodoList('showToday');
      });
      break;
    }
    case 'showUpcoming': {
      const icon = addIcon(projectDiv, 'date_range');
      icon.classList.add('upcomingIcon');
      projectName.textContent = 'Upcoming';
      projectDiv.addEventListener('click', () => {
        showTodoList('showUpcoming');
      });
      break;
    }
    default: {
      if (isInbox(project)) {
        const icon = addIcon(projectDiv, 'inbox');
        icon.classList.add('inboxIcon');
      }
      projectName.textContent = project.name;
      projectDiv.addEventListener('click', () => {
        showTodoList('showProject', project);
      });
      break;
    }
  }
  projectDiv.appendChild(projectName);

  // buttons only for projects & if != inbox
  if (project && !isInbox(project)) {
    projectDiv.classList.add('project');
    createRenameBtn(projectDiv, 'project', project);
    createDeleteBtn(projectDiv, 'project', project);
    projectDiv.addEventListener('mouseover', () => {
      projectDiv.classList.add('active');
    });
    projectDiv.addEventListener('mouseout', () => {
      projectDiv.classList.remove('active');
    });
  } else {
    projectDiv.classList.add('specialProject');
  }

  projectArea.appendChild(projectDiv);
};

const showProjectList = () => {
  const projectArea = document.querySelector('.projectarea');
  clearProjectList(projectArea);

  // header
  const projectsHeader = document.createElement('h2');
  projectsHeader.textContent = 'Projects';
  projectArea.appendChild(projectsHeader);

  // inbox view
  showProject('showProject', getProjects('inbox'));

  createSeparator(projectArea);

  // special views
  showProject('showToday');
  showProject('showUpcoming');

  createSeparator(projectArea);

  // project list without inbox
  getProjects('noInbox').forEach((project) => {
    showProject('showProject', project);
  });

  createNewItemBtn(projectArea, 'project');
};

export default showProjectList;
