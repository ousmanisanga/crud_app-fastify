const Project = require("../models/project.model");
const User = require("../models/user.model");



async function createProject(request, reply){

    try {
        // confirmer l'existance de l'ID 
        // il est valid

        const projectManager = await User.findById(request.body.projectManager)
        if(!projectManager || !["Admin", 'Project Manager'].includes(projectManager.role)){
            return reply.status(400).send({message: "Invalid project manager"});
        }
        //verifier que le team member exist
        // end envoie de la responses
        for (let memberId of request.body.teamMembers) {
            const teamMember = await User.findById(memberId);
            if (!teamMember) {
                console.log("hello")
                return reply.status(400).send({message: `Invalid teamMember: ${memberId}`})
            }
            
        }

        // Create my project

        const project = new Project(request.body);
        await project.save();
        reply.send(project);
    } catch (error) {
        reply.status(400).send(error);
    }
    
}

async function getAllProject(request , reply){
   
    try {
        const projects = await Project.find().populate("projectManager", "firstName lastName email").populate(
            "teamMembers", "firstName lastName email role"
        );
        reply.send(projects)
    } catch (error) {
        reply.status(400).send(error)
    }
}

async function getProjectById(request, reply){
    
    try {
        const project = await Project.findById(request.params.id);

        if (!project) {
            reply.status(404).send({message:  "Le projet avec cet ID n'existe pas"})
        }
        reply.send(project);
    } catch (error) {
        reply.status(400).send(error);
    }
}

async function updateProject(request, reply){

    try {
        const projectId = request.params.id;
        const updates = request.body;

        if (updates.projectManager) {
            const projectManager = await User.findById(updates.projectManager)
            if(!projectManager || !["Admin", 'Project Manager'].includes(projectManager.role)){
                return reply.status(400).send({message: "Invalid project manager"});
            }
        }
       
            //verifier que le team member exist
            // end envoie de la responses

        if (updates.teamMembers) {
            for (let memberId of updates.teamMembers) {
                const teamMember = await User.findById(memberId);
                if (!teamMember) {
                    console.log("hello")
                    return reply.status(400).send({message: `Invalid teamMember: ${memberId}`})
                }
                    
            }
        }
        
        
        const updateProject = await Project.findByIdAndUpdate(projectId, updates, {new:true})

        if (!updateProject) {
            reply.status.send({message: "No project with that ID found"});
        }
        reply.send(updateProject);
        
    } catch (error) {
        reply.status(400).send(error)
    }
   


}

async function deleteProject(request, reply){
    
    try {
        const deleteproject = await Project.findByIdAndDelete(request.params.id)
        if (!deleteproject) {
            reply.status(404).send({message: "No projet with that ID found"});
            
        }

        reply.status.send("")

    } catch (error) {
        reply.status(400).send(error)
    }
}

module.exports = {createProject, getAllProject, getProjectById, updateProject, deleteProject};