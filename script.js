console.log('To-Do List by Jatin')

// function haburgerMenu(){
//     let hamburger = document.querySelector(".hamburger");
//     let nav = document.querySelector(".nav");
//         hamburger.addEventListener("click",()=>{
//         hamburger.classList.toggle("active");
//         nav.classList.toggle("active");
//         })
//     document.querySelectorAll(".nav-link").forEach(n =>n.addEventListener("click",()=>{
//     hamburger.classList.remove("active");
//     nav.classList.remove("active");
//     }))
// }

let taskInput = " ";
let key = String(0);
let addTask = document.querySelector(".inputBtn");
let delAll = document.querySelector(".deleteBtn")
let cardContainer = document.querySelector(".cardContainer")
// let checkbox = document.querySelector(".check")

function addingTask (){
    let taskInputValue = document.querySelector(".inptxt").value
    taskInput = taskInputValue
    localStorage.setItem(key,taskInput)
    key++
    // console.log(taskInput)    
}
function displayTask() {

    cardContainer.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        
        let key = localStorage.key(i);
        
        let value = localStorage.getItem(key);
        // Check if the task already exists
        let taskExists = document.querySelector(`[data-key="${key}"]`);
        // If the task doesn't exist, create and append it
        if (!taskExists) {
            cardContainer.innerHTML +=  
            `
            <div class="card flex j-c-c a-i-c">
            <input type="checkbox" name="" id="check" class="check">
            <p class="val">${value}</p>
            <img src="/delete.svg" alt="" class="pointer delete">
        </div>
            ` ;
            document.querySelector(".tasklist").style.display = "block"
        }
    }
    removeSingleTask()
    checkBox()

}
function checkBox(){
    let checkboxes = document.querySelectorAll(".check");
    checkboxes.forEach((checkbox, idx) => {
        checkbox.addEventListener("click", () => {
            let paragraphs = document.querySelectorAll('p');
            let key = localStorage.key(idx);
            let value = localStorage.getItem(key);
    
            paragraphs.forEach(paragraph => {
                if (paragraph.innerText === value) {
                    if (checkbox.checked) {
                        paragraph.classList.add("text-decor-strike");
                        paragraph.classList.remove("text-decor");
                        // console.log(`Checkbox is checked for ${paragraph.innerText}`);
                    } else {
                        paragraph.classList.remove("text-decor-strike");
                        paragraph.classList.add("text-decor");
                        // console.log("Checkbox is not checked");
                    }
                }
            });
        });
    });
}
function removeSingleTask(){
    for(let idx = 0; idx<localStorage.length; idx++){
        let delicon = document.querySelectorAll(".delete")
        let key = localStorage.key(idx);
        let value = localStorage.getItem(key);
        delicon[idx].addEventListener("click",()=>{
            for(let i = 0; i < localStorage.length; i++){
                let p = document.getElementsByTagName('p')[i]
                if(p.innerText == value){
                    // console.log(p.innerText)
                    localStorage.removeItem(String(key))
                    document.querySelectorAll(".card")[i].innerHTML = " "
                    document.querySelectorAll(".card")[i].outerHTML = " "
                }
            }
        })
    }
}


function deleteAll (){
    localStorage.clear()
    cardContainer.innerHTML = " "
    document.querySelector(".tasklist").style.display = "none"
    key = String(0)
}
function displayYear(){
    let yearElement = document.querySelector(".year")
    var d = new Date();
    let yearContent = yearElement.innerHTML;
    let currentYear = d.getFullYear(); 
    yearElement.innerHTML = yearContent + currentYear;
}
function main(){
    addTask.addEventListener("click", addingTask)
    delAll.addEventListener("click", deleteAll)
    addTask.addEventListener("click", displayTask)
    displayTask()
    displayYear()
}
main()