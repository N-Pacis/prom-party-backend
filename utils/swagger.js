import swaggerDocs from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    openapi: "2.0.0",
    definition: {
        components: { },
        info: {
            title: "PROM Party King and Queen Automation",
            description:
                "Made with ❤️ by Nkubito Pacis & Mutegetsi Prince",
            version: "1.0.0",
        },
        consumes: ["application/x-www-form-urlencoded", "application/json", "multipart/form-data"],
        produces: ["application/json"],
        basePath: "/",
    },
    apis: ["./routes/*.js"],
};

const swaggerJsdoc = swaggerDocs(options);

const _swaggerJsdoc = swaggerJsdoc;
export { _swaggerJsdoc as swaggerJsdoc };
const _swaggerUi = swaggerUi;
export { _swaggerUi as swaggerUi };
