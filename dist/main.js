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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _projects_logic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects_logic.js */ \"./src/projects_logic.js\");\n/* harmony import */ var _projects_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects_view.js */ \"./src/projects_view.js\");\n// factory for todos\nconst todo = (title, project) => {\n// todo properties: title, description, dueDate, priority, project, complete?\n    if (project) {\n        project.type === \"project\" ? \n                    project : \n                    project = \"inbox\"; \n                    //TODO needs to point to inbox project\n    }\n    const complete = false;\n    const description = \"\";\n    const dueDate = null;\n    const priority = 4;\n    return {title, project, complete, description, dueDate, priority}\n}\n\n;\n //TODO move views here\n\nconsole.log(\"x\");\n\nconst initialPage = (() => {\n    const container = document.querySelector(\"#content\");\n\n    //header\n    const header = document.createElement(\"div\");\n    header.classList.add(\"header\");\n    header.textContent = \"Todo system\";\n    container.appendChild(header);\n\n    //project list\n    const projectArea = document.createElement(\"div\");\n    projectArea.classList.add(\"projectlist\");\n    container.appendChild(projectArea);\n\n    return {projectArea}\n})();\n\nconst showProjects = () => {\n    clearProjectList();\n    // show project list\n    initialPage.projectArea.textContent = \"Projects\";\n    _projects_logic_js__WEBPACK_IMPORTED_MODULE_0__.projectList.projects.forEach(project => {\n        const projectDiv = document.createElement(\"div\");\n        projectDiv.textContent = project.name;\n        \n        if (project.name !== \"inbox\") {\n            //rename btn\n            const projectRenameBtn = document.createElement(\"span\");\n            projectRenameBtn.classList.add(\"icon\");\n            projectRenameBtn.textContent = \"✎\";\n            projectRenameBtn.addEventListener(\"click\", () => {(0,_projects_logic_js__WEBPACK_IMPORTED_MODULE_0__.renameProject)(project)});\n            projectDiv.appendChild(projectRenameBtn);\n\n            //delete btn\n            const projectDeleteBtn = document.createElement(\"span\");\n            projectDeleteBtn.classList.add(\"icon\");\n            projectDeleteBtn.textContent = \"❌\";\n            projectDeleteBtn.addEventListener(\"click\", () => {(0,_projects_logic_js__WEBPACK_IMPORTED_MODULE_0__.deleteProject)(project)});\n            projectDiv.appendChild(projectDeleteBtn);\n        }\n\n        initialPage.projectArea.appendChild(projectDiv);\n    });\n    const newProjectBtn = document.createElement(\"button\");\n    newProjectBtn.textContent = \"new project\";\n    newProjectBtn.addEventListener(\"click\", () => {(0,_projects_logic_js__WEBPACK_IMPORTED_MODULE_0__.createProject)()});\n    initialPage.projectArea.appendChild(newProjectBtn);\n    \n}\n\nconst clearProjectList = () => {\n    //clear displayed project Area\n    initialPage.projectArea.childNodes.forEach(child => {child.remove()});\n}\n\nshowProjects();\n\n// separate logic from DOM\n// store in localstorage\n// use date-fns to handle duedate\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/projects_logic.js":
/*!*******************************!*\
  !*** ./src/projects_logic.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectList\": () => (/* binding */ projectList),\n/* harmony export */   \"createProject\": () => (/* binding */ createProject),\n/* harmony export */   \"deleteProject\": () => (/* binding */ deleteProject),\n/* harmony export */   \"renameProject\": () => (/* binding */ renameProject)\n/* harmony export */ });\n// factory for projects\nconst project = (name) => {\n    const proto = {\n        type: \"project\"\n    }\n    return Object.assign(Object.create(proto), {name})\n}\n\n// projects , list, create, delete, rename\nconst projectList = (() => {\n    const projects = [];\n    // default project: inbox\n    projects.push(project(\"inbox\"));\n    return {projects}\n})();\n\n//create project\nconst createProject = () => {\n    const name = prompt(\"What is the title of the new project?\");\n    if (name) {\n        const newProject = project(name);\n        projectList.projects.push(newProject);\n        showProjects();\n    }\n}\n\nconst deleteProject = (project) => {\n    if(confirm(\"really remove \" + project.name + \"?\")) {\n        projectList.projects.splice(projectList.projects.indexOf(project),1);\n        showProjects();\n    }\n}\n\nconst renameProject = (project) => {\n    const newName = prompt(\"What is the new name of \" + project.name + \"?\");\n    if(newName) {\n        project.name = newName;\n        showProjects();\n    }\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/projects_logic.js?");

/***/ }),

/***/ "./src/projects_view.js":
/*!******************************!*\
  !*** ./src/projects_view.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n\n//# sourceURL=webpack://todo-list/./src/projects_view.js?");

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