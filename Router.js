import express from "express";
import path from "path";
import Comments from 'parse-comments';
import { getControllersFiles, CONTROLLERS_DIR } from './utlis';

export default class Router {
    constructor() {
        this.router = express.Router()
        this.controllerArr = []
        this.parseController();
        this.map();
        return this.router;
    }

    /**
     * Create routes for each controller from method and retrieved comments 
     */
    map() {
        this.controllerArr.forEach(controller => {
            const controllerPath = path.resolve(CONTROLLERS_DIR, controller.className);
            const ctx =  require(controllerPath).default;
            const instance = new ctx;
            
            controller.routes.forEach(route => {
                this.router[route.method](route.path, (req, res) => {
                    const response = instance[route.target](req)
                    if (typeof response == "string") {
                        res.send(response)
                    } else {
                        if (response.status) {
                            const {status, ...rest} = response;
                            res.status(status).send(rest)
                        } else {
                            res.send(response)
                        }
                    }
                })
            })
        })
    }

    /**
     * Get controller files content, retreive metadata as routes, 
     * match routes with handler method in class controller. 
     */
    parseController() {
        const controllerFiles = getControllersFiles();
        const comments = new Comments();

        controllerFiles.forEach(content => {
            const parsed = comments.parse(content);
            const className = parsed[0].code.context.name;
            const routes = []
            for (let i=1; i < parsed.length; i++) {
                const route = {}
                parsed[i].tags.forEach(tag => {
                    
                    if (tag.title == 'target') route.target = tag.description;
                    else {
                        route.method = tag.title;
                        route.path = tag.description 
                    }
                })
                routes.push(route);
            }
            this.controllerArr.push({ className, routes });
        });
    }
}