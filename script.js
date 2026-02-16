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
function addTask()
{
    let input=document.getElementById("taskinput");
    let text=input.value;
    if (text==="") return;
    tasks.push({text:text});
    input.value="";
    save();
    displayTasks();
}
function displayTasks()
{
    let list=document.getElementById("tasklist");
    list.innerHTML="";
    tasks.forEach((task, index) => {
        let li=document.createElement("li");
        li.innerHTML=`
            <div>${task.text}</div>
            <div class="actions">
                <button class="editbtn" onclick="edit(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="deletebtn" onclick="deletet(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>`;
    list.appendChild(li);
 });
}
function edit(index)
{
    let newTaskText = prompt("Edit your task:", tasks[index].text);
    if (newTaskText!==null && newTaskText!=="")
        {
        tasks[index].text = newTaskText;
        save();
        displayTasks();
        }
}
function deletet(index)
{
    tasks.splice(index, 1);
    save();
    displayTasks();
}