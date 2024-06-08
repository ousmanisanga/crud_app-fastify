const mongoose = require("mongoose");
const Project = require("./project.model");

const TaskSchema = new mongoose.Schema({
    title:{
        required:true,
        trim:true,
        type:String

    },
    description:{
        required:true,
        trim: true,
        type: String

    },
    status:{
        type: String,
        trim: true,
        required: true

    },
    assignedTo:{
        type:String,
        trim: true,
        required: true
    },

    projectId: {
        ref: "Project",
        type: mongoose.Schema.Types.ObjectId
    }
})

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;