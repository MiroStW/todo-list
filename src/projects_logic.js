// factory for projects
const project = (name) => {
    const proto = {
        type: "project"
    }
    return Object.assign(Object.create(proto), {name})
}

// projects , list, create, delete, rename
const projectList = (() => {
    const projects = [];
    // default project: inbox
    projects.push(project("inbox"));
    return {projects}
})();

//create project
const createProject = () => {
    const name = prompt("What is the title of the new project?");
    if (name) {
        const newProject = project(name);
        projectList.projects.push(newProject);
        showProjects();
    }
}

const deleteProject = (project) => {
    if(confirm("really remove " + project.name + "?")) {
        projectList.projects.splice(projectList.projects.indexOf(project),1);
        showProjects();
    }
}

const renameProject = (project) => {
    const newName = prompt("What is the new name of " + project.name + "?");
    if(newName) {
        project.name = newName;
        showProjects();
    }
}

export {projectList, createProject, deleteProject, renameProject}