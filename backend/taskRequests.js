import { Router} from "express";
import {body, param, validationResult} from "express-validator";
import { getTasks, addTask,updateToInprogress,updateToDone,removeDone } from "./handledb.js";

const newTaskValidator = [
    body('task').exists().notEmpty().isString(),
    body('category').exists().notEmpty().isString()
]
const toInProgressValidator = [
    param('id').exists().notEmpty().isNumeric(),
    param('assigned').exists().notEmpty().isString()
]
const doneValidator = [
    param('id').exists().notEmpty().isNumeric()
]

const taskRouter = Router();

taskRouter.get('/', async (req,res) => {
    const tasks = await getTasks()
    res.json(tasks)
 })

 taskRouter.post('/', newTaskValidator, async (req, res) => {
    const errors = validationResult(req);
    
    if(errors.array().length>0){
        res.status(400).json({message: 'wrong format'})
    }else{
        const {task, category} = req.body;
        const newTask = {
            task,
            category,
            id:new Date().getTime(),
            status:'todo',
            assigned:null
        }
        await addTask(newTask)
        res.json(newTask)

    }
 }) 
 // /tasks/moveTo/inprogress/123321
 taskRouter.patch('/moveToInprogress/:id/:assigned',toInProgressValidator, async (req,res) => {
    const errors = validationResult(req);
    
    if(errors.array().length>0){
        res.status(400).json({message: 'wrong format'})
    }else{
        const {id,assigned} = req.params;
        const newTasks = await updateToInprogress(id, assigned)
        res.json(newTasks);
    }
 })

 taskRouter.patch('/moveToDone/:id',doneValidator, async (req,res) => {
    const errors = validationResult(req);
    
    if(errors.array().length>0){
        res.status(400).json({message: 'wrong format'})
    }else{
        const {id} = req.params;
        const newTasks = await updateToDone(id)
        res.json(newTasks);
    }
 })

 taskRouter.delete('/:id',doneValidator, async (req,res) => {
    const errors = validationResult(req);
    if(errors.array().length>0){
        res.status(400).json({message: 'wrong format'})
    }else{
        const {id} = req.params;
        const newTasks = await removeDone(id)
        res.json(newTasks);
    }
 })

 export {taskRouter}
 