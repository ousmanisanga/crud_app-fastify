const projectController = require("../controllers/project.controller");


async function routes(fastify, options){
    fastify.get("/", projectController.getAllProject)
    fastify.get("/:id", projectController.getProjectById);
    fastify.post("/", projectController.createProject);
    fastify.put("/:id", projectController.updateProject);
    fastify.delete("/:id", projectController.deleteProject);


}

module.exports = routes;