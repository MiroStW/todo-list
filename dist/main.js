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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectList\": () => (/* binding */ projectList),\n/* harmony export */   \"todoList\": () => (/* binding */ todoList),\n/* harmony export */   \"project\": () => (/* binding */ project),\n/* harmony export */   \"todo\": () => (/* binding */ todo)\n/* harmony export */ });\n// factory for projects\nconst project = (name) => {\n    const proto = {\n        type: \"project\"\n    }\n    // maintain a todolist for every project\n    const todos = [];\n    const createdDate = Date.now();\n    return Object.assign(Object.create(proto), {name, todos, createdDate})\n}\n\n// projects , list, create, delete, rename\nconst projectList = (() => {\n    const projects = [];\n    // default project: inbox\n    if (projects.length == 0) {\n        projects.push(project(\"inbox\"));\n    }\n    return {projects}\n})();\n\n// factory for todos\nconst todo = (name, parentProject) => {\n    // todo properties: title, description, dueDate, priority, project,\n    // complete?\n    const proto = {\n        type: \"todo\"\n    }\n    if (!parentProject || parentProject.type !== \"project\") {\n        parentProject = projectList[0];\n    }\n    const project = parentProject;\n    const complete = false;\n    const description = \"\";\n    const dueDate = null;\n    const priority = 4;\n    const createdDate = Date.now();\n    return Object.assign(Object.create(proto), {name, project, complete, description, dueDate, priority, createdDate})\n}\n\n// maintain a todolist for every project, update whenever projects get updated\nconst todoList = (project) => {\n    const todos = project.todos\n    return {todos}\n};\n\n\n\n//# sourceURL=webpack://todo-list/./src/application_logic/arrays.js?");

/***/ }),

/***/ "./src/application_logic/crud.js":
/*!***************************************!*\
  !*** ./src/application_logic/crud.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"deleteItem\": () => (/* binding */ deleteItem),\n/* harmony export */   \"renameItem\": () => (/* binding */ renameItem),\n/* harmony export */   \"createItem\": () => (/* binding */ createItem)\n/* harmony export */ });\n/* harmony import */ var _arrays_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrays.js */ \"./src/application_logic/arrays.js\");\n/* harmony import */ var _layout_projects_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout/projects_view.js */ \"./src/layout/projects_view.js\");\n/* harmony import */ var _layout_todos_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layout/todos_view.js */ \"./src/layout/todos_view.js\");\n\n\n\n\nconst createItem = (type, parentProject) => {\n    const name = prompt(`What is the title of the new ${type}?`);\n    if (name && type === \"project\") {\n        const newProject = (0,_arrays_js__WEBPACK_IMPORTED_MODULE_0__.project)(name);\n        _arrays_js__WEBPACK_IMPORTED_MODULE_0__.projectList.projects.push(newProject);\n    }\n    if (name && parentProject && type === \"todo\") {\n        const newTodo = (0,_arrays_js__WEBPACK_IMPORTED_MODULE_0__.todo)(name, parentProject);\n        parentProject.todos.push(newTodo);\n    }\n}\n\nconst renameItem = (item) => {\n    const newName = prompt(\"What is the new name of \" + item.name + \"?\");\n    if(newName) {\n        item.name = newName;\n        if (item.type === \"project\") {\n            (0,_layout_projects_view_js__WEBPACK_IMPORTED_MODULE_1__.showProjects)();\n        }\n        if (item.type === \"todo\") {\n            (0,_layout_todos_view_js__WEBPACK_IMPORTED_MODULE_2__.showTodos)();\n        }\n    }\n}\n\nconst deleteItem = (item) => {\n    if(confirm(\"really remove \" + item.name + \"?\")) {\n        if (item.type === \"project\") {\n            _arrays_js__WEBPACK_IMPORTED_MODULE_0__.projectList.projects.splice(_arrays_js__WEBPACK_IMPORTED_MODULE_0__.projectList.projects.indexOf(item),1);\n            (0,_layout_projects_view_js__WEBPACK_IMPORTED_MODULE_1__.showProjects)();\n        }\n        if (item.type === \"todo\") {\n            item.project.todos.splice(item.project.todos.indexOf(item),1);\n            (0,_layout_todos_view_js__WEBPACK_IMPORTED_MODULE_2__.showTodos)();\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/application_logic/crud.js?");

/***/ }),

