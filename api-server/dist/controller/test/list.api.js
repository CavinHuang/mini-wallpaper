"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreController_1 = require("../CoreController");
class Test extends CoreController_1.CoreController {
    method = 'get';
    handle() {
        return {
            a: 11,
            b: 22
        };
    }
}
exports.default = Test;
