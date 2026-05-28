import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { createConfigClient } from '../../lib/webpack/dev/createConfigClient.js';
const webpackConfig = {
    admin: {},
    frontStore: {}
};
function getWebpackCompiler(isAdmin) {
    const area = isAdmin ? 'admin' : 'frontStore';
    if (!webpackConfig[area].compiler) {
        webpackConfig[area].compiler = webpack(createConfigClient(isAdmin));
    }
    return webpackConfig[area].compiler;
}
function getDevMiddleware(isAdmin) {
    const area = isAdmin ? 'admin' : 'frontStore';
    if (!webpackConfig[area].devMiddleware) {
        const compiler = getWebpackCompiler(isAdmin);
        const devMiddleware = middleware(compiler, {
            serverSideRender: true,
            publicPath: isAdmin ? '/backend/' : '/',
            stats: 'none'
        });
        devMiddleware.context.logger.info = ()=>{};
        webpackConfig[area].devMiddleware = devMiddleware;
    }
    return webpackConfig[area].devMiddleware;
}
function getHotMiddleware(isAdmin) {
    const area = isAdmin ? 'admin' : 'frontStore';
    if (!webpackConfig[area].hotMiddleware) {
        const compiler = getWebpackCompiler(isAdmin);
        const hotMiddleware = webpackHotMiddleware(compiler, {
            path: isAdmin ? `/__webpack_hmr_admin` : `/__webpack_hmr_frontstore`
        });
        webpackConfig[area].hotMiddleware = hotMiddleware;
    }
    return webpackConfig[area].hotMiddleware;
}
export { getWebpackCompiler, getDevMiddleware, getHotMiddleware };
