import fs from 'fs/promises';
const dataBasePath = './backend/db.json';
async function readDB(){
    const db = await fs.readFile(dataBasePath);
    return JSON.parse(db);
}
async function writeDB(db){
    const newDB = JSON.stringify(db, null, 2);
    await fs.writeFile(dataBasePath, newDB)
}

async function getTasks(){
    const dataBase = await readDB();
    const {tasks} = dataBase;
    return tasks;
}


async function addTask(newTask){
    let tasks = await getTasks();
    tasks.push(newTask);
    await writeDB({tasks})
}
async function updateToInprogress(taskId, assigned){
    let tasks = await getTasks();
    let newTaks = tasks.map(task => {
        if(task.id == taskId){
            return {
                ...task,
                assigned:assigned,
                status: 'inprogress'
            }
        } 
        return task
    })
    await writeDB({tasks:newTaks})
    return newTaks;
}
async function updateToDone(taskId){
    let tasks = await getTasks();
    let newTaks = tasks.map(task => {
        if(task.id == taskId){
            return {
                ...task,
                status: 'done'
            }
        } 
        return task
    })
    await writeDB({tasks:newTaks})
    return newTaks;
}
async function removeDone(taskId){
    let tasks = await getTasks();
    let newTaks = tasks.filter(task => task.id != taskId)
    await writeDB({tasks:newTaks})
    return newTaks;
}
export {getTasks, addTask,updateToInprogress,updateToDone,removeDone}