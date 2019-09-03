import colors from 'colors';
import * as tracer from 'tracer';
const logger = tracer.colorConsole({
    filters: [
        {
            trace: [colors.magenta, colors.underline],
            debug: [colors.blue, colors.underline],
            info: [colors.green, colors.underline],
            warn: [colors.yellow, colors.underline],
            error: [colors.red, colors.underline, colors.bold]
        } 
    ]
});
export default logger
