import 'reflect-metadata';
import express from 'express';
import Router from './Router';
import cors from 'cors';
import nunjucks from 'nunjucks';

export default class Application {
    constructor() {
        this.app = express();
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());

        this.assets();
        this.tepmlate();

        this.routes();

        this.app.use(new Router());

        return this.app
    }

    routes() {
       
    }

    assets() {
        this.app.use(express.static('public'))
        this.app.use(express.static('resources/views'))
    }

    tepmlate() {
        nunjucks.configure('resources/views', {
            autoescape: true,
            express: this.app
        })
    }
}

