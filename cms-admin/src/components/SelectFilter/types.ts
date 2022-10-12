export interface optionsProps {
  value: string
  label: string
  icon?: string
}

export interface DataProps {
  title: string
  key: string
  multiple?: boolean // 是否为多选
  options: optionsProps[]
}
