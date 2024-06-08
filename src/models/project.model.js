const mongoose = require("mongoose")
const User = require("./user.model")
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },

    startDate: {
        type: Date,
        required: true,

    },
    endDate: {
        type: Date,
        required: true
    },

    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
        validate: {
            validator: async function(v){
                const user = await User.findById(v);
                return ["Admin", "Project Manager"].includes(user.role);
            },
            message: (props) =>
            `Le rôle utilisateur doit être soit 'Admin' ou 'Project Manager' ` 

        },

    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]


})


const Project = mongoose.model("Project" , ProjectSchema)

module.exports = Project;