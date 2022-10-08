import { EntityManager, getManager, SelectQueryBuilder } from 'typeorm'

/*
 * @Author: Horace
 * @Date: 2019-08-30 14:21:12
 * @Last Modified by: Horace
 * @Last Modified time: 2019-08-30 14:21:12
 */
export class Pagination {
  // @IsNotEmpty()
  // @ApiModelProperty({ description: "页码", type: "number", example: 1 })
  private pageNum: number
  // @IsNotEmpty()
  // @ApiModelProperty({ description: "一页显示条数", type: "number", example: 10 })
  private pageSize: number
  // @ApiModelProperty({ description: "总页数", type: "number", example: 10 })
  private totalPage: number
  // @ApiModelProperty({ description: "总条数", type: "number", example: 10 })
  private total: number
  // @ApiModelProperty({ description: "数据" })
  public rows?: any[]

  private limit: number
  private offset: number

  public get _pageNum(): number {
    return this.pageNum
  }

  public set _pageNum(param: number) {
    if (param <= 0) {
      param = 1
    }
    // if (param > this._totalPage) {
    //     param = this._totalPage;
    // }
    this.pageNum = param
  }

  public get _pageSize() {
    return this.pageSize
  }

  public set _pageSize(param: number) {
    this.pageSize = param
  }

  public get _total() {
    return this.total
  }

  public set _total(param: number) {
    this.total = param
  }

  // @ApiModelProperty({ description: "总页数", type: "number", example: 10 })
  public get _totalPage() {
    return this.totalPage
  }

  public set _totalPage(param: number) {
    this.totalPage = param
  }

  /**
   * queryBuilder分页查询
   * @param pageHelper
   * @param pageHelper.getRayMany 是否需要实体之外的参数
   * @param queryBuilder
   */
  public static async findByPage(
    queryBuilder: SelectQueryBuilder<any>,
    pageHelper?: { getRayMany?: boolean; offset?: number, limit?: number, pageNum?: number; pageSize?: number },
    resultHandler?: (res: any[]) => any[]
  ): Promise<Pagination> {
    if (!pageHelper) {
      pageHelper = {}
    }
    const pagination = new Pagination()
    if (queryBuilder.getSql().includes('GROUP BY')) {
      const sql = queryBuilder.getSql()
      const selectFields = sql.slice(sql.indexOf('SELECT ') + 7, sql.indexOf(' FROM'))
      const countSql = sql.replace(selectFields, '1')
      const execSql = sql.includes('ORDER BY') ? countSql.substring(0, countSql.indexOf('ORDER BY')) : countSql
      const params = Object.values(queryBuilder.getParameters())
      const _params = []
      params.forEach((item) => {
        if (Array.isArray(item)) {
          _params.push(...item)
        } else {
          _params.push(item)
        }
      })
      pagination._total = +(await getManager().query(`select count(1) as cnt from (${execSql.toString()}) a`, _params))[0].cnt
    } else {
      pagination._total = await queryBuilder.getCount()
    }
    pagination._pageSize = pageHelper.pageSize && pageHelper.pageSize > 0 ? +pageHelper.pageSize : 10
    pagination._totalPage = Math.ceil(pagination._total / pagination._pageSize)

    const pageNum = pageHelper.pageNum && pageHelper.pageNum > 0 ? +pageHelper.pageNum : 1
    pagination._pageNum = pageNum < pagination._totalPage ? +pageNum : +pagination._totalPage

    const _limit = pageHelper.limit ? pageHelper.limit : pagination._pageSize
    const _offset = pageHelper.offset ? pageHelper.offset : Number((pagination._pageNum - 1) * pagination._pageSize)

    pagination.offset = _offset
    pagination.limit = _limit
    queryBuilder.limit(_limit)
    queryBuilder.offset(_offset)

    const rows = pageHelper.getRayMany ? await queryBuilder.getRawMany() : await queryBuilder.getMany()

    pagination.rows = resultHandler ? resultHandler(rows) : rows

    return pagination
  }

  /**
   * 原生SQL分页
   * @param sql    sql语句
   * @param entityManager
   * @param parameters    查询参数
   * @param pageHelper    分页参数
   */
  public static async findByPageNativeSql(
    sql: string,
    entityManager: EntityManager,
    parameters?: any[],
    pageHelper?: { getRayMany?: boolean; pageNum?: number; pageSize?: number }
  ): Promise<Pagination> {
    pageHelper = !pageHelper ? {} : pageHelper
    parameters = !parameters ? [] : parameters
    const pagination = new Pagination()

    /** SELECT 在SQL中的位置 */
    let selectIndex = sql.indexOf('SELECT')
    selectIndex = selectIndex === -1 ? sql.indexOf('select') : selectIndex
    /** FROM 在SQL中的位置 */
    let fromIndex = sql.indexOf('FROM')
    fromIndex = fromIndex === -1 ? sql.indexOf('from') : fromIndex
    // 判断SQL中是否包含 SELECT/FROM
    if (selectIndex === -1 || fromIndex === -1) {
      throw new TypeError('sql is invalid!')
    }

    if (sql.includes('GROUP BY') || sql.includes('group by')) {
      // 分组查询计数
      /** 去掉子查询中多余的排序 */
      const subSelect = sql.includes('ORDER BY') ? sql.substring(0, sql.indexOf('ORDER BY')) : sql
      pagination._total = +(
        await getManager().query(`select count(1) as 'cnt' from (${subSelect}) a`, parameters.splice(sql.split('?').length - 1))
      )[0].cnt
    } else {
      /** 查询的字段 */
      const selectFields = sql.slice(selectIndex + 6, fromIndex)
      /** 替换查询字段:前后必须要加空格 */
      const countSql = sql.replace(selectFields, ' count(1) as cnt ')
      pagination._total = +(await getManager().query(countSql, parameters.splice(sql.split('?').length - 1)))[0].cnt
    }
    pagination._pageSize = pageHelper.pageSize && pageHelper.pageSize > 0 ? +pageHelper.pageSize : 10
    pagination._totalPage = Math.ceil(pagination._total / pagination._pageSize)
    const pageNum = pageHelper.pageNum && pageHelper.pageNum > 0 ? +pageHelper.pageNum : 1
    pagination._pageNum = pageNum < pagination._totalPage ? +pageNum : +pagination._totalPage
    // SQL添加分页参数
    sql = sql + ' limit ' + (pagination._pageNum - 1) * pagination._pageSize + ',' + pagination._pageSize
    pagination.rows = await entityManager.query(sql, parameters)
    return pagination
  }
}
