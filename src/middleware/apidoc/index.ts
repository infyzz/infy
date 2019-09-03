import { logger } from '../../utils';
const apidoc = require('apidoc-core');
import fs from 'fs-extra';
import path from 'path';
const defaults = {
    dest: path.join(__dirname, '../doc/'),
    template: '',
    debug: false,
    silent: false,
    simulate: false,
    parse: false, // Only parse and return the data, no file creation.
    colorize: true,
    config: './',
    verbose:false,
    apiprivate: false,
    encoding: 'utf8'
};

let app: {
    log: any;
    options:any
} = {
    log: {},
    options: {}
};

/**
 * Create the documentation
 *
 * @param  {Object} options See defaults and apidoc-core defaults for all options / `apidoc --help`
 * @returns {Mixed} true = ok, but nothing todo | false = error | Object with parsed data and project-informations.
 */
function createDoc(options:any) {

    let api;
    options ={
        ...defaults,
        ...options
    };

    // Paths.
    options.dest = path.join(options.dest, './');
    options.template = path.join(options.template, './');

    // Line-Ending.
    if (options.lineEnding) {
        if (options.lineEnding === 'CRLF')
            options.lineEnding = '\r\n'; // win32
        else if (options.lineEnding === 'CR')
            options.lineEnding = '\r'; // darwin
        else
            options.lineEnding = '\n'; // linux
    }

    // Options.
    app.options = options;

    // Logger.
    app.log = logger
    app.log.verbose = function(){

    };
    // Markdown Parser: enable / disable / use a custom parser.


    try {
        const json: {
            name: string;
            version: string;
            description: string;
            title: string;
            url: string;
            sampleUrl: string;
            forceLanguage: string;
            homepage:string;
            template: {
                withCompare: boolean;
                withGenerator: boolean;
            };
        } = {
            name: 'cms-server',
            version: '1.0.0',
            description: 'cms-server项目API文档',
            title: 'cms-server API',
            url: 'http://localhost:3100/v1',
            sampleUrl: 'http://localhost:3100/v1',
            homepage: 'http://localhost:3100/',
            forceLanguage: 'zh-cn',
            template: {
                withCompare: true,
                withGenerator: true
            }
        };
        apidoc.setGeneratorInfos({
            name: json.name,
            time: new Date(),
            url: json.homepage,
            version: json.version
        });
        apidoc.setLogger(app.log);
        apidoc.setPackageInfos(json);

        api = apidoc.parse(app.options);

        if (api === true) {
            app.log.info('Nothing to do.');
            return true;
        }
        if (api === false)
            return false;

        if (app.options.parse !== true)
            createOutputFiles(api);

        // app.log.info('Done.');

        return api;
    } catch (e) {
        // app.log.error(e.message);
        // if (e.stack)
            // app.log.debug(e.stack);
        return false;
    }
}

/**
 * Save parsed data to files
 *
 * @param {Object[]} blocks
 * @param {Object} packageInfos
 */
function createOutputFiles(api: any) {

        fs.writeFileSync(app.options.dest + './api_data.json', api.data + '\n');
}

export default createDoc
