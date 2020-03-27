import "reflect-metadata";

export const route = (path, methods = "get") => {
    return (target, propertyKey) => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }
        
        const routes = Reflect.getMetadata('routes', target.constructor)
    
        routes.push({
            path,
            methods,
            propertyKey
        })
    }
}