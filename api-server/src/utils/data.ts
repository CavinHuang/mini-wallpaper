/**
 * 数据处理
 */

/**
 * tree 子菜单
 * @param array $data 数据
 * @param string $childrenname 子数据名
 * @param string $keyName 数据key名
 * @param string $pidName 数据上级key名
 * @return array
 */
export function getTreeChildren($data = [], $childrenname = 'children', $keyName = 'id', $pidName = 'pid') {
  const $list = [];

  $data.forEach($value => {
    $list[$value[$keyName]] = $value
  })

  const $tree = []; //格式化好的树
  $list.forEach($item => {
    if ($list[$item[$pidName]]) {
      $list[$item[$pidName]][$childrenname].push($list[$item[$keyName]]);
    } else {
      $tree.push([$list[$item[$keyName]]]);
    }
  })
  return $tree;
}