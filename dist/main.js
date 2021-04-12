/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/application_logic/arrays.js":
/*!*****************************************!*\
  !*** ./src/application_logic/arrays.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectArray\": () => (/* binding */ projectArray),\n/* harmony export */   \"todoArray\": () => (/* binding */ todoArray),\n/* harmony export */   \"project\": () => (/* binding */ project),\n/* harmony export */   \"todo\": () => (/* binding */ todo),\n/* harmony export */   \"updateStorage\": () => (/* binding */ updateStorage),\n/* harmony export */   \"getTodos\": () => (/* binding */ getTodos)\n/* harmony export */ });\n// factory for projects\nlet project = (name) => {\n    // maintain a todolist for every project\n    // --> now only stored on todo\n    // const todos = [];\n    const createdDate = Date.now();\n    return {name, createdDate}\n}\n\n// factory for todos\nconst todo = (name, parentProject) => {\n    // todo properties: title, description, dueDate, priority, project,\n    // complete?\n    if (!parentProject) {\n        //default to \"inbox\" project\n        parentProject = projectArray[0];\n    }\n    const project = parentProject;\n    const complete = false;\n    const description = \"\";\n    const dueDate = null;\n    const priority = 4;\n    const createdDate = Date.now();\n    return {name, project, complete, description, dueDate, priority, createdDate}\n}\n\n// project & todo array to hold all the data\nlet projectArray = [];\nlet todoArray = [];\n\nconst updateStorage = () => {\n    localStorage.setItem(\"todoSystem-projects\",JSON.stringify(projectArray));\n    localStorage.setItem(\"todoSystem-todos\",JSON.stringify(todoArray));\n    restoreData();\n}\n\nconst restoreData = () => {\n    projectArray = JSON.parse(localStorage.getItem(\"todoSystem-projects\"),);\n    todoArray = JSON.parse(localStorage.getItem(\"todoSystem-todos\"),);\n    console.log(\"projects loaded: \");\n    console.log(projectArray);\n    console.log(\"todos loaded: \");\n    console.log(todoArray);\n}\n\nconst getTodos = (project) => {\n\n    // TODO: find a way to assign an auto-incremental ID\n    const todos = todoArray.filter((todo) => {return todo.project.name == project.name})\n\n    return todos\n}\n\n//initiate local storage\nconst initiateStorage = (() => {\n    if(!localStorage.getItem('todoSystem-projects')) {\n        // push default inbox project\n        projectArray.push(project(\"inbox\"));\n        // add demo data\n        // myLibrary.push(new Book(\"The lean startup\",\"Eric Ries\",250,true));\n        // myLibrary.push(new Book(\"The hard thing about hard things\",\"Ben\n        // Horowitz\",300,true));\n        updateStorage();\n    } \n    else restoreData();\n})();\n\n\n\n//TODO: fix updateStorage + add storage of todoArray\n\n//# sourceURL=webpack://todo-list/./src/application_logic/arrays.js?");

/***/ }),

