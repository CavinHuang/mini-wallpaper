"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePaging = void 0;
/** 处理返回的分页数据 */
const handlePaging = (nowPage, pageSize, result) => {
    const obj = {};
    obj.nowPage = +nowPage;
    obj.pageSize = +pageSize;
    obj.hasMore = obj.nowPage * obj.pageSize - result.count < 0;
    obj.total = result.count;
    return { ...obj, ...result, count: undefined };
};
exports.handlePaging = handlePaging;
