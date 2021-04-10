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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectArray\": () => (/* binding */ projectArray),\n/* harmony export */   \"todoArray\": () => (/* binding */ todoArray),\n/* harmony export */   \"project\": () => (/* binding */ project),\n/* harmony export */   \"todo\": () => (/* binding */ todo),\n/* harmony export */   \"updateStorage\": () => (/* binding */ updateStorage),\n/* harmony export */   \"getTodos\": () => (/* binding */ getTodos)\n/* harmony export */ });\n// factory for projects\nlet project = (name) => {\n    // maintain a todolist for every project\n    // --> now only stored on todo\n    // const todos = [];\n    const createdDate = Date.now();\n    return {name, createdDate}\n}\n\n// factory for todos\nconst todo = (name, parentProject) => {\n    // todo properties: title, description, dueDate, priority, project,\n    // complete?\n    if (!parentProject) {\n        //default to \"inbox\" project\n        parentProject = projectArray[0];\n    }\n    const project = parentProject;\n    const complete = false;\n    const description = \"\";\n    const dueDate = null;\n    const priority = 4;\n    const createdDate = Date.now();\n    return {name, project, complete, description, dueDate, priority, createdDate}\n}\n\n// project & todo array to hold all the data\nlet projectArray = [];\nlet todoArray = [];\n\nconst updateStorage = () => {\n    localStorage.setItem(\"todoSystem-projects\",JSON.stringify(projectArray));\n    localStorage.setItem(\"todoSystem-todos\",JSON.stringify(todoArray));\n    restoreData();\n}\n\nconst restoreData = () => {\n    projectArray = JSON.parse(localStorage.getItem(\"todoSystem-projects\"),);\n    todoArray = JSON.parse(localStorage.getItem(\"todoSystem-todos\"),);\n}\n\nconst getTodos = (project) => {\n\n    // TODO: find a way to assign an auto-incremental ID\n    const todos = todoArray.filter((todo) => {return todo.project.name == project.name})\n\n    return todos\n}\n\n//initiate local storage\nconst initiateStorage = (() => {\n    if(!localStorage.getItem('todoSystem-projects')) {\n        // push default inbox project\n        projectArray.push(project(\"inbox\"));\n        // add demo data\n        // myLibrary.push(new Book(\"The lean startup\",\"Eric Ries\",250,true));\n        // myLibrary.push(new Book(\"The hard thing about hard things\",\"Ben\n        // Horowitz\",300,true));\n        updateStorage();\n    } \n    else restoreData();\n})();\n\n\n\n//TODO: fix updateStorage + add storage of todoArray\n\n//# sourceURL=webpack://todo-list/./src/application_logic/arrays.js?");

/***/ }),

/***/ "./src/application_logic/crud.js":
/*!***************************************!*\
  !*** ./src/application_logic/crud.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"deleteItem\": () => (/* binding */ deleteItem),\n/* harmony export */   \"renameItem\": () => (/* binding */ renameItem),\n/* harmony export */   \"createItem\": () => (/* binding */ createItem)\n/* harmony export */ });\n/* harmony import */ var _arrays_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrays.js */ \"./src/application_logic/arrays.js\");\n/* harmony import */ var _layout_projects_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout/projects_view.js */ \"./src/layout/projects_view.js\");\n/* harmony import */ var _layout_todos_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layout/todos_view.js */ \"./src/layout/todos_view.js\");\n\n\n\n\nconst createItem = (type, parentProject) => {\n    const name = prompt(`What is the title of the new ${type}?`);\n    if (name && type === \"project\") {\n        const newProject = (0,_arrays_js__WEBPACK_IMPORTED_MODULE_0__.project)(name);\n        _arrays_js__WEBPACK_IMPORTED_MODULE_0__.projectArray.push(newProject);\n        console.log(_arrays_js__WEBPACK_IMPORTED_MODULE_0__.projectArray);\n    }\n    if (name && parentProject && type === \"todo\") {\n        const newTodo = (0,_arrays_js__WEBPACK_IMPORTED_MODULE_0__.todo)(name, parentProject);\n        _arrays_js__WEBPACK_IMPORTED_MODULE_0__.todoArray.push(newTodo);\n        console.log(_arrays_js__WEBPACK_IMPORTED_MODULE_0__.todoArray);\n    }\n    (0,_arrays_js__WEBPACK_IMPORTED_MODULE_0__.updateStorage)();\n}\n\nconst renameItem = (item, type) => {\n    const newName = prompt(\"What is the new name of \" + item.name + \"?\");\n    if(newName) {\n        item.name = newName;\n        if (type === \"project\") {\n            (0,_layout_projects_view_js__WEBPACK_IMPORTED_MODULE_1__.showProjects)();\n        }\n        if (type === \"todo\") {\n            (0,_layout_todos_view_js__WEBPACK_IMPORTED_MODULE_2__.showTodos)();\n        }\n    }\n    (0,_arrays_js__WEBPACK_IMPORTED_MODULE_0__.updateStorage)();\n}\n\nconst deleteItem = (item, type) => {\n    if(confirm(\"really remove \" + item.name + \"?\")) {\n        if (type === \"project\") {\n            _arrays_js__WEBPACK_IMPORTED_MODULE_0__.projectArray.splice(_arrays_js__WEBPACK_IMPORTED_MODULE_0__.projectArray.indexOf(item),1);\n            (0,_layout_projects_view_js__WEBPACK_IMPORTED_MODULE_1__.showProjects)();\n        }\n        if (type === \"todo\") {\n            item.project.todos.splice(item.project.todos.indexOf(item),1);\n            (0,_layout_todos_view_js__WEBPACK_IMPORTED_MODULE_2__.showTodos)();\n        }\n    }\n    (0,_arrays_js__WEBPACK_IMPORTED_MODULE_0__.updateStorage)();\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/application_logic/crud.js?");