/***/ "./src/application_logic/crud.js":
/*!***************************************!*\
  !*** ./src/application_logic/crud.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"deleteItem\": () => (/* binding */ deleteItem),\n/* harmony export */   \"renameItem\": () => (/* binding */ renameItem),\n/* harmony export */   \"updateTodo\": () => (/* binding */ updateTodo),\n/* harmony export */   \"completeTodo\": () => (/* binding */ completeTodo),\n/* harmony export */   \"createItem\": () => (/* binding */ createItem)\n/* harmony export */ });\n/* harmony import */ var _arrays__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrays */ \"./src/application_logic/arrays.js\");\n/* harmony import */ var _layout_projects_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout/projects_view */ \"./src/layout/projects_view.js\");\n/* harmony import */ var _layout_todos_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layout/todos_view */ \"./src/layout/todos_view.js\");\n\n\n\n\nconst createItem = (type, parentProject) => {\n    const name = prompt(`What is the title of the new ${type}?`);\n    if (name && type === \"project\") {\n        const newProject = (0,_arrays__WEBPACK_IMPORTED_MODULE_0__.project)(name);\n        _arrays__WEBPACK_IMPORTED_MODULE_0__.projectArray.push(newProject);\n        (0,_arrays__WEBPACK_IMPORTED_MODULE_0__.updateStorage)();\n    }\n    if (name && parentProject && type === \"todo\") {\n        const newTodo = (0,_arrays__WEBPACK_IMPORTED_MODULE_0__.todo)(name, parentProject);\n        _arrays__WEBPACK_IMPORTED_MODULE_0__.todoArray.push(newTodo);\n        (0,_arrays__WEBPACK_IMPORTED_MODULE_0__.updateStorage)();\n    }\n}\n\nconst renameItem = (item, type) => {\n    const newName = prompt(\"What is the new name of \" + item.name + \"?\");\n    if(newName) {\n        item.name = newName;\n        (0,_arrays__WEBPACK_IMPORTED_MODULE_0__.updateStorage)();\n    }\n}\n\nconst updateTodo = (todo, newName,newDescription,newDueDate,newPriority) => {\n    // TODO add change project\n    todo.name = newName;\n    todo.description = newDescription;\n    todo.dueDate = newDueDate;\n    todo.priority = newPriority;\n    (0,_arrays__WEBPACK_IMPORTED_MODULE_0__.updateStorage)();\n}\n\nconst completeTodo = (todo) => {\n    todo.complete = true;\n    (0,_arrays__WEBPACK_IMPORTED_MODULE_0__.updateStorage)();\n}\n\nconst deleteItem = (item, type) => {\n    if(confirm(\"really remove \" + item.name + \"?\")) {\n        if (type === \"project\") {\n            _arrays__WEBPACK_IMPORTED_MODULE_0__.projectArray.splice(_arrays__WEBPACK_IMPORTED_MODULE_0__.projectArray.indexOf(item),1);\n            (0,_arrays__WEBPACK_IMPORTED_MODULE_0__.updateStorage)();\n            (0,_layout_projects_view__WEBPACK_IMPORTED_MODULE_1__.showProjectList)();\n        }\n        if (type === \"todo\") {\n            item.project.todos.splice(item.project.todos.indexOf(item),1);\n            (0,_arrays__WEBPACK_IMPORTED_MODULE_0__.updateStorage)();\n            (0,_layout_todos_view__WEBPACK_IMPORTED_MODULE_2__.showTodoList)();\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/application_logic/crud.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _layout_initial_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout/initial_page */ \"./src/layout/initial_page.js\");\n\n\n// separate logic from DOM\n// store in localstorage\n// use date-fns to handle duedate\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/layout/buttons.js":