/***/ "./src/application_logic/index.js":
/*!****************************************!*\
  !*** ./src/application_logic/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"deleteItem\": () => (/* reexport safe */ _crud_js__WEBPACK_IMPORTED_MODULE_0__.deleteItem),\n/* harmony export */   \"renameItem\": () => (/* reexport safe */ _crud_js__WEBPACK_IMPORTED_MODULE_0__.renameItem),\n/* harmony export */   \"createItem\": () => (/* reexport safe */ _crud_js__WEBPACK_IMPORTED_MODULE_0__.createItem),\n/* harmony export */   \"projectList\": () => (/* reexport safe */ _arrays_js__WEBPACK_IMPORTED_MODULE_1__.projectList),\n/* harmony export */   \"todoList\": () => (/* reexport safe */ _arrays_js__WEBPACK_IMPORTED_MODULE_1__.todoList)\n/* harmony export */ });\n/* harmony import */ var _crud_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crud.js */ \"./src/application_logic/crud.js\");\n/* harmony import */ var _arrays_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrays.js */ \"./src/application_logic/arrays.js\");\n\n\n\n//# sourceURL=webpack://todo-list/./src/application_logic/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ \"./src/layout/index.js\");\n\n\n// separate logic from DOM\n// store in localstorage\n// use date-fns to handle duedate\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/layout/buttons.js":
/*!*******************************!*\
  !*** ./src/layout/buttons.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createDeleteBtn\": () => (/* binding */ createDeleteBtn),\n/* harmony export */   \"createRenameBtn\": () => (/* binding */ createRenameBtn),\n/* harmony export */   \"createNewItemBtn\": () => (/* binding */ createNewItemBtn)\n/* harmony export */ });\n/* harmony import */ var _application_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../application_logic */ \"./src/application_logic/index.js\");\n/* harmony import */ var _projects_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects_view.js */ \"./src/layout/projects_view.js\");\n/* harmony import */ var _todos_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todos_view.js */ \"./src/layout/todos_view.js\");\n\n\n\n\nconst createNewItemBtn = (parent, type, project) => {\n    const newBtn = document.createElement(\"button\");\n    if (type === \"project\") {\n        newBtn.textContent = \"new project\";\n        newBtn.addEventListener(\"click\", () => {\n            (0,_application_logic__WEBPACK_IMPORTED_MODULE_0__.createItem)(type);\n            (0,_projects_view_js__WEBPACK_IMPORTED_MODULE_1__.showProjects)();\n        });\n    }\n    if (type === \"todo\") {\n    newBtn.textContent = \"new todo\";\n    newBtn.addEventListener(\"click\", () => {\n        (0,_application_logic__WEBPACK_IMPORTED_MODULE_0__.createItem)(type, project);\n        (0,_todos_view_js__WEBPACK_IMPORTED_MODULE_2__.showTodos)(project);\n    });\n    }\n    parent.appendChild(newBtn);\n}\n\nconst createRenameBtn = (parent, item) => {\n    //rename btn\n    const RenameBtn = document.createElement(\"span\");\n    RenameBtn.classList.add(\"icon\");\n    RenameBtn.textContent = \"✎\";\n    RenameBtn.addEventListener(\"click\", () => {(0,_application_logic__WEBPACK_IMPORTED_MODULE_0__.renameItem)(item)});\n    parent.appendChild(RenameBtn);\n}\n\nconst createDeleteBtn = (parent,item) => {\n    //delete btn\n    const DeleteBtn = document.createElement(\"span\");\n    DeleteBtn.classList.add(\"icon\");\n    DeleteBtn.textContent = \"❌\";\n    DeleteBtn.addEventListener(\"click\", () => {(0,_application_logic__WEBPACK_IMPORTED_MODULE_0__.deleteItem)(item)});\n    parent.appendChild(DeleteBtn);\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/layout/buttons.js?");

/***/ }),

/***/ "./src/layout/index.js":
/*!*****************************!*\
  !*** ./src/layout/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initialPage\": () => (/* reexport safe */ _initial_page_js__WEBPACK_IMPORTED_MODULE_0__.initialPage)\n/* harmony export */ });\n/* harmony import */ var _initial_page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial_page.js */ \"./src/layout/initial_page.js\");\n\n\n//# sourceURL=webpack://todo-list/./src/layout/index.js?");

/***/ }),

/***/ "./src/layout/initial_page.js":
/*!************************************!*\
  !*** ./src/layout/initial_page.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initialPage\": () => (/* binding */ initialPage)\n/* harmony export */ });\n/* harmony import */ var _projects_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects_view.js */ \"./src/layout/projects_view.js\");\n/* harmony import */ var _todos_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todos_view.js */ \"./src/layout/todos_view.js\");\n\n\n\nconst initialPage = (() => {\n    const container = document.querySelector(\"#content\");\n\n    //header\n    const header = document.createElement(\"div\");\n    header.classList.add(\"header\");\n    header.textContent = \"Todo system\";\n    container.appendChild(header);\n\n    //project list\n    const projectArea = document.createElement(\"div\");\n    projectArea.classList.add(\"projectarea\");\n    container.appendChild(projectArea);\n    \n    //Todo list\n    const todoArea = document.createElement(\"div\");\n    todoArea.classList.add(\"todoarea\");\n    container.appendChild(todoArea);\n\n    return {projectArea, todoArea}\n\n})();\n\n(0,_projects_view_js__WEBPACK_IMPORTED_MODULE_0__.showProjects)();\n(0,_todos_view_js__WEBPACK_IMPORTED_MODULE_1__.showTodos)();\n\n//# sourceURL=webpack://todo-list/./src/layout/initial_page.js?");

