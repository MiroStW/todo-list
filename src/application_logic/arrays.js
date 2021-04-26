// project & todo array to hold all the data
let projectArray = [];
let todoArray = [];

// factory for projects
const Project = (name) => {
  const createdDate = Date.now();
  return { name, createdDate };
};

// factory for todos
const Todo = (name, parentProject) => {
  if (!parentProject) {
    // default to "inbox" project
    parentProject = projectArray[0];
  }
  const project = parentProject;
  const complete = false;
  const description = '';
  const dueDate = null;
  const priority = 4;
  const createdDate = Date.now();
  return {
    name, project, complete, description, dueDate, priority, createdDate,
  };
};

const restoreData = () => {
  projectArray = JSON.parse(localStorage.getItem('todoSystem-projects'));
  todoArray = JSON.parse(localStorage.getItem('todoSystem-todos'));
//   console.log('projects loaded: ');
//   console.log(projectArray);
//   console.log('todos loaded: ');
//   console.log(todoArray);
};

const updateStorage = () => {
  localStorage.setItem('todoSystem-projects', JSON.stringify(projectArray));
  localStorage.setItem('todoSystem-todos', JSON.stringify(todoArray));
  restoreData();
};

// initiate local storage
(() => {
  if (!localStorage.getItem('todoSystem-projects')) {
    // push default inbox project
    projectArray.push(Project('Inbox'));
    // TODO: add demo data?
    updateStorage();
  } else restoreData();
})();

export {
  projectArray, todoArray, Project, Todo, updateStorage,
};
