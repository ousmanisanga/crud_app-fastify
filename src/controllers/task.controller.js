const Task = require("../models/task.model");
const Project = require("../models/project.model");
const User = require("../models/user.model")
async function createTask(request, reply){
    try {
        const projectId = await Project.findById(request.body.projectId)

        if (!projectId) {
            reply().status(404).send({message: "ID project is invalid"})
        }

        const task = new Task(request.body)
        await task.save()
        reply.send(task)
    } catch (error) {
        reply.status(400).send(error)
    }
}

async function getAllTask(request, reply){
    try {
        const tasks = await Task.find().populate({
            path: 'projectId',
            select: 'title description startDate endDate teamMembers',
            populate: {
                path: 'projectManager',
                model: 'User', // Assurez-vous que c'est le bon nom de modèle
                select: 'firstName lastName email role' // Sélectionnez les champs que vous souhaitez inclure
            }
        });
        reply.send(tasks) 
    } catch (error) {
        reply.status(400).send(error)
    }
}

async function updateTask(request, reply){
    try {
        const projectId = await Project.findById(request.body.projectId);
        if (!projectId) {
            reply.stutus(404).send({message: "Invalid ID project"})
        }

        const taskId = request.params.id
        const updates = request.body

        const updateTask = await Task.findByIdAndUpdate(taskId, updates, {new:true})
        if (!updateTask) {
            reply.status(404).send({message: "Invalid task"})
        }

        reply.send(updateTask)


    } catch (error) {
        reply.status(400).send(error)
    }
}

async function getTaskById(request, reply){
    

    try {
        const taskId = request.params.id
        const task = await Task.findById(taskId);
        reply.send(task)
    } catch (error) {
        reply.status(400).send(error)
    }
}

async function deleteTask(request, reply){
    try {
        const deleteTask = await Task.findByIdAndDelete(request.params.id)
        if (!deleteTask) {
            reply.status(404).send({message: "No task with that ID found"})
        }
        reply.send("")
    } catch (error) {
        reply.status(400).send(error)
    }
}


module.exports = {createTask, getAllTask, updateTask, getTaskById,deleteTask}