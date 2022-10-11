<!-- Pro-Table 文档: https://juejin.cn/post/7094890833064755208 -->
<template>
  <!-- 查询表单 -->
  <SearchForm :search="search" :reset="reset" :searchParam="searchParam" :columns="searchColumns" v-show="isShowSearch">
  </SearchForm>
  <!-- 表格头部 操作按钮 -->
  <div class="card table">
    <div class="table-header">
      <div class="header-button-lf">
        <slot name="tableHeader" :selectedListIds="selectedListIds" :selectList="selectedList" :isSelected="isSelected"> </slot>
        <!-- <slot name="tableHeader" :ids="selectedListIds" :isSelected="isSelected"></slot> -->
      </div>
      <div class="header-button-ri" v-if="toolButton">
        <el-button :icon="Refresh" circle @click="getTableList"> </el-button>
        <el-button :icon="Printer" circle @click="printData"> </el-button>
        <el-button :icon="Operation" circle @click="openColSetting"> </el-button>
        <el-button :icon="Search" circle v-if="searchColumns.length" @click="isShowSearch = !isShowSearch"> </el-button>
      </div>
    </div>
    <!-- 表格主体 -->
    <el-table
      ref="tableRef"
      :data="tableData"
      :border="border"
      @selection-change="selectionChange"
      :row-key="getRowKeys"
      :stripe="stripe"
      :tree-props="{ children: childrenName }"
    >
      <template v-for="item in tableColumns" :key="item">
        <!-- selection || index -->
        <el-table-column
          v-if="item.type == 'selection' || item.type == 'index'"
          :type="item.type"
          :reserve-selection="item.type == 'selection'"
          :label="item.label"
          :width="item.width"
          :fixed="item.fixed"
          :align="item.align ?? 'center'"
        >
        </el-table-column>
        <!-- expand（展开查看详情，请使用作用域插槽） -->
        <el-table-column
          v-if="item.type == 'expand'"
          :type="item.type"
          :label="item.label"
          :width="item.width"
          :fixed="item.fixed"
          :align="item.align ?? 'center'"
          v-slot="scope"
        >
          <slot :name="item.type" :row="scope.row"></slot>
        </el-table-column>
        <!-- other -->
        <el-table-column
          v-if="!item.type && item.prop && item.isShow"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.prop !== 'operation'"
          :resizable="true"
          :align="item.align ?? 'center'"
          :fixed="item.fixed"
        >
          <!-- 自定义 header (使用组件渲染 tsx 语法) -->
          <template #header v-if="item.renderHeader">
            <component :is="item.renderHeader" :row="item"> </component>
          </template>
          <!-- 自定义配置每一列 slot（使用作用域插槽） -->
          <template #default="scope">
            <slot :name="item.prop" :row="scope.row">
              <!-- 图片(自带预览) -->
              <el-image
                v-if="item.image"
                :src="scope.row[item.prop!]"
                :preview-src-list="[scope.row[item.prop!]]"
                fit="cover"
                class="table-image"
                preview-teleported
              />
              <!-- tag 标签（自带格式化内容） -->
              <el-tag v-else-if="item.tag" :type="filterEnum(scope.row[item.prop!], item.enum!, item.searchProps, 'tag')">
                {{
                  item.enum?.length
                    ? filterEnum(scope.row[item.prop!], item.enum!, item.searchProps)
                    : defaultFormat(0, 0, scope.row[item.prop!])
                }}
              </el-tag>
              <!-- 文字（自带格式化内容） -->
              <span v-else>
                {{
                  item.enum?.length
                    ? filterEnum(scope.row[item.prop!], item.enum!, item.searchProps)
                    : formatValue(scope.row[item.prop!])
                }}
              </span>
            </slot>
          </template>
        </el-table-column>
      </template>
      <template #empty>
        <div class="table-empty">
          <img src="@/assets/images/notData.png" alt="notData" />
          <div>暂无数据</div>
        </div>
      </template>
    </el-table>
    <!-- 分页 -->
    <Pagination
      v-if="pagination"
      :pageable="pageable"
      :handleSizeChange="handleSizeChange"
      :handleCurrentChange="handleCurrentChange"
    ></Pagination>
    <!-- 列设置 -->
    <ColSetting v-if="toolButton" ref="colRef" :tableRef="tableRef" :colSetting="colSetting"></ColSetting>
  </div>