/*!*******************************!*\
  !*** ./src/layout/buttons.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createDeleteBtn\": () => (/* binding */ createDeleteBtn),\n/* harmony export */   \"createUpdateTodoBtn\": () => (/* binding */ createUpdateTodoBtn),\n/* harmony export */   \"completeTodoCheckbox\": () => (/* binding */ completeTodoCheckbox),\n/* harmony export */   \"createRenameBtn\": () => (/* binding */ createRenameBtn),\n/* harmony export */   \"createNewItemBtn\": () => (/* binding */ createNewItemBtn)\n/* harmony export */ });\n/* harmony import */ var _application_logic_crud__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../application_logic/crud */ \"./src/application_logic/crud.js\");\n/* harmony import */ var _projects_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects_view */ \"./src/layout/projects_view.js\");\n/* harmony import */ var _todos_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todos_view */ \"./src/layout/todos_view.js\");\n\n\n\n\nconst createNewItemBtn = (parent, type, project) => {\n    const newBtn = document.createElement(\"button\");\n    if (type === \"project\") {\n        newBtn.textContent = \"new project\";\n        newBtn.addEventListener(\"click\", () => {\n            (0,_application_logic_crud__WEBPACK_IMPORTED_MODULE_0__.createItem)(type);\n            (0,_projects_view__WEBPACK_IMPORTED_MODULE_1__.showProjectList)();\n        });\n        parent.appendChild(newBtn);\n    }\n    if (type === \"todo\") {\n        newBtn.textContent = \"new todo\";\n        newBtn.addEventListener(\"click\", () => {\n            (0,_application_logic_crud__WEBPACK_IMPORTED_MODULE_0__.createItem)(type, project);\n            (0,_todos_view__WEBPACK_IMPORTED_MODULE_2__.showTodoList)(project);\n        });\n        parent.appendChild(newBtn);\n    }\n}\n\nconst createRenameBtn = (parent, type, item) => {\n    //rename btn\n    const renameBtn = document.createElement(\"span\");\n    renameBtn.classList.add(\"icon\");\n    renameBtn.textContent = \"✎\";\n    renameBtn.addEventListener(\"click\", () => {\n        (0,_application_logic_crud__WEBPACK_IMPORTED_MODULE_0__.renameItem)(item, type);\n        if (type === \"project\") {\n            (0,_projects_view__WEBPACK_IMPORTED_MODULE_1__.showProjectList)();\n        }\n        if (type === \"todo\") {\n            (0,_todos_view__WEBPACK_IMPORTED_MODULE_2__.showTodoList)(item.project);\n        }\n    });\n    parent.appendChild(renameBtn);\n}\n\nconst completeTodoCheckbox = (todo, parent) => {\n    const todoComplete = document.createElement(\"input\");\n    todoComplete.type = \"checkbox\";\n    todoComplete.classList.add(\"todoComplete\");\n    todoComplete.addEventListener(\"click\", () => {\n        (0,_application_logic_crud__WEBPACK_IMPORTED_MODULE_0__.completeTodo)(todo);\n    })\n    parent.appendChild(todoComplete);\n}\n\nconst createUpdateTodoBtn = (todo,parent,newName,newDescription,newDueDate,newPriority) => {\n\n    const saveBtn = document.createElement(\"button\");\n    saveBtn.textContent = \"save\";\n    saveBtn.addEventListener(\"click\", () => {\n        (0,_application_logic_crud__WEBPACK_IMPORTED_MODULE_0__.updateTodo)(todo,newName.value,newDescription.value,newDueDate.value,newPriority.value);\n        (0,_todos_view__WEBPACK_IMPORTED_MODULE_2__.showTodoList)(todo.project);\n    });\n    parent.appendChild(saveBtn);\n}\n\nconst createDeleteBtn = (parent, type, item) => {\n    //delete btn\n    const deleteBtn = document.createElement(\"span\");\n    deleteBtn.classList.add(\"icon\");\n    deleteBtn.textContent = \"❌\";\n    deleteBtn.addEventListener(\"click\", () => {\n        (0,_application_logic_crud__WEBPACK_IMPORTED_MODULE_0__.deleteItem)(item, type);\n        if (type === \"project\") {\n            (0,_projects_view__WEBPACK_IMPORTED_MODULE_1__.showProjectList)();\n            //TODO: if open project is deleted project: showTodoList()\n        }\n        if (type === \"todo\") {\n            (0,_todos_view__WEBPACK_IMPORTED_MODULE_2__.showTodoList)(item.project);\n        }\n    });\n    parent.appendChild(deleteBtn);\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/layout/buttons.js?");

/***/ }),

/***/ "./src/layout/initial_page.js":
/*!************************************!*\
  !*** ./src/layout/initial_page.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initialPage\": () => (/* binding */ initialPage)\n/* harmony export */ });\n/* harmony import */ var _projects_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects_view */ \"./src/layout/projects_view.js\");\n/* harmony import */ var _todos_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todos_view */ \"./src/layout/todos_view.js\");\n\n\n\nconst initialPage = (() => {\n    const container = document.querySelector(\"#content\");\n\n    //header\n    const header = document.createElement(\"div\");\n    header.classList.add(\"header\");\n    header.textContent = \"Todo system\";\n    container.appendChild(header);\n\n    //project list\n    const projectArea = document.createElement(\"div\");\n    projectArea.classList.add(\"projectarea\");\n    container.appendChild(projectArea);\n    \n    //Todo list\n    const todoArea = document.createElement(\"div\");\n    todoArea.classList.add(\"todoarea\");\n    container.appendChild(todoArea);\n\n    return {projectArea, todoArea}\n\n})();\n\n(0,_projects_view__WEBPACK_IMPORTED_MODULE_0__.showProjectList)();\n(0,_todos_view__WEBPACK_IMPORTED_MODULE_1__.showTodoList)();\n\n//# sourceURL=webpack://todo-list/./src/layout/initial_page.js?");

/***/ }),

