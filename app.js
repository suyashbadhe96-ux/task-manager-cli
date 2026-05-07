const fs = require("fs").promises;

const command = process.argv[2];
const input = process.argv[3];

async function readTask() {
    const data = await fs.readFile("tasks.json","utf-8");
    return JSON.parse(data);
}

async function saveTask(tasks) {
    await fs.writeFile("tasks.json",JSON.stringify(tasks, null,2));
}

async function addTask(taskName) {
    const tasks = await readTask();
    const exists = tasks.some(
       task => task.toLowerCase() === taskName.toLowerCase()
    );
     if (exists) {
        console.log("Task already exists");
        return;
    }
    tasks.push(taskName);
    await saveTask(tasks);
    console.log("Task Added");
}

async function deleteTask(taskName) {
    const tasks = await readTask();
    const updatedTask = tasks.filter(task => task !== taskName);
    await saveTask(updatedTask);
    console.log("Deleted Successfully");
}

async function listTasks() {
    const tasks = await readTask();
    console.log("Your Tasks");
    tasks.forEach((task, index) => {
        console.log(`${index+1}.${task}`);
    });
}

async function main() {
    if (command === "add"){
        await addTask(input);
    }
    else if(command === "list"){
        await listTasks();
    }
    else if(command === "delete"){
        await deleteTask(input);
    }
    else{
        console.log("Invalid command");
    }   
}
main();