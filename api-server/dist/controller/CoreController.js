"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreController = void 0;
/**
 * 核心controller
 */
class CoreController {
    /**
     * 定义当前controller的路由请求方式
     */
    method = 'get';
    raw;
    ctx;
    routeFinal;
    $;
    upload = false;
    constructor() { }
    apiOptions = {
        skipPerm: true,
        parseResult: true
    };
    setApiOption(option) {
        Object.assign(this.apiOptions, option);
    }
    return(data = {}, code = 1, message = '') {
        return {
            data,
            code,
            message
        };
    }
    success(data, message = '成功', code = 0) {
        return this.return(data, code, message);
    }
    error(message = '失败', data = null, code = 1) {
        return this.return(data, code, message);
    }
}
exports.CoreController = CoreController;
