import path from 'path';
import { getEnabledExtensions } from '../../../bin/extension/index.js';
import { CONSTANTS } from '../../../lib/helpers.js';
import { getEnabledTheme } from '../../../lib/util/getEnabledTheme.js';
export function getSrcPaths() {
    const extensions = getEnabledExtensions();
    const theme = getEnabledTheme();
    return extensions.filter((ext)=>ext.srcPath).map((ext)=>ext.srcPath).concat(!CONSTANTS.MODULESPATH.includes('node_modules') ? path.resolve(CONSTANTS.ROOTPATH, 'packages/evershop/src/') : []).concat(theme?.srcPath ? theme.srcPath : []);
}