/***/ }),

/***/ "./src/application_logic/index.js":
/*!****************************************!*\
  !*** ./src/application_logic/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"deleteItem\": () => (/* reexport safe */ _crud_js__WEBPACK_IMPORTED_MODULE_0__.deleteItem),\n/* harmony export */   \"renameItem\": () => (/* reexport safe */ _crud_js__WEBPACK_IMPORTED_MODULE_0__.renameItem),\n/* harmony export */   \"createItem\": () => (/* reexport safe */ _crud_js__WEBPACK_IMPORTED_MODULE_0__.createItem),\n/* harmony export */   \"projectArray\": () => (/* reexport safe */ _arrays_js__WEBPACK_IMPORTED_MODULE_1__.projectArray)\n/* harmony export */ });\n/* harmony import */ var _crud_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crud.js */ \"./src/application_logic/crud.js\");\n/* harmony import */ var _arrays_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrays.js */ \"./src/application_logic/arrays.js\");\n\n\n\n//# sourceURL=webpack://todo-list/./src/application_logic/index.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createDeleteBtn\": () => (/* binding */ createDeleteBtn),\n/* harmony export */   \"createRenameBtn\": () => (/* binding */ createRenameBtn),\n/* harmony export */   \"createNewItemBtn\": () => (/* binding */ createNewItemBtn)\n/* harmony export */ });\n/* harmony import */ var _application_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../application_logic */ \"./src/application_logic/index.js\");\n/* harmony import */ var _projects_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects_view.js */ \"./src/layout/projects_view.js\");\n/* harmony import */ var _todos_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todos_view.js */ \"./src/layout/todos_view.js\");\n\n\n\n\nconst createNewItemBtn = (parent, type, project) => {\n    const newBtn = document.createElement(\"button\");\n    if (type === \"project\") {\n        newBtn.textContent = \"new project\";\n        newBtn.addEventListener(\"click\", () => {\n            (0,_application_logic__WEBPACK_IMPORTED_MODULE_0__.createItem)(type);\n            (0,_projects_view_js__WEBPACK_IMPORTED_MODULE_1__.showProjects)();\n        });\n        parent.appendChild(newBtn);\n    }\n    if (type === \"todo\") {\n        newBtn.textContent = \"new todo\";\n        newBtn.addEventListener(\"click\", () => {\n            (0,_application_logic__WEBPACK_IMPORTED_MODULE_0__.createItem)(type, project);\n            (0,_todos_view_js__WEBPACK_IMPORTED_MODULE_2__.showTodos)(project);\n        });\n        parent.appendChild(newBtn);\n    }\n}\n\nconst createRenameBtn = (parent, type, item) => {\n    //rename btn\n    const RenameBtn = document.createElement(\"span\");\n    RenameBtn.classList.add(\"icon\");\n    RenameBtn.textContent = \"✎\";\n    RenameBtn.addEventListener(\"click\", () => {(0,_application_logic__WEBPACK_IMPORTED_MODULE_0__.renameItem)(item, type)});\n    parent.appendChild(RenameBtn);\n}\n\nconst createDeleteBtn = (parent, type, item) => {\n    //delete btn\n    const DeleteBtn = document.createElement(\"span\");\n    DeleteBtn.classList.add(\"icon\");\n    DeleteBtn.textContent = \"❌\";\n    DeleteBtn.addEventListener(\"click\", () => {(0,_application_logic__WEBPACK_IMPORTED_MODULE_0__.deleteItem)(item, type)});\n    parent.appendChild(DeleteBtn);\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/layout/buttons.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showProjects\": () => (/* binding */ showProjects)\n/* harmony export */ });\n/* harmony import */ var _application_logic_arrays_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../application_logic/arrays.js */ \"./src/application_logic/arrays.js\");\n/* harmony import */ var _buttons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttons.js */ \"./src/layout/buttons.js\");\n/* harmony import */ var _todos_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todos_view.js */ \"./src/layout/todos_view.js\");\n/* harmony import */ var _initial_page_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initial_page.js */ \"./src/layout/initial_page.js\");\n\n\n\n\n\nconst showProjects = () => {\n    clearProjectView();\n    // show project list\n    const projectsHeader = document.createElement(\"h2\");\n    projectsHeader.textContent = \"Projects\";\n    _initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.appendChild(projectsHeader);\n    _application_logic_arrays_js__WEBPACK_IMPORTED_MODULE_0__.projectArray.forEach(project => {\n        const projectDiv = document.createElement(\"div\");\n        projectDiv.classList.add(\"project\");\n\n        const projectName = document.createElement(\"span\");\n        projectName.textContent = project.name;\n        projectDiv.addEventListener(\"click\", () => {(0,_todos_view_js__WEBPACK_IMPORTED_MODULE_2__.showTodos)(project);})\n        projectDiv.appendChild(projectName);\n\n        if (project !== _application_logic_arrays_js__WEBPACK_IMPORTED_MODULE_0__.projectArray[0]) {\n            const btnDiv = document.createElement(\"div\");\n            btnDiv.classList.add(\"buttons\");\n            (0,_buttons_js__WEBPACK_IMPORTED_MODULE_1__.createRenameBtn)(btnDiv,\"project\",project);\n            (0,_buttons_js__WEBPACK_IMPORTED_MODULE_1__.createDeleteBtn)(btnDiv,\"project\",project);\n            projectDiv.addEventListener(\"mouseover\", () => {btnDiv.classList.add(\"active\")});\n            projectDiv.addEventListener(\"mouseout\", () => {btnDiv.classList.remove(\"active\")});\n            projectDiv.appendChild(btnDiv);\n        }\n\n        _initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.appendChild(projectDiv);\n    });\n\n    (0,_buttons_js__WEBPACK_IMPORTED_MODULE_1__.createNewItemBtn)(_initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea,\"project\");\n    \n}\n\nconst clearProjectView = () => {\n    //clear displayed project Area\n    if (_initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea && _initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.childNodes.length > 0) {\n        while (_initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.firstChild) {\n            _initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.removeChild(_initial_page_js__WEBPACK_IMPORTED_MODULE_3__.initialPage.projectArea.lastChild);\n          }\n    }\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/layout/projects_view.js?");

