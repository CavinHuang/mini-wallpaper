"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const typeorm_1 = require("typeorm");
/*
 * @Author: Horace
 * @Date: 2019-08-30 14:21:12
 * @Last Modified by: Horace
 * @Last Modified time: 2019-08-30 14:21:12
 */
class Pagination {
    // @IsNotEmpty()
    // @ApiModelProperty({ description: "页码", type: "number", example: 1 })
    pageNum;
    // @IsNotEmpty()
    // @ApiModelProperty({ description: "一页显示条数", type: "number", example: 10 })
    pageSize;
    // @ApiModelProperty({ description: "总页数", type: "number", example: 10 })
    totalPage;
    // @ApiModelProperty({ description: "总条数", type: "number", example: 10 })
    total;
    // @ApiModelProperty({ description: "数据" })
    rows;
    limit;
    offset;
    get _pageNum() {
        return this.pageNum;
    }
    set _pageNum(param) {
        if (param <= 0) {
            param = 1;
        }
        // if (param > this._totalPage) {
        //     param = this._totalPage;
        // }
        this.pageNum = param;
    }
    get _pageSize() {
        return this.pageSize;
    }
    set _pageSize(param) {
        this.pageSize = param;
    }
    get _total() {
        return this.total;
    }
    set _total(param) {
        this.total = param;
    }
    // @ApiModelProperty({ description: "总页数", type: "number", example: 10 })
    get _totalPage() {
        return this.totalPage;
    }
    set _totalPage(param) {
        this.totalPage = param;
    }
    /**
     * queryBuilder分页查询
     * @param pageHelper
     * @param pageHelper.getRayMany 是否需要实体之外的参数
     * @param queryBuilder
     */
    static async findByPage(queryBuilder, pageHelper, resultHandler) {
        if (!pageHelper) {
            pageHelper = {};
        }
        const pagination = new Pagination();
        if (pageHelper.getRayMany) {
            if (queryBuilder.getSql().includes('GROUP BY')) {
                const sql = queryBuilder.getSql();
                const selectFields = sql.slice(sql.indexOf('SELECT ') + 7, sql.indexOf(' FROM'));
                const countSql = sql.replace(selectFields, '1');
                const execSql = sql.includes('ORDER BY') ? countSql.substring(0, countSql.indexOf('ORDER BY')) : countSql;
                const params = Object.values(queryBuilder.getParameters());
                const _params = [];
                params.forEach((item) => {
                    if (Array.isArray(item)) {
                        _params.push(...item);
                    }
                    else {
                        _params.push(item);
                    }
                });
                pagination._total = +(await (0, typeorm_1.getManager)().query(`select count(1) as cnt from (${execSql.toString()}) a`, _params))[0].cnt;
            }
            else {
                pagination._total = await queryBuilder.getCount();
            }
            pagination._pageSize = pageHelper.pageSize && pageHelper.pageSize > 0 ? +pageHelper.pageSize : 10;
            pagination._totalPage = Math.ceil(pagination._total / pagination._pageSize);
        }
        const pageNum = pageHelper.pageNum && pageHelper.pageNum > 0 ? +pageHelper.pageNum : 1;
        if (pageHelper.getRayMany) {
            pagination._pageNum = pageNum < pagination._totalPage ? +pageNum : +pagination._totalPage;
            const _limit = pageHelper.limit ? pageHelper.limit : pagination._pageSize;
            const _offset = pageHelper.offset ? pageHelper.offset : Number((pagination._pageNum - 1) * pagination._pageSize);
            pagination.offset = _offset;
            pagination.limit = _limit;
            queryBuilder.limit(_limit);
            queryBuilder.offset(_offset);
            const rows = await queryBuilder.getRawMany();
            pagination.rows = rows;
        }
        else {
            pagination._pageSize = pageHelper.pageSize && pageHelper.pageSize > 0 ? +pageHelper.pageSize : 10;
            const _limit = pageHelper.limit ? pageHelper.limit : pageHelper.pageSize;
            const _offset = pageHelper.offset ? pageHelper.offset : Number((pageNum - 1) * pageHelper.pageSize);
            pagination.offset = _offset;
            pagination.limit = _limit;
            queryBuilder.skip(_offset);
            queryBuilder.take(_limit);
            console.log(queryBuilder.getSql());
            const [list, count] = await queryBuilder.getManyAndCount();
            pagination._total = count;
            console.log("🚀 ~ file: Pagination.ts ~ line 127 ~ Pagination ~ count", count);
            pagination._totalPage = Math.ceil(pagination._total / pagination._pageSize);
            pagination.rows = list;
            pagination._pageNum = pageNum < pagination._totalPage ? +pageNum : +pagination._totalPage;
        }
        pagination.rows = resultHandler ? resultHandler(pagination.rows) : pagination.rows;
        return pagination;
    }
    /**
     * 原生SQL分页
     * @param sql    sql语句
     * @param entityManager
     * @param parameters    查询参数
     * @param pageHelper    分页参数
     */
    static async findByPageNativeSql(sql, entityManager, parameters, pageHelper) {
        pageHelper = !pageHelper ? {} : pageHelper;
        parameters = !parameters ? [] : parameters;
        const pagination = new Pagination();
        /** SELECT 在SQL中的位置 */
        let selectIndex = sql.indexOf('SELECT');
        selectIndex = selectIndex === -1 ? sql.indexOf('select') : selectIndex;
        /** FROM 在SQL中的位置 */
        let fromIndex = sql.indexOf('FROM');
        fromIndex = fromIndex === -1 ? sql.indexOf('from') : fromIndex;
        // 判断SQL中是否包含 SELECT/FROM
        if (selectIndex === -1 || fromIndex === -1) {
            throw new TypeError('sql is invalid!');
        }
        if (sql.includes('GROUP BY') || sql.includes('group by')) {
            // 分组查询计数
            /** 去掉子查询中多余的排序 */
            const subSelect = sql.includes('ORDER BY') ? sql.substring(0, sql.indexOf('ORDER BY')) : sql;
            pagination._total = +(await (0, typeorm_1.getManager)().query(`select count(1) as 'cnt' from (${subSelect}) a`, parameters.splice(sql.split('?').length - 1)))[0].cnt;
        }
        else {
            /** 查询的字段 */
            const selectFields = sql.slice(selectIndex + 6, fromIndex);
            /** 替换查询字段:前后必须要加空格 */
            const countSql = sql.replace(selectFields, ' count(1) as cnt ');
            pagination._total = +(await (0, typeorm_1.getManager)().query(countSql, parameters.splice(sql.split('?').length - 1)))[0].cnt;
        }
        pagination._pageSize = pageHelper.pageSize && pageHelper.pageSize > 0 ? +pageHelper.pageSize : 10;
        pagination._totalPage = Math.ceil(pagination._total / pagination._pageSize);
        const pageNum = pageHelper.pageNum && pageHelper.pageNum > 0 ? +pageHelper.pageNum : 1;
        pagination._pageNum = pageNum < pagination._totalPage ? +pageNum : +pagination._totalPage;
        // SQL添加分页参数
        sql = sql + ' limit ' + (pagination._pageNum - 1) * pagination._pageSize + ',' + pagination._pageSize;
        pagination.rows = await entityManager.query(sql, parameters);
        return pagination;
    }
}
exports.Pagination = Pagination;
