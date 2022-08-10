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
      if (!$list[$item[$pidName]][$childrenname]) $list[$item[$pidName]][$childrenname] = []
      $list[$item[$pidName]][$childrenname].push($list[$item[$keyName]]);
    } else {
      $tree.push($list[$item[$keyName]]);
    }
  })
  return $tree;
}


/**
 * 分级排序
 * @param $data
 * @param int $pid
 * @param string $field
 * @param string $pk
 * @param string $html
 * @param int $level
 * @param bool $clear
 * @return array
 */
export function sortListTier($data = [], $pid = 0, $field = 'pid', $pk = 'id', $html = '|-----', $level = 1, $clear = true)
{
    let $list = [];
    if ($clear) $list = [];
    function handler($data = [], $pid = 0, $field = 'pid', $pk = 'id', $html = '|-----', $level = 1, $clear = true) {
      $data.forEach(($res, $k) => {
        console.log($k, $res, $field, $res[$field], $pid)
        if ($res[$field] == $pid) {
          $res['html'] = $html.repeat($level);
          $list.push($res);
          delete $data[$k]
          handler($data, $res[$pk], $field, $pk, $html, $level + 1, false);
        }
      })
    }
    handler($data, $pid, $field, $pk, $html, $level, $clear)
    return $list;
}