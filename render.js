import nunjucks from 'nunjucks';
import { PROJECT_DIR } from './utlis';
import path from "path";

export const render = (template, data = {}, status = 200) => {
    if (template) {
        const templatePath = path.resolve(PROJECT_DIR, 'resources', 'views', `${template}.html`);
        const _template = nunjucks.render(templatePath, data)
        return { data: _template, status };
    } else {
        return {
            data,
            status
        }
    }

}