/***/ }),

/***/ "./src/layout/todos_view.js":
/*!**********************************!*\
  !*** ./src/layout/todos_view.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showTodos\": () => (/* binding */ showTodos)\n/* harmony export */ });\n/* harmony import */ var _application_logic_arrays_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../application_logic/arrays.js */ \"./src/application_logic/arrays.js\");\n/* harmony import */ var _buttons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttons.js */ \"./src/layout/buttons.js\");\n/* harmony import */ var _initial_page_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initial_page.js */ \"./src/layout/initial_page.js\");\n\n\n\n\nconst showTodos = (project) => {\n    if (!project) {project = _application_logic_arrays_js__WEBPACK_IMPORTED_MODULE_0__.projectArray[0];} //default to inbox\n    clearTodoList();\n    // show project list\n    const todoHeader = document.createElement(\"h2\");\n    todoHeader.textContent = \"Todos - \" + project.name;\n    _initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.appendChild(todoHeader);\n    \n    const todos = (0,_application_logic_arrays_js__WEBPACK_IMPORTED_MODULE_0__.getTodos)(project);\n\n    todos.forEach(todo => {\n        const todoDiv = document.createElement(\"div\");\n        todoDiv.classList.add(\"todo\");\n        todoDiv.textContent = todo.name;\n\n        const btnDiv = document.createElement(\"div\");\n        btnDiv.classList.add(\"buttons\");\n        (0,_buttons_js__WEBPACK_IMPORTED_MODULE_1__.createRenameBtn)(btnDiv, \"todo\", todo);\n        (0,_buttons_js__WEBPACK_IMPORTED_MODULE_1__.createDeleteBtn)(btnDiv, \"todo\", todo);\n        todoDiv.appendChild(btnDiv);\n        todoDiv.addEventListener(\"mouseover\", () => {btnDiv.classList.add(\"active\")});\n        todoDiv.addEventListener(\"mouseout\", () => {btnDiv.classList.remove(\"active\")});\n\n        _initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.appendChild(todoDiv);\n    });\n\n    (0,_buttons_js__WEBPACK_IMPORTED_MODULE_1__.createNewItemBtn)(_initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea,\"todo\",project);\n    \n}\n\nconst clearTodoList = () => {\n    //clear displayed todo Area\n    if (_initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea && _initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.childNodes.length > 0) {\n        while (_initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.firstChild) {\n            _initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.removeChild(_initial_page_js__WEBPACK_IMPORTED_MODULE_2__.initialPage.todoArea.lastChild);\n          }\n    }\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/layout/todos_view.js?");

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