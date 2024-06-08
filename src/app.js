const fastify = require("fastify")({logger: true});
const mongoose = require("mongoose");
require("dotenv").config();

// Importer mes routes
const userRoutes = require("./routes/user.routes");

const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");
const commentRoutes = require("./routes/comment.routes");



// Connexion a la db
mongoose.connect('mongodb://127.0.0.1:27017/project_database').then(() => console.log("Connected to database")).catch((e) => console.log("Error connecting to database", e));


// commencer mon server 
fastify.register(userRoutes, {prefix: '/api/v1/users' })
fastify.register(projectRoutes,{prefix: '/api/v1/projects'})
fastify.register(taskRoutes, {prefix: '/api/v1/tasks'})
fastify.register(CommentRoutes, {prfix: '/api/v1/comments'})







fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    // Server is now listening on ${address}
})

