import {projectArray} from "./arrays.js";

//initiate local storage
const updateStorage = () => {
    if(!localStorage.getItem('todoSystem')) {
        // add demo data
        // myLibrary.push(new Book("The lean startup","Eric Ries",250,true));
        // myLibrary.push(new Book("The hard thing about hard things","Ben Horowitz",300,true));
    } 
    populateStorage();
}
    
const populateStorage = () => {
    localStorage.setItem("todoSystem",JSON.stringify(projectArray));
    restoreData();
}

const restoreData = () => {
    projectArray = JSON.parse(localStorage.getItem("todoSystem"),);
    // displayBooks();
}

export {updateStorage}