</template>

<script setup lang="ts" name="proTable">
import { computed, ref, watch } from 'vue'
import { useTable } from '@/hooks/useTable'
import { useSelection } from '@/hooks/useSelection'
import { Refresh, Operation, Search, Printer } from '@element-plus/icons-vue'
import { ColumnProps } from '@/components/ProTable/interface'
import { filterEnum, defaultFormat, formatValue } from '@/utils/util'
import SearchForm from '@/components/SearchForm/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import ColSetting from './components/ColSetting.vue'
import printJS from 'print-js'

// 表格 DOM 元素
const tableRef = ref()

// 是否显示搜索模块
const isShowSearch = ref<boolean>(true)

interface ProTableProps {
  columns: Partial<ColumnProps>[] // 列配置项
  requestApi: (params: any) => Promise<any> // 请求表格数据的api ==> 必传
  dataCallback?: (data: any) => any // 返回数据的回调函数，可以对数据进行处理
  pagination?: boolean // 是否需要分页组件 ==> 非必传（默认为true）
  initParam?: any // 初始化请求参数 ==> 非必传（默认为{}）
  border?: boolean // 表格是否显示边框 ==> 非必传（默认为true）
  stripe?: boolean // 是否带斑马纹表格 ==> 非必传（默认为false）
  toolButton?: boolean // 是否显示表格功能按钮 ==> 非必传（默认为true）
  childrenName?: string // 当数据存在 children 时，指定 children key 名字 ==> 非必传（默认为"children"）
  selectId?: string // 当表格可以多选时，所指定的 id ==> 非必传（默认为 id）
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  pagination: true,
  initParam: {},
  border: true,
  stripe: false,
  toolButton: true,
  childrenName: 'children',
  selectId: 'id'
})

// 表格多选 Hooks
const { selectionChange, getRowKeys, selectedList, selectedListIds, isSelected } = useSelection(props.selectId)

// 表格操作 Hooks
const { tableData, pageable, searchParam, initSearchParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
  useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback)

// 监听页面 initParam 改化，重新获取表格数据
watch(
  () => props.initParam,
  () => {
    getTableList()
  },
  { deep: true }
)

// 表格列配置项处理（添加 isShow 属性，控制显示/隐藏）
const tableColumns = computed<Partial<ColumnProps>[]>(() =>
  props.columns.map((item) => {
    return {
      ...item,
      isShow: true
    }
  })
)

// 过滤需要搜索的配置项
const searchColumns = props.columns.filter((item) => item.search)

// 设置搜索表单的默认值
searchColumns.forEach((column) => {
  if (column.initSearchParam !== undefined && column.initSearchParam !== null) {
    initSearchParam.value[column.prop!] = column.initSearchParam
  }
})

// * 列设置
const colRef = ref()
// 过滤掉不需要设置显隐的列
const colSetting = tableColumns.value.filter((item: Partial<ColumnProps>) => {
  return (
    item.type !== 'selection' &&
    item.type !== 'index' &&
    item.type !== 'expand' &&
    item.prop !== 'operation' &&
    item.isShow !== false
  )
})
const openColSetting = () => {
  colRef.value.openColSetting()
}

// 打印表格数据
const printData = () => {
  printJS({
    printable: tableData.value,
    header: '<div style="display: flex;flex-direction: column;text-align: center"><h2>用户列表</h2></div>',
    properties: colSetting.map((item: Partial<ColumnProps>) => {
      return {
        field: item.prop,
        displayName: item.label
      }
    }),
    type: 'json',
    gridHeaderStyle:
      'border: 1px solid #ebeef5;height: 45px;font-size: 14px;color: #232425;text-align: center;background-color: #fafafa;',
    gridStyle: 'border: 1px solid #ebeef5;height: 40px;font-size: 14px;color: #494b4e;text-align: center'
  })
}
// 暴露给父组件的参数和方法
defineExpose({ searchParam, tableData, refresh: getTableList })
</script>