/***/ "./src/layout/projects_view.js":
/*!*************************************!*\
  !*** ./src/layout/projects_view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showProjectList\": () => (/* binding */ showProjectList)\n/* harmony export */ });\n/* harmony import */ var _application_logic_arrays__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../application_logic/arrays */ \"./src/application_logic/arrays.js\");\n/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttons */ \"./src/layout/buttons.js\");\n/* harmony import */ var _todos_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todos_view */ \"./src/layout/todos_view.js\");\n/* harmony import */ var _initial_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initial_page */ \"./src/layout/initial_page.js\");\n\n\n\n\n\nconst showProjectList = () => {\n    clearProjectList();\n    // show project list\n    const projectsHeader = document.createElement(\"h2\");\n    projectsHeader.textContent = \"Projects\";\n    _initial_page__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.appendChild(projectsHeader);\n    _application_logic_arrays__WEBPACK_IMPORTED_MODULE_0__.projectArray.forEach(project => {\n        const projectDiv = document.createElement(\"div\");\n        projectDiv.classList.add(\"project\");\n\n        const projectName = document.createElement(\"span\");\n        projectName.textContent = project.name;\n        projectDiv.addEventListener(\"click\", () => {(0,_todos_view__WEBPACK_IMPORTED_MODULE_2__.showTodoList)(project)});\n        projectDiv.appendChild(projectName);\n\n        if (project !== _application_logic_arrays__WEBPACK_IMPORTED_MODULE_0__.projectArray[0]) {\n            const btnDiv = document.createElement(\"div\");\n            btnDiv.classList.add(\"btnrow\");\n            (0,_buttons__WEBPACK_IMPORTED_MODULE_1__.createRenameBtn)(btnDiv,\"project\",project);\n            (0,_buttons__WEBPACK_IMPORTED_MODULE_1__.createDeleteBtn)(btnDiv,\"project\",project);\n            projectDiv.addEventListener(\"mouseover\", () => {btnDiv.classList.add(\"active\")});\n            projectDiv.addEventListener(\"mouseout\", () => {btnDiv.classList.remove(\"active\")});\n            projectDiv.appendChild(btnDiv);\n        }\n\n        _initial_page__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.appendChild(projectDiv);\n    });\n\n    (0,_buttons__WEBPACK_IMPORTED_MODULE_1__.createNewItemBtn)(_initial_page__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea,\"project\");\n    \n}\n\nconst clearProjectList = () => {\n    //clear displayed project Area\n    if (_initial_page__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea && _initial_page__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.childNodes.length > 0) {\n        while (_initial_page__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.firstChild) {\n            _initial_page__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.removeChild(_initial_page__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.lastChild);\n          }\n    }\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/layout/projects_view.js?");

/***/ }),

