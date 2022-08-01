(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/easy-upload/easy-upload"],{

/***/ 389:
/*!**********************************************************************************!*\
  !*** F:/test/mini-wallpaper/mini-program/components/easy-upload/easy-upload.vue ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _easy_upload_vue_vue_type_template_id_da093e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./easy-upload.vue?vue&type=template&id=da093e44&scoped=true& */ 390);
/* harmony import */ var _easy_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./easy-upload.vue?vue&type=script&lang=js& */ 392);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _easy_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _easy_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _easy_upload_vue_vue_type_style_index_0_id_da093e44_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./easy-upload.vue?vue&type=style&index=0&id=da093e44&scoped=true&lang=css& */ 395);
/* harmony import */ var _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _easy_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _easy_upload_vue_vue_type_template_id_da093e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _easy_upload_vue_vue_type_template_id_da093e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "da093e44",
  null,
  false,
  _easy_upload_vue_vue_type_template_id_da093e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/easy-upload/easy-upload.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 390:
/*!*****************************************************************************************************************************!*\
  !*** F:/test/mini-wallpaper/mini-program/components/easy-upload/easy-upload.vue?vue&type=template&id=da093e44&scoped=true& ***!
  \*****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_template_id_da093e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./easy-upload.vue?vue&type=template&id=da093e44&scoped=true& */ 391);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_template_id_da093e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_template_id_da093e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_template_id_da093e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_template_id_da093e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 391:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test/mini-wallpaper/mini-program/components/easy-upload/easy-upload.vue?vue&type=template&id=da093e44&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 392:
/*!***********************************************************************************************************!*\
  !*** F:/test/mini-wallpaper/mini-program/components/easy-upload/easy-upload.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./easy-upload.vue?vue&type=script&lang=js& */ 393);
/* harmony import */ var _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 393:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test/mini-wallpaper/mini-program/components/easy-upload/easy-upload.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 28));






































