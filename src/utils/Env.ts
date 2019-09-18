import * as doenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
const setEnv = function() {
    let path: string = '';
    if (!env) {
        path = '.env.development';
    } else {
        path = `.env.${env}`;
    }
    doenv.config({
        path
    });
};
export default setEnv();