/***/ "./src/layout/todos_view.js":
/*!**********************************!*\
  !*** ./src/layout/todos_view.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showTodoList\": () => (/* binding */ showTodoList),\n/* harmony export */   \"showTodo\": () => (/* binding */ showTodo)\n/* harmony export */ });\n/* harmony import */ var _application_logic_arrays__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../application_logic/arrays */ \"./src/application_logic/arrays.js\");\n/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttons */ \"./src/layout/buttons.js\");\n/* harmony import */ var _initial_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initial_page */ \"./src/layout/initial_page.js\");\n\n\n\n\nconst showTodoList = (project) => {\n    if (!project) {project = _application_logic_arrays__WEBPACK_IMPORTED_MODULE_0__.projectArray[0];} //default to inbox\n    clearTodoList();\n    // show project list\n    const todoHeader = document.createElement(\"h2\");\n    todoHeader.textContent = \"Todos - \" + project.name;\n    _initial_page__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.appendChild(todoHeader);\n    \n    const todos = (0,_application_logic_arrays__WEBPACK_IMPORTED_MODULE_0__.getTodos)(project);\n\n    todos.forEach(todo => {\n        const todoDiv = document.createElement(\"div\");\n        todoDiv.classList.add(\"todo\");\n\n        // complete checkbox\n        (0,_buttons__WEBPACK_IMPORTED_MODULE_1__.completeTodoCheckbox)(todo, todoDiv);\n\n        // todo bar\n        const todoBarDiv = document.createElement(\"div\");\n        todoBarDiv.classList.add(\"todoBar\");\n        todoDiv.appendChild(todoBarDiv);\n\n        // todo title\n        const todoTitleDiv = document.createElement(\"span\");\n        todoTitleDiv.classList.add(\"todoTitle\");\n        todoTitleDiv.textContent = todo.name;\n        todoBarDiv.appendChild(todoTitleDiv);\n\n        // remove button\n        const btnDiv = document.createElement(\"div\");\n        btnDiv.classList.add(\"btnrow\");\n        // not needed: createRenameBtn(btnDiv, \"todo\", todo);\n        (0,_buttons__WEBPACK_IMPORTED_MODULE_1__.createDeleteBtn)(btnDiv, \"todo\", todo);\n        todoBarDiv.appendChild(btnDiv);\n\n        // open todo\n        todoDiv.addEventListener(\"mouseover\", () => {btnDiv.classList.add(\"active\")});\n        todoDiv.addEventListener(\"mouseout\", () => {btnDiv.classList.remove(\"active\")});\n        todoBarDiv.addEventListener(\"click\", () => {showTodo(todo,todoDiv, project)});\n        \n        _initial_page__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.appendChild(todoDiv);\n    });\n\n    (0,_buttons__WEBPACK_IMPORTED_MODULE_1__.createNewItemBtn)(_initial_page__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea,\"todo\",project);\n    \n}\n\nconst clearTodoList = () => {\n    //clear displayed todo Area\n    if (_initial_page__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea && _initial_page__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.childNodes.length > 0) {\n        while (_initial_page__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.firstChild) {\n            _initial_page__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.removeChild(_initial_page__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.lastChild);\n          }\n    }\n}\n\nconst showTodo = (todo, todoDivClosed, project) => {\n    // TODO no borders of input, but overall border\n    // focus immediately in title\n    // complete checkbox\n    const todoDivOpen = document.createElement(\"div\");\n    todoDivOpen.classList.add(\"todoOpen\");\n\n    // complete checkbox\n    (0,_buttons__WEBPACK_IMPORTED_MODULE_1__.completeTodoCheckbox)(todo, todoDivOpen);\n\n    const nameInput = document.createElement(\"input\");\n    nameInput.value = todo.name;\n    nameInput.placeholder = \"Title\";\n    todoDivOpen.appendChild(nameInput);\n\n    const descriptionInput = document.createElement(\"textarea\");\n    descriptionInput.value = todo.description;\n    descriptionInput.placeholder = \"Description\";\n\n    descriptionInput.addEventListener(\"input\", OnInput, false);\n    function OnInput() {\n        console.log(\"height changed;\")\n        this.style.height = \"auto\";\n        this.style.height = (this.scrollHeight) + \"px\";\n    }\n\n    todoDivOpen.appendChild(descriptionInput);\n\n    \n    const dueDateInput = document.createElement(\"input\");\n    dueDateInput.value = todo.dueDate;\n    dueDateInput.placeholder = \"Duedate\";\n    todoDivOpen.appendChild(dueDateInput);\n    \n    const priorityInput = document.createElement(\"input\");\n    priorityInput.value = todo.priority;\n    todoDivOpen.appendChild(priorityInput);\n    \n    const createdDate = document.createElement(\"div\");\n    createdDate.value = todo.createdDate;\n    todoDivOpen.appendChild(createdDate);\n\n    (0,_buttons__WEBPACK_IMPORTED_MODULE_1__.createUpdateTodoBtn)(\n        todo,\n        todoDivOpen,\n        nameInput,\n        descriptionInput,\n        dueDateInput,\n        priorityInput\n    );\n\n    const cancelBtn = document.createElement(\"button\");\n    cancelBtn.textContent = \"cancel\";\n    cancelBtn.addEventListener(\"click\", () => {showTodoList(project)});\n    todoDivOpen.appendChild(cancelBtn);\n    \n    _initial_page__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.replaceChild(todoDivOpen,todoDivClosed);\n}\n\n\n\n// TODO: \n// make it visible in open todo\n// put completed todos in \"done\" list\n// add transition period before checked todo is moved there\n// have done list closed by default\n\n//# sourceURL=webpack://todo-list/./src/layout/todos_view.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;