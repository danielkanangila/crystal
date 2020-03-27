import http from 'http';

import Application from './Application';

const app = new Application();

http.createServer(app)
.listen(5000, () => {
    console.log("Server listen on port :5000")
});