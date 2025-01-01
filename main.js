document.addEventListener("DOMContentLoaded", () => {
    const create = document.getElementById("create");
    const tasks = document.querySelector(".tasks");
    const themeToggler = document.querySelector(".theme");
    const addButton = document.querySelector(".add-item");
    const quantity = document.querySelector(".quantity");
    const myNavList = document.querySelector('.nav-list');
    const navList = document.querySelectorAll(".nav-list-item");
    const clearTasks = document.querySelector(".clearAll");


    quantity.innerHTML = tasks.children.length;


	themeToggler.onclick = themeChanger;
	addButton.onclick = addTasks;
	tasks.onclick = tasksManipulate;
    clearTasks.onclick = clearAll;

    function themeChanger() {
        const body = document.querySelector("body");
        body.classList.toggle("light-theme");

        if (!body.classList.contains('light-theme')){
            body.removeAttribute('class');
        }
        if (themeToggler.innerHTML === `<img src="images/icon-sun.svg">`) {
            themeToggler.innerHTML = `<img src="images/icon-moon.svg">`;
        } else {
            themeToggler.innerHTML = `<img src="images/icon-sun.svg">`;
        }

    }

    function addTasks() {
        if (create.value !== "") {
            const newTask = document.createElement("li");
            newTask.innerHTML = create.value;
            tasks.appendChild(newTask);

            const span = document.createElement("span");
            span.innerHTML = `<img src="images/icon-cross.svg">`;
            newTask.appendChild(span);

            quantity.innerHTML = tasks.children.length;
        } else {
            alert("You should add a task first");
        }
        create.value = "";
    }

    function tasksManipulate(e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            if (e.target.classList.contains("checked")) {
                const clearTask = document.querySelector(".clear");
                clearTask.addEventListener("click", () => {
                    e.target.remove();
                    quantity.innerHTML = tasks.children.length;
                });
            } else{
                return false;
            }
        } else if (e.target.tagName === "IMG") {
            e.target.parentElement.parentElement.remove();
            quantity.innerHTML = tasks.children.length;
        }
    } 

    function clearAll() {
        tasks.replaceChildren("");
        quantity.innerHTML = tasks.children.length;
    }

   
    navList.forEach(function(mov) {
        mov.addEventListener("click", handler);
    })

    function handler(e) {
        
        navList.forEach(list => {
            if (list === e.target) {
                list.classList.add("checked");
            } else {
                list.classList.remove("checked");
            }  
            
        })

        // filtering functionallity
        let taskLists = tasks.querySelectorAll("li");
        taskLists.forEach((taskList) => {
            if (taskList.classList.contains('checked')) {
                taskList.setAttribute('data-category', 'completed')
            } else {
                taskList.setAttribute("data-category", "active");
            }
        });

        let filter = e.target.getAttribute("data-filter");
        filterList(filter);

        function filterList (listFilter) {
            taskLists.forEach(taskList => {
                const listCategory = taskList.getAttribute('data-category');

                if (listFilter === 'all' || listFilter === listCategory) {
                    taskList.removeAttribute("hidden");
                    quantity.innerHTML = tasks.children.length;
                } else {
                    taskList.setAttribute('hidden', '');
                    quantity.innerHTML = tasks.children.length;
                }
            })

        }
    }
    

    
})