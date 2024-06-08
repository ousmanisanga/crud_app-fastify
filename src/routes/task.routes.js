const taskController = require("../controllers/task.controller")


async function routes(fastify, options){
    fastify.get("/", taskController.getAllTask);
    fastify.post("/", taskController.createTask);
    fastify.get("/:id", taskController.getTaskById);
    fastify.put("/:id", taskController.updateTask);
    fastify.delete("/:id", taskController.deleteTask);
}


module.exports = routes;