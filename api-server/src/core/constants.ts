export const TAGS = {
  ROUTE_PREFIX: 'ROUTE_PREFIX',
  ROUTE_PATH: 'ROUTE_PATH',
  ROUTE_PARAMS: 'ROUTE_PARAMS',
  ROUTE_PARAMS_TYPE: 'design:paramtypes',
  API_CONTROLLER_OPTIONS: Symbol('API_CONTROLLER_OPTIONS'),
  API_METHOD_OPTIONS: Symbol('API_METHOD_OPTIONS'),
  RENDER_TEMPLATE: 'RENDER_TEMPLATE',
  MIDDLEWARE: Symbol('MIDDLEWARE')
}

export const ROUTE_PARAMS_SOURCE = {
  QUERY: Symbol('QUERY'),
  BODY: Symbol('BODY'),
  PARAMS: Symbol('PARAMS'),
  ALL_PARAMS: Symbol('ALL_PARAMS'),
  HEADERS: Symbol('HEADERS')
}