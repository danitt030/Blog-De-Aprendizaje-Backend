import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Blog de aprendizaje",
            version: "1.0.0",
            description: "API de blog de aprendizaje",
            contact:{
                name: "Daniel Tuy",
                email: "dtuy-2023313@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3002/blogDeAprendizajeBackend/v1",
            }
        ]
    },
    apis:[
        "./src/publicacion/publicacion.routes.js",
        "./src/comentarios/comentarios.routes.js",
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}