var _icon = _interopRequireDefault(__webpack_require__(/*! ./icon/icon.png */ 394));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default2 =
{
  props: {
    /**
            * 选择上传类型 image | video
            */
    types: {
      type: String,
      default: 'image' },

    /**
                           * 是否选择完立即上传
                           */
    isImmediate: {
      type: Boolean,
      default: false },

    /**
                         * 图片/视频数据展示
                         */
    dataList: {
      type: Array,
      default: function _default() {
        return [];
      } },

    /**
            * 上传文件的接口
            */
    uploadUrl: {
      type: String,
      default: '' },

    /**
                      * 删除的接口
                      */
    deleteUrl: {
      type: String,
      default: '' },

    /**
                      * 图标地址
                      */
    iconSource: {
      type: String,
      default: _icon.default },

    /**
                                 * 上传数量限制
                                 */
    uploadMaxCount: {
      type: Number,
      default: 1 },

    /**
                     * 上传图片大小限制
                     */
    uploadMaxSize: {
      type: Number,
      default: 3 },

    /**
                     * 点击图片是否可以预览
                     */
    previewImage: {
      type: Boolean,
      default: true },

    /**
                        * 请求中其他额外的参数
                        */
    formData: {
      type: Object,
      default: function _default() {} },

    /**
                                          * 是否显示加载中
                                          */
    isShowLoading: {
      type: Boolean,
      default: true },

    /**
                        * 是否清空
                        */
    uploadfiles: {
      type: Number,
      default: 1 },

    uploadType: {
      type: String,
      default: 'default' },

    qiniuBasePath: {
      type: String,
      default: '' } },


  data: function data() {
    return {
      filesLen: 0,
      files: [],
      exceeded_list: [],
      resFails: [] };

  },

  computed: {
    isDefaultSlot: function isDefaultSlot() {
      return Boolean(this.$slots.default);
    } },

  watch: {
    dataList: {
      handler: function handler(val) {
        this.files = val.map(function (item) {
          return {
            source: item,
            type: 'original' };

        });
      },
      immediate: true } },


  methods: {
    onPreviewImage: function onPreviewImage(source) {
      if (!this.previewImage) return;
      uni.previewImage({
        current: source,
        urls: this.files.map(function (item) {return item.source;}) });

    },
    chooseUploads: function chooseUploads() {var _this = this;
      if (this.uploadMaxCount - this.files.length === 0) {
        uni.showModal({
          content: '最多只能上传' + this.uploadMaxCount + '个文件' });

        return;
      };
      switch (this.types) {
        case 'image':
          uni.chooseImage({
            count: this.uploadMaxCount - this.files.length,
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], //从相册选择
            success: function () {var _success = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(res) {var i;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        _this.filesLen = res.tempFiles.length;

                        i = 0;case 2:if (!(i < res.tempFiles.length)) {_context.next = 22;break;}if (!(
                        Math.ceil(res.tempFiles[i].size / 1024) < _this.uploadMaxSize * 1024)) {_context.next = 7;break;}
                        _this.files.push({
                          source: res.tempFiles[i].path,
                          type: 'process' });_context.next = 11;break;case 7:


                        _this.exceeded_list.push(i + 1);
                        _this.filesLen = _this.filesLen - 1;




                        uni.showModal({
                          content: "\u7B2C".concat(_toConsumableArray(new Set(_this.exceeded_list)).join(','), "\u5F20\u56FE\u7247\u8D85\u51FA\u9650\u5236").concat(_this.uploadMaxSize, "MB,\u5DF2\u8FC7\u6EE4") });return _context.abrupt("continue", 19);case 11:if (!





                        _this.isImmediate) {_context.next = 19;break;}if (!(
                        _this.uploadType === 'qiniu')) {_context.next = 17;break;}_context.next = 15;return (
                          _this.qiniuUpload(res.tempFiles[i].path, i));case 15:_context.next = 19;break;case 17:_context.next = 19;return (

                          _this.uploads(res.tempFiles[i].path, i));case 19:i++;_context.next = 2;break;case 22:case "end":return _context.stop();}}}, _callee);}));function success(_x) {return _success.apply(this, arguments);}return success;}() });





          break;
        case 'video':
          uni.chooseVideo({
            sourceType: ['camera', 'album'],
            success: function () {var _success2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(res) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!(
                        Math.ceil(res.size / 1024) < _this.uploadMaxSize * 1024)) {_context2.next = 8;break;}
                        _this.files.push({
                          source: res.tempFilePath,
                          type: 'process' });if (!

                        _this.isImmediate) {_context2.next = 6;break;}
                        _this.filesLen = 1;_context2.next = 6;return (
                          _this.uploads(res.tempFilePath));case 6:_context2.next = 9;break;case 8:






                        uni.showModal({
                          content: "\u60A8\u9009\u62E9\u7684\u89C6\u9891\u8D85\u51FA".concat(_this.uploadMaxSize, "MB,\u5DF2\u8FC7\u6EE4"),
                          showCancel: false });case 9:case "end":return _context2.stop();}}}, _callee2);}));function success(_x2) {return _success2.apply(this, arguments);}return success;}() });





          break;}

    },
    delFiles: function delFiles(index) {

      //还未上传的文件
      if (this.files[index].type === 'process') {
        this.files.splice(index, 1);
        this.filesLen = this.filesLen - 1;
        //return;
      };

      this.$emit('onDelSuccess', {
        data: '',
        index: index });

    },

    qiniuUpload: function qiniuUpload(img, i) {var _this2 = this;
      return new Promise(function (resolve, reject) {
        uni.request({
          url: _this2.configs.webUrl + '/api/index/qiniu/token',
          data: {
            appid: _this2.configs.appId },

          success: function success(res) {
            console.log(res);

            var key = new Date().getTime();
            uni.uploadFile({
              url: "https://up-z2.qiniup.com",
              filePath: img,
              name: 'file',
              method: "POST",
              formData: {
                'key': (_this2.qiniuBasePath ? _this2.qiniuBasePath + '/' : '') + key, //key值
                'token': res.data.data //七牛云token值
              },
              success: function success(uploadFileRes) {
                //uploadFileRes 返回了data是一个json字符串 
                //拿到里面的key拼接上域名，再反出去就ok了
                var strToObj = JSON.parse(uploadFileRes.data);
                console.log("uploadFileRes", strToObj);
                _this2.resFails.push(strToObj.key);
                if (_this2.filesLen === i + 1) {
                  _this2.$emit("onUploadSuccess", _this2.resFails);
                  _this2.resFails = [];
                };
                uni.hideLoading();
                resolve('');
              },
              fail: function fail(_fail) {
                console.log(_fail);




                uni.showModal({
                  content: "\u60A8\u4E0A\u4F20\u7684\u6587\u4EF6\u7B2C".concat(i + 1, "\u4E2A\u5931\u8D25"),
                  showCancel: false });


                uni.showToast({
                  title: "网络错误",
                  icon: "none" });

                // data.fail(fail); //反出去错误信息
                uni.hideLoading();
              } });

          } });

      });
    },

    uploads: function uploads(filePath) {var _this3 = this;var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (this.isShowLoading) {
        uni.showLoading({
          title: '上传中' });

      };
      //按顺序上传
      return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve) {var _yield$uni$uploadFile, _yield$uni$uploadFile2, err, res, dataas;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                    uni.uploadFile({
                      url: _this3.uploadUrl,
                      filePath: filePath,
                      name: 'file',
                      formData: _this3.formData }));case 2:_yield$uni$uploadFile = _context3.sent;_yield$uni$uploadFile2 = _slicedToArray(_yield$uni$uploadFile, 2);err = _yield$uni$uploadFile2[0];res = _yield$uni$uploadFile2[1];

                  if (err) {




                    uni.showModal({
                      content: "\u60A8\u4E0A\u4F20\u7684\u6587\u4EF6\u7B2C".concat(i + 1, "\u4E2A\u5931\u8D25"),
                      showCancel: false });


                  };
                  dataas = JSON.parse(res.data);
                  console.log(dataas.data.url);
                  _this3.resFails.push(dataas.data.url);
                  if (_this3.filesLen === i + 1) {
                    _this3.$emit("onUploadSuccess", _this3.resFails);
                    _this3.resFails = [];
                  };
                  uni.hideLoading();
                  resolve('');case 15:case "end":return _context3.stop();}}}, _callee3);}));return function (_x3) {return _ref.apply(this, arguments);};}());

    },
    requestFile: function requestFile() {var _this4 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var uploadFails, i;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (
                _this4.uploadUrl) {_context4.next = 3;break;}
                console.error('请填写上传接口');return _context4.abrupt("return");case 3:

                ;
                uploadFails = _this4.files.filter(function (item) {return item.type === 'process';});
                _this4.filesLen = uploadFails.length;
                i = 0;case 7:if (!(i < uploadFails.length)) {_context4.next = 13;break;}_context4.next = 10;return (
                  _this4.uploads(uploadFails[i].source, i));case 10:i++;_context4.next = 7;break;case 13:case "end":return _context4.stop();}}}, _callee4);}))();

    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 395:
/*!*******************************************************************************************************************************************!*\
  !*** F:/test/mini-wallpaper/mini-program/components/easy-upload/easy-upload.vue?vue&type=style&index=0&id=da093e44&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_style_index_0_id_da093e44_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./easy-upload.vue?vue&type=style&index=0&id=da093e44&scoped=true&lang=css& */ 396);
/* harmony import */ var _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_style_index_0_id_da093e44_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_style_index_0_id_da093e44_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_style_index_0_id_da093e44_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_style_index_0_id_da093e44_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_programs_HBuilderX_3_1_22_20210709_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_easy_upload_vue_vue_type_style_index_0_id_da093e44_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 396:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test/mini-wallpaper/mini-program/components/easy-upload/easy-upload.vue?vue&type=style&index=0&id=da093e44&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/easy-upload/easy-upload.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/easy-upload/easy-upload-create-component',
    {
        'components/easy-upload/easy-upload-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(389))
        })
    },
    [['components/easy-upload/easy-upload-create-component']]
]);