/***/ }),

/***/ "./src/layout/projects_view.js":
/*!*************************************!*\
  !*** ./src/layout/projects_view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showProjects\": () => (/* binding */ showProjects)\n/* harmony export */ });\n/* harmony import */ var _buttons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttons.js */ \"./src/layout/buttons.js\");\n/* harmony import */ var _application_logic_arrays_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../application_logic/arrays.js */ \"./src/application_logic/arrays.js\");\n/* harmony import */ var _todos_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todos_view.js */ \"./src/layout/todos_view.js\");\n/* harmony import */ var _initial_page_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initial_page.js */ \"./src/layout/initial_page.js\");\n\n\n\n\n\nconst showProjects = () => {\n    // const projectArea = document.querySelector(\".projectarea\");\n    clearProjectList();\n    // show project list\n    const projectsHeader = document.createElement(\"h2\");\n    projectsHeader.textContent = \"Projects\";\n    _initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.appendChild(projectsHeader);\n    _application_logic_arrays_js__WEBPACK_IMPORTED_MODULE_1__.projectList.projects.forEach(project => {\n        const projectDiv = document.createElement(\"div\");\n\n        const projectName = document.createElement(\"span\");\n        projectName.textContent = project.name;\n        projectName.addEventListener(\"click\", () => {(0,_todos_view_js__WEBPACK_IMPORTED_MODULE_2__.showTodos)(project);})\n        projectDiv.appendChild(projectName);\n\n        if (project !== _application_logic_arrays_js__WEBPACK_IMPORTED_MODULE_1__.projectList.projects[0]) {\n            (0,_buttons_js__WEBPACK_IMPORTED_MODULE_0__.createRenameBtn)(projectDiv,project);\n            (0,_buttons_js__WEBPACK_IMPORTED_MODULE_0__.createDeleteBtn)(projectDiv,project);\n        }\n\n        _initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.appendChild(projectDiv);\n    });\n\n    (0,_buttons_js__WEBPACK_IMPORTED_MODULE_0__.createNewItemBtn)(_initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea,\"project\");\n    \n}\n\nconst clearProjectList = () => {\n    //clear displayed project Area\n    if (_initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea && _initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.childNodes.length > 0) {\n        while (_initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.firstChild) {\n            _initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.removeChild(_initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.lastChild);\n          }\n    }\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/layout/projects_view.js?");

/***/ }),

/***/ "./src/layout/todos_view.js":
/*!**********************************!*\
  !*** ./src/layout/todos_view.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showTodos\": () => (/* binding */ showTodos)\n/* harmony export */ });\n/* harmony import */ var _application_logic_arrays_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../application_logic/arrays.js */ \"./src/application_logic/arrays.js\");\n/* harmony import */ var _buttons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttons.js */ \"./src/layout/buttons.js\");\n/* harmony import */ var _initial_page_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initial_page.js */ \"./src/layout/initial_page.js\");\n\n\n\n\nconst showTodos = (project) => {\n    // const todoArea = document.querySelector(\".todoarea\");\n    clearTodoList();\n    // show project list\n    const todoHeader = document.createElement(\"h2\");\n    todoHeader.textContent = \"Todos\";\n    _initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.appendChild(todoHeader);\n\n    if(!project) {project = _application_logic_arrays_js__WEBPACK_IMPORTED_MODULE_0__.projectList.projects[0]}\n    project.todos.forEach(todo => {\n        const todoDiv = document.createElement(\"div\");\n        todoDiv.textContent = todo.name;\n        //TODO port the rest to todos\n        (0,_buttons_js__WEBPACK_IMPORTED_MODULE_1__.createRenameBtn)(todoDiv,todo);\n        (0,_buttons_js__WEBPACK_IMPORTED_MODULE_1__.createDeleteBtn)(todoDiv,todo);\n        _initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.appendChild(todoDiv);\n    });\n\n    (0,_buttons_js__WEBPACK_IMPORTED_MODULE_1__.createNewItemBtn)(_initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea,\"todo\",project);\n    \n}\n\nconst clearTodoList = () => {\n    //clear displayed todo Area\n    if (_initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea && _initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.childNodes.length > 0) {\n        while (_initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.firstChild) {\n            _initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.removeChild(_initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.lastChild);\n          }\n    }\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/layout/todos_view.js?");

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