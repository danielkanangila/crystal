import fs from 'fs';
import path from 'path';
import Comments from 'parse-comments';

export const PROJECT_DIR = process.cwd();
export const CONTROLLERS_DIR = path.resolve(PROJECT_DIR, 'controllers');

/**
 * Read controller directory then, return an array of controller files content.
 */
export const getControllersFiles = () => {
 
    const controllers = fs.readdirSync(CONTROLLERS_DIR);
    const controllersFileContent = []

    if (controllers && controllers.length >= 0) {
        controllers.forEach(controllerFileName => {
            const content = fs.readFileSync(path.resolve(
                CONTROLLERS_DIR,
                controllerFileName
            ))
            if (content) {
                controllersFileContent.push(content.toString());
            }
        })
    }

    return controllersFileContent;
}