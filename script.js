let tasks = [];
window.onload=function()
{
    let saved=localStorage.getItem("tasks");
    if (saved)
    {
        tasks=JSON.parse(saved);
        displayTasks();
    }
};
function save()
{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function addtask()
{   let input=document.getElementById("taskinput");
    let text=input.value.trim();
    if (text===""){ 
        window.alert("Enter a task to add");
        return;}
    tasks.push({text:text});
    input.value="";
    save();
    displayTasks();
}
function displayTasks()
{
    let list = document.getElementById("tasklist");
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span id="view-${index}">${task.text}</span>
            <input type="text" id="editinput-${index}" class="editinput" value="${task.text}" style="display:none;">
            <div class="actions">
                <button class="editbtn" id="btn-${index}" onclick="makeedit(${index})">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="deletebtn" onclick="deleteit(${index})">
                <i class="fa-solid fa-trash"></i>
                </button>
                 <button id="completedbtn" onclick="markcompleted(${index})">🟢</button>

                
            </div>`;
        list.appendChild(li);
    });
}
function deleteit(index)
{
    tasks.splice(index, 1);
    save();
    displayTasks();
}
function makeedit(index)
{
    let view = document.getElementById(`view-${index}`);
    let editinput = document.getElementById(`editinput-${index}`);
    let editbtn = document.getElementById(`btn-${index}`);
    if (editinput.style.display==="none")
    {  editinput.style.display="block";
       view.style.display="none";
       editbtn.innerHTML='<i class="fa-solid fa-floppy-disk"></i>';
    }
    else
    {
    let newtext=editinput.value.trim();
        if (newtext=="")
        {window.alert("Task cannot be empty");
        }
        else
        {   tasks[index].text = newtext;
            save();
            displayTasks();
        }
    }
}
function markcompleted(index)
{
let span=document.querySelectorAll("#tasklist span")[index];
span.classList.toggle("completed");
}
