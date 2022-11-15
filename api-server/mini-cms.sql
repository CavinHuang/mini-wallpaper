/*
 Navicat Premium Data Transfer

 Source Server         : 175.178.179.97
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : 175.178.179.97:3306
 Source Schema         : mini-cms

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 15/11/2022 10:20:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_auth_menu
-- ----------------------------
DROP TABLE IF EXISTS `admin_auth_menu`;
CREATE TABLE `admin_auth_menu`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '角色菜单主键id',
  `pid` int NOT NULL DEFAULT 0 COMMENT '角色菜单上级id',
  `is_link` tinyint NOT NULL DEFAULT 0 COMMENT '标记角色菜单是否为链接',
  `hidden` tinyint NOT NULL DEFAULT 0 COMMENT '标记角色菜单是否隐藏不显示在侧边栏（1 隐藏 0 显示）',
  `no_cache` tinyint NOT NULL DEFAULT 0 COMMENT '标记角色菜单是否被缓存（1 缓存 0 不缓存）',
  `sort` mediumint NOT NULL DEFAULT 1 COMMENT '角色菜单排序',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '菜单状态',
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '最后更新时间',
  `access` tinyint NOT NULL DEFAULT 1 COMMENT '子管理员是否可用',
  `auth_type` tinyint NOT NULL DEFAULT 0 COMMENT '是否为菜单 1菜单 2功能',
  `delete_at` datetime(0) NOT NULL COMMENT '删除时间',
  `menu_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '角色菜单路由名字',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '角色菜单路由地址',
  `api_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'api接口地址',
  `methods` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '提交方式POST GET PUT DELETE',
  `params` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '[]' COMMENT '参数',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '角色菜单的图标',
  `unique_auth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '前台唯一标识',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_27cdd626ff5fc7fc6d50c3728d`(`pid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 47 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_auth_menu
-- ----------------------------
INSERT INTO `admin_auth_menu` VALUES (2, 0, 0, 0, 0, 1, 1, '2022-09-28 11:24:55.039017', '2022-11-14 14:48:04.160128', 1, 1, '2022-09-28 11:52:21', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (3, 0, 0, 0, 0, 22, 1, '2022-09-28 11:25:34.729641', '2022-11-14 07:20:24.612924', 1, 1, '2022-09-28 11:52:07', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (4, 2, 0, 0, 0, 1, 1, '2022-09-28 11:37:58.382196', '2022-11-14 07:20:25.187000', 1, 1, '2022-09-28 11:52:18', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (5, 0, 0, 0, 0, 12, 1, '2022-09-28 14:11:51.617702', '2022-11-14 15:16:13.000000', 1, 1, '0000-00-00 00:00:00', '首页', '/home/index', '', '', '[]', 'HomeFilled', 'HomeIndex');
INSERT INTO `admin_auth_menu` VALUES (6, 0, 0, 0, 0, 3, 1, '2022-09-28 14:18:28.938610', '2022-11-14 15:17:37.000000', 1, 1, '0000-00-00 00:00:00', '用户', '/user/index', '', '', '[]', 'UserFilled', 'UserIndex');
INSERT INTO `admin_auth_menu` VALUES (7, 6, 0, 0, 0, 5, 1, '2022-09-28 14:19:28.150239', '2022-11-14 15:18:57.000000', 1, 1, '0000-00-00 00:00:00', '用户列表', '/user/list', '', '', '[]', '', 'UserList');
INSERT INTO `admin_auth_menu` VALUES (8, 6, 0, 0, 0, 1, 1, '2022-09-28 14:24:06.854308', '2022-11-14 15:19:59.000000', 1, 1, '0000-00-00 00:00:00', '用户等级', '/user/list', '', '', '[]', '', 'UserLevel');
INSERT INTO `admin_auth_menu` VALUES (9, 6, 0, 0, 0, 1, 1, '2022-09-28 14:24:47.195429', '2022-11-14 15:20:19.000000', 1, 1, '0000-00-00 00:00:00', '用户组', '/user/list', '', '', '[]', '', 'UserGroup');
INSERT INTO `admin_auth_menu` VALUES (10, 0, 0, 0, 0, 1, 1, '2022-09-28 14:25:35.024684', '2022-11-14 15:21:24.000000', 1, 1, '0000-00-00 00:00:00', '应用', '/app/index', '', '', '[]', 'Platform', 'AppIndex');
INSERT INTO `admin_auth_menu` VALUES (11, 10, 0, 0, 0, 6, 1, '2022-09-28 14:26:25.497034', '2022-11-14 15:22:10.000000', 1, 1, '0000-00-00 00:00:00', '小程序', '/mini-program/list', '', '', '[]', '', 'miniProgramList');
INSERT INTO `admin_auth_menu` VALUES (12, 0, 0, 0, 0, 8, 1, '2022-09-28 14:27:38.105367', '2022-11-14 15:43:17.000000', 1, 1, '0000-00-00 00:00:00', '内容', '/content', '', '', '[]', 'Document', 'Content');
INSERT INTO `admin_auth_menu` VALUES (13, 12, 0, 0, 0, 9, 1, '2022-09-28 14:28:11.263246', '2022-11-14 15:46:57.000000', 1, 1, '0000-00-00 00:00:00', '轮播图', '/content/banner/list', '', '', '[]', '', 'bannerList');
INSERT INTO `admin_auth_menu` VALUES (14, 12, 0, 0, 0, 1, 1, '2022-09-28 14:28:50.681159', '2022-11-14 07:20:25.187000', 1, 1, '2022-10-09 14:32:52', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (15, 12, 0, 0, 0, 1, 1, '2022-09-28 14:29:46.856008', '2022-11-14 15:47:50.000000', 1, 1, '0000-00-00 00:00:00', '资源分类', '/content/category/list', '', '', '[]', '', 'categoryList');
INSERT INTO `admin_auth_menu` VALUES (16, 12, 0, 0, 0, 1, 1, '2022-09-28 14:30:21.999227', '2022-11-14 15:46:27.000000', 1, 1, '0000-00-00 00:00:00', '资源', '/resource/list', '', '', '[]', '', 'resourceList');
INSERT INTO `admin_auth_menu` VALUES (17, 12, 0, 0, 0, 1, 1, '2022-09-28 14:31:01.103313', '2022-11-14 15:48:46.000000', 1, 1, '0000-00-00 00:00:00', '标签', '/resource/tags', '', '', '[]', '', 'resourceTags');
INSERT INTO `admin_auth_menu` VALUES (18, 12, 0, 0, 0, 1, 1, '2022-09-28 14:33:13.911808', '2022-11-14 07:20:25.187000', 1, 1, '0000-00-00 00:00:00', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (19, 0, 0, 0, 0, 8, 1, '2022-09-28 14:34:23.493173', '2022-11-14 15:31:43.000000', 1, 1, '0000-00-00 00:00:00', '设置', '/setting', '', '', '[]', 'Setting', 'Setting');
INSERT INTO `admin_auth_menu` VALUES (20, 19, 0, 0, 0, 1, 1, '2022-09-28 14:35:21.167586', '2022-11-14 15:32:17.000000', 1, 1, '0000-00-00 00:00:00', '应用配置', '/setting/site', '', '', '[]', '', 'SettingSite');
INSERT INTO `admin_auth_menu` VALUES (21, 19, 0, 0, 0, 1, 1, '2022-09-28 14:36:11.258370', '2022-11-14 15:32:55.000000', 1, 1, '0000-00-00 00:00:00', '系统设置', '/setting/config', '', '', '[]', '', 'SettingConfig');
INSERT INTO `admin_auth_menu` VALUES (22, 19, 0, 0, 0, 1, 1, '2022-09-28 14:36:51.200424', '2022-11-14 15:33:19.000000', 1, 1, '0000-00-00 00:00:00', '管理权限', '/setting/system', '', '', '[]', '', 'SettingSystem');
INSERT INTO `admin_auth_menu` VALUES (23, 22, 0, 0, 0, 1, 1, '2022-09-28 14:50:02.705059', '2022-11-14 15:34:08.000000', 1, 1, '0000-00-00 00:00:00', '角色管理', '/setting/system_role', '', '', '[]', '', 'SettingSystemRole');
INSERT INTO `admin_auth_menu` VALUES (24, 22, 0, 0, 0, 1, 1, '2022-09-28 14:50:51.764111', '2022-11-14 15:34:32.000000', 1, 1, '0000-00-00 00:00:00', '管理员', '/setting/system_admin', '', '', '[]', '', 'SettingSystemAdmin');
INSERT INTO `admin_auth_menu` VALUES (25, 22, 0, 0, 0, 1, 1, '2022-09-28 14:51:32.176206', '2022-11-14 15:34:58.000000', 1, 1, '0000-00-00 00:00:00', '权限规则', '/setting/system_menus', '', '', '[]', '', 'settingSystemMenus');
INSERT INTO `admin_auth_menu` VALUES (26, 0, 0, 0, 0, 1, 1, '2022-09-28 14:53:09.417868', '2022-11-14 15:35:48.000000', 1, 1, '0000-00-00 00:00:00', '维护', '/system', '', '', '[]', 'OfficeBuilding', 'System');
INSERT INTO `admin_auth_menu` VALUES (27, 26, 0, 0, 0, 1, 1, '2022-09-28 15:25:54.596280', '2022-11-14 15:36:12.000000', 1, 1, '0000-00-00 00:00:00', '开发配置', '/system/config', '', '', '[]', '', 'SystemConfig');
INSERT INTO `admin_auth_menu` VALUES (28, 27, 0, 0, 0, 1, 1, '2022-09-28 15:26:29.952186', '2022-11-14 15:36:42.000000', 1, 1, '0000-00-00 00:00:00', '配置分类', '/system/config/develop', '', '', '[]', '', 'SystemConfigDevelop');
INSERT INTO `admin_auth_menu` VALUES (29, 28, 0, 1, 0, 1, 1, '2022-09-28 15:27:15.454200', '2022-11-14 15:41:53.000000', 1, 1, '0000-00-00 00:00:00', '配置列表', '/system/config/system_config_tab/:id', '', '', '[]', '', 'SystenDataGroupIndexChild');
INSERT INTO `admin_auth_menu` VALUES (30, 27, 0, 0, 0, 1, 1, '2022-09-28 15:28:09.811909', '2022-11-14 15:41:18.000000', 1, 1, '0000-00-00 00:00:00', '数据字典组', '/system/data_group/index', '', '', '[]', '', 'SystemDataGroupIndex');
INSERT INTO `admin_auth_menu` VALUES (31, 23, 0, 1, 0, 1, 1, '2022-09-28 15:30:47.748501', '2022-11-14 07:20:25.187000', 1, 2, '0000-00-00 00:00:00', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (32, 23, 0, 1, 0, 1, 1, '2022-09-28 15:31:54.061367', '2022-11-14 07:20:25.187000', 1, 2, '0000-00-00 00:00:00', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (33, 23, 0, 1, 0, 1, 1, '2022-09-28 15:32:29.647986', '2022-11-14 07:20:25.187000', 1, 2, '0000-00-00 00:00:00', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (34, 23, 0, 1, 0, 1, 1, '2022-09-28 15:33:04.432440', '2022-11-14 07:20:25.187000', 1, 2, '0000-00-00 00:00:00', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (35, 24, 0, 1, 0, 1, 1, '2022-09-28 15:36:55.692387', '2022-11-14 07:20:25.187000', 1, 2, '0000-00-00 00:00:00', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (36, 24, 0, 1, 0, 1, 1, '2022-09-28 15:37:38.093868', '2022-11-14 07:20:25.187000', 1, 2, '0000-00-00 00:00:00', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (37, 24, 0, 1, 0, 1, 1, '2022-09-28 15:38:16.900484', '2022-11-14 07:20:25.187000', 1, 2, '0000-00-00 00:00:00', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (38, 24, 0, 1, 0, 1, 1, '2022-09-28 15:38:46.097303', '2022-11-14 07:20:25.187000', 1, 2, '0000-00-00 00:00:00', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (39, 25, 0, 1, 0, 1, 1, '2022-09-28 15:40:47.083000', '2022-11-14 07:20:25.187000', 1, 2, '0000-00-00 00:00:00', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (40, 25, 0, 1, 0, 1, 1, '2022-09-28 15:41:18.369056', '2022-11-14 07:20:25.187000', 1, 2, '0000-00-00 00:00:00', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (41, 25, 0, 1, 0, 1, 1, '2022-09-28 15:41:56.770384', '2022-11-14 07:20:25.187000', 1, 2, '0000-00-00 00:00:00', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (42, 25, 0, 1, 0, 1, 1, '2022-09-28 15:51:48.889459', '2022-11-14 07:20:25.187000', 1, 2, '0000-00-00 00:00:00', '', '', '', '', '[]', '', '');
INSERT INTO `admin_auth_menu` VALUES (43, 30, 0, 1, 0, 1, 1, '2022-10-08 15:21:55.173410', '2022-11-14 15:42:24.000000', 1, 1, '0000-00-00 00:00:00', '数据字典', '/system/data_group/list/:id', '', '', '[]', '', 'SystemDataGroupList');
INSERT INTO `admin_auth_menu` VALUES (44, 13, 0, 1, 0, 1, 1, '2022-10-09 17:24:57.323134', '2022-11-15 08:56:43.000000', 1, 1, '0000-00-00 00:00:00', '轮播图编辑', '/content/banner/edit/:pid', '', '', '[]', '', 'bannerEdit');

-- ----------------------------
-- Table structure for admin_auth_role
-- ----------------------------
DROP TABLE IF EXISTS `admin_auth_role`;
CREATE TABLE `admin_auth_role`  (
  `status` int NOT NULL DEFAULT 1 COMMENT '状态',
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '最后更新时间',
  `delete_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名',
  `role_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色编码',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色说明',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_auth_role
-- ----------------------------
INSERT INTO `admin_auth_role` VALUES (1, '2022-09-26 17:42:04.492293', '2022-11-14 07:20:35.306710', NULL, 1, '', '', '');
INSERT INTO `admin_auth_role` VALUES (1, '2022-09-26 17:46:33.978969', '2022-11-14 07:20:35.306710', NULL, 3, '', '', '');
INSERT INTO `admin_auth_role` VALUES (1, '2022-09-29 14:43:30.277500', '2022-09-29 14:43:30.277500', NULL, 10, '', '', '');

-- ----------------------------
-- Table structure for admin_auth_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `admin_auth_role_menu`;
CREATE TABLE `admin_auth_role_menu`  (
  `role_id` int NOT NULL,
  `menu_id` int NOT NULL,
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE,
  INDEX `IDX_2d7971f2aa6e4aa8994e32d9b6`(`role_id`) USING BTREE,
  INDEX `IDX_66e48819776a90146c68879308`(`menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_auth_role_menu
-- ----------------------------
INSERT INTO `admin_auth_role_menu` VALUES (10, 5);
INSERT INTO `admin_auth_role_menu` VALUES (10, 6);
INSERT INTO `admin_auth_role_menu` VALUES (10, 7);
INSERT INTO `admin_auth_role_menu` VALUES (10, 8);
INSERT INTO `admin_auth_role_menu` VALUES (10, 9);

-- ----------------------------
-- Table structure for admin_auth_role_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_auth_role_user`;
CREATE TABLE `admin_auth_role_user`  (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE,
  INDEX `IDX_c498fe6e6b600abbf764f11dbf`(`user_id`) USING BTREE,
  INDEX `IDX_fd243d2ae7fe3b064e946363b8`(`role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_auth_role_user
-- ----------------------------
INSERT INTO `admin_auth_role_user` VALUES (13, 1);

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录密码',
  `is_super` tinyint NOT NULL COMMENT '是否是超级管理',
  `status` int NOT NULL COMMENT '状态',
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '最后更新时间',
  `last_action_user` int NOT NULL COMMENT '最后操作人',
  `delete_at` datetime(0) NOT NULL COMMENT '删除时间',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '昵称',
  `slat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '加密盐',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES (2, '1', '$2b$10$okA93BnLzBXXAjkglL.IHuXorMu39o.q47bzWXX1/Hz24yK4.CNhy', 1, 0, '2022-09-27 11:23:32.172768', '2022-11-14 07:20:49.138038', 0, '2022-09-27 11:46:15', '', '');
INSERT INTO `admin_user` VALUES (5, 'test', '$2b$10$TbJ2V/BTwFs2YfKhtAIjTOj0/NzEitumcpkvYcP0z45PeS/.TuHFS', 0, 0, '2022-09-27 15:06:40.681790', '2022-11-14 07:20:49.138038', 0, '2022-09-27 15:20:07', '', '');
INSERT INTO `admin_user` VALUES (6, 'test1', '$2b$10$ZC5zgCUsfZxmVRJzYmyE.OF.yywitrW7l7IAR2RBm/O29w2vV3uMy', 0, 0, '2022-09-27 15:14:22.791963', '2022-11-14 07:20:49.138038', 0, '2022-09-27 15:20:04', '', '');
INSERT INTO `admin_user` VALUES (13, 'admin', '$2b$10$qmvo.BKAdPzKxKrHiHwZT.Ig47MJYSWR.zGpyiD3VaYsl3uzhIIm2', 1, 0, '2022-10-13 17:29:04.512309', '2022-11-14 07:20:49.138038', 0, '0000-00-00 00:00:00', '', '');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `appid` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序appid，用于区分小程序',
  `position` varchar(900) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `cover` varchar(900) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `title` varchar(900) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `background` varchar(900) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT 1,
  `sort` int NOT NULL DEFAULT 1,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  `create_at` datetime(0) NOT NULL,
  `update_at` datetime(0) NOT NULL,
  `link` varchar(900) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner
-- ----------------------------

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `appid` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序appid，用于区分小程序',
  `sort` int NOT NULL COMMENT 'weigh',
  `pid` int NOT NULL DEFAULT 0 COMMENT 'pid',
  `status` tinyint NOT NULL DEFAULT 1,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `delete_at` datetime(0) NULL DEFAULT NULL,
  `type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'type',
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'name',
  `short_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'short name',
  `cover` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'covor',
  `keywords` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'keywords',
  `url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'keywords',
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'description',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 115 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (8, 'wx123004cdf793dff7', 56, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-15 09:32:26.000000', NULL, 'resource', '美女', '美女', 'category/content/1668475930654', '', '', '美女');
INSERT INTO `category` VALUES (9, 'wx123004cdf793dff7', 55, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-15 09:33:51.000000', NULL, 'resource', '风景', '风景', 'category/content/1668476022891', '', '', '风景');
INSERT INTO `category` VALUES (10, 'wx123004cdf793dff7', 53, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-15 09:34:13.000000', NULL, 'resource', '明星', '明星', 'category/content/1668476048415', '', '', '明星');
INSERT INTO `category` VALUES (11, 'wx123004cdf793dff7', 52, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-15 09:34:58.000000', NULL, 'resource', '动漫', '动漫', 'category/content/1668476066326', '', '', '动漫');
INSERT INTO `category` VALUES (12, 'wx123004cdf793dff7', 52, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-15 09:34:51.000000', NULL, 'resource', '游戏', '游戏', 'category/content/1668476089190', '', '', '游戏');
INSERT INTO `category` VALUES (13, 'wx123004cdf793dff7', 51, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-15 09:35:20.000000', NULL, 'resource', '星空', '星空', 'category/content/1668476117256', '', '', '星空');
INSERT INTO `category` VALUES (15, 'wx123004cdf793dff7', 50, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-15 09:36:37.000000', NULL, 'resource', '海景', '海景', 'category/content/1668476193429', '', '', '海景');
INSERT INTO `category` VALUES (16, 'wx123004cdf793dff7', 49, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-15 09:37:54.000000', NULL, 'resource', '静物', '静物', 'category/content/1668476271305', '', '', '静物');
INSERT INTO `category` VALUES (17, 'wx123004cdf793dff7', 48, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-15 09:38:21.000000', NULL, 'resource', '萌宠', '萌宠', 'category/content/1668476298794', '', '', '萌宠');
INSERT INTO `category` VALUES (18, 'wx123004cdf793dff7', 51, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-15 09:40:49.000000', NULL, 'resource', '街景', '街景', 'category/content/1668476442402', '', '', '街景');
INSERT INTO `category` VALUES (98, 'wx123004cdf793dff7', 500, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-14 07:21:14.720591', NULL, '', '', '', '', '', '', '');
INSERT INTO `category` VALUES (99, 'wx123004cdf793dff7', 497, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-14 07:21:14.720591', NULL, '', '', '', '', '', '', '');
INSERT INTO `category` VALUES (100, 'wx123004cdf793dff7', 498, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-14 07:21:14.720591', NULL, '', '', '', '', '', '', '');
INSERT INTO `category` VALUES (101, 'wx123004cdf793dff7', 499, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-14 07:21:14.720591', NULL, '', '', '', '', '', '', '');
INSERT INTO `category` VALUES (102, 'wx123004cdf793dff7', 494, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-14 07:21:14.720591', NULL, '', '', '', '', '', '', '');
INSERT INTO `category` VALUES (103, 'wx123004cdf793dff7', 495, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-14 07:21:14.720591', NULL, '', '', '', '', '', '', '');
INSERT INTO `category` VALUES (105, 'wx123004cdf793dff7', 494, 0, 1, '0000-00-00 00:00:00.000000', '2022-11-14 07:21:14.720591', NULL, '', '', '', '', '', '', '');
INSERT INTO `category` VALUES (109, 'wx123004cdf793dff7', 494, 0, 1, '2022-10-18 15:34:37.364836', '2022-11-14 07:21:14.720591', NULL, '', '', '', '', '', '', '');
INSERT INTO `category` VALUES (110, 'wx123004cdf793dff7', 501, 0, 1, '2022-10-18 15:36:58.288549', '2022-11-14 07:21:14.720591', NULL, '', '', '', '', '', '', '');
INSERT INTO `category` VALUES (111, 'wx123004cdf793dff7', 502, 0, 1, '2022-10-18 15:37:36.067095', '2022-11-14 07:21:14.720591', NULL, '', '', '', '', '', '', '');
INSERT INTO `category` VALUES (112, 'wx123004cdf793dff7', 503, 0, 1, '2022-10-18 15:38:14.447398', '2022-11-14 07:21:14.720591', NULL, '', '', '', '', '', '', '');
INSERT INTO `category` VALUES (113, 'wx123004cdf793dff7', 504, 0, 1, '2022-10-18 15:38:45.135341', '2022-11-14 07:21:14.720591', NULL, '', '', '', '', '', '', '');
INSERT INTO `category` VALUES (114, 'wx123004cdf793dff7', 1, 0, 1, '2022-10-19 09:01:35.597189', '2022-11-15 10:07:17.000000', NULL, 'resource', '通用', '通用', 'category/content/1668478029845', '', '', '通用');

-- ----------------------------
-- Table structure for content_banner
-- ----------------------------
DROP TABLE IF EXISTS `content_banner`;
CREATE TABLE `content_banner`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `appid` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序appid，用于区分小程序',
  `status` tinyint NOT NULL DEFAULT 1,
  `sort` int NOT NULL DEFAULT 1,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `delete_at` datetime(0) NULL DEFAULT NULL,
  `linkType` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'linkType',
  `position` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'banner位置',
  `cover` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'image src',
  `link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'link src',
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'title',
  `background` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'background',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of content_banner
-- ----------------------------
INSERT INTO `content_banner` VALUES (9, 'wx123004cdf793dff7', 1, 1, '2022-10-21 11:12:01.917828', '2022-11-15 09:10:45.327729', NULL, '#', 'HomeTop', 'banner/1668474156230', '#', '立即升级星荐官', '');
INSERT INTO `content_banner` VALUES (10, 'wx123004cdf793dff7', 1, 1, '2022-10-21 11:12:01.940464', '2022-11-15 09:10:45.346219', NULL, '#', 'HomeTop', 'banner/1668474170439', '#', '精美壁纸等你下载', '');
INSERT INTO `content_banner` VALUES (11, 'wx123004cdf793dff7', 1, 1, '2022-10-21 11:12:01.965569', '2022-11-15 09:10:45.363588', NULL, '#', 'HomeTop', 'banner/1668474295201', '#', '做任务获得海量金币', '');

-- ----------------------------
-- Table structure for like_log
-- ----------------------------
DROP TABLE IF EXISTS `like_log`;
CREATE TABLE `like_log`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `user_id` int NULL DEFAULT NULL,
  `resourcesId` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of like_log
-- ----------------------------

-- ----------------------------
-- Table structure for mini_program
-- ----------------------------
DROP TABLE IF EXISTS `mini_program`;
CREATE TABLE `mini_program`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `appid` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序appid，用于区分小程序',
  `status` tinyint NOT NULL DEFAULT 1,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `delete_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序名称',
  `appsecret` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序appSecret',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mini_program
-- ----------------------------
INSERT INTO `mini_program` VALUES (1, 'wxf84a60c327db82a4', 1, '2022-07-29 14:47:42.000000', '2022-11-14 07:21:34.662871', NULL, '', '');
INSERT INTO `mini_program` VALUES (2, 'wx123004cdf793dff7', 1, '2022-08-05 00:21:17.000000', '2022-11-15 09:22:42.181676', NULL, '星图部落', '423bb535f214dcfaf9a922531fbe2ec2');

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `appid` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序appid，用于区分小程序',
  `sort` int NOT NULL COMMENT '排序值',
  `is_hot` tinyint NOT NULL COMMENT '是否热门',
  `is_recommend` tinyint NOT NULL COMMENT '是否推荐',
  `author` int NOT NULL COMMENT '作者id',
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `delete_at` datetime(0) NULL DEFAULT NULL,
  `status` int NOT NULL DEFAULT 1 COMMENT '状态 1 投稿成功 2 审核通过 3 驳回',
  `like_num` int NOT NULL COMMENT '点赞数',
  `download_num` int NOT NULL COMMENT '下载数',
  `is_top` tinyint NOT NULL DEFAULT 0 COMMENT '是否被置顶',
  `type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '资源的枚举值: image/video/audio',
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'name',
  `info` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'info',
  `url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '资源的地址',
  `thumb_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '资源的缩略图地址',
  `upload_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'local' COMMENT '资源的上传方式, local/qiniu',
  `price` decimal(10, 0) NOT NULL COMMENT '资源的单价',
  `vip_price` decimal(10, 0) NOT NULL COMMENT '会员资源的单价',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 254 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES (254, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:27.138320', '2022-11-14 17:37:36.710005', NULL, 2, 0, 0, 0, 'image', '221113', '221113', 'resource/wallpaper/1668418165203;resource/wallpaper/1668418165206;resource/wallpaper/1668418165211;resource/wallpaper/1668418165213;resource/wallpaper/1668418165214;resource/wallpaper/1668418165216', 'resource/wallpaper/1668418165203', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (255, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:29.197990', '2022-11-14 17:37:36.727761', NULL, 2, 0, 0, 0, 'image', '22最近一张1112', '22最近一张1112', 'resource/wallpaper/1668418167729', 'resource/wallpaper/1668418167729', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (256, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:31.270390', '2022-11-14 17:37:36.743625', NULL, 2, 0, 0, 0, 'image', '221112', '221112', 'resource/wallpaper/1668418169799;resource/wallpaper/1668418169800;resource/wallpaper/1668418169802;resource/wallpaper/1668418169803;resource/wallpaper/1668418169804;resource/wallpaper/1668418169805', 'resource/wallpaper/1668418169799', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (257, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:33.336011', '2022-11-14 17:37:36.760001', NULL, 2, 0, 0, 0, 'image', '221111', '221111', 'resource/wallpaper/1668418171857;resource/wallpaper/1668418171859;resource/wallpaper/1668418171861;resource/wallpaper/1668418171863;resource/wallpaper/1668418171865;resource/wallpaper/1668418171866;resource/wallpaper/1668418171868;resource/wallpaper/1668418171869', 'resource/wallpaper/1668418171857', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (258, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:35.386857', '2022-11-14 17:37:36.776521', NULL, 2, 0, 0, 0, 'image', '221110', '221110', 'resource/wallpaper/1668418173922;resource/wallpaper/1668418173924;resource/wallpaper/1668418173926;resource/wallpaper/1668418173927', 'resource/wallpaper/1668418173922', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (259, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:40.000189', '2022-11-14 17:37:36.792839', NULL, 2, 0, 0, 0, 'image', '221109', '221109', 'resource/wallpaper/1668418178515;resource/wallpaper/1668418178517;resource/wallpaper/1668418178521;resource/wallpaper/1668418178524;resource/wallpaper/1668418178529;resource/wallpaper/1668418178533', 'resource/wallpaper/1668418178515', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (260, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:42.055454', '2022-11-14 17:37:36.808558', NULL, 2, 0, 0, 0, 'image', '221108', '221108', 'resource/wallpaper/1668418180589;resource/wallpaper/1668418180592;resource/wallpaper/1668418180593;resource/wallpaper/1668418180595;resource/wallpaper/1668418180596;resource/wallpaper/1668418180596', 'resource/wallpaper/1668418180589', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (261, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:44.363643', '2022-11-14 17:37:36.825990', NULL, 2, 0, 0, 0, 'image', '221107', '221107', 'resource/wallpaper/1668418182659;resource/wallpaper/1668418182660;resource/wallpaper/1668418182660;resource/wallpaper/1668418182661;resource/wallpaper/1668418182662;resource/wallpaper/1668418182662', 'resource/wallpaper/1668418182659', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (262, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:46.425811', '2022-11-14 17:37:36.842375', NULL, 2, 0, 0, 0, 'image', '22最近一张1106', '22最近一张1106', 'resource/wallpaper/1668418184956', 'resource/wallpaper/1668418184956', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (263, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:48.495417', '2022-11-14 17:37:36.858889', NULL, 2, 0, 0, 0, 'image', '221106', '221106', 'resource/wallpaper/1668418187027;resource/wallpaper/1668418187028;resource/wallpaper/1668418187029;resource/wallpaper/1668418187030;resource/wallpaper/1668418187032;resource/wallpaper/1668418187034', 'resource/wallpaper/1668418187027', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (264, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:53.129373', '2022-11-14 17:37:36.875749', NULL, 2, 0, 0, 0, 'image', '221105', '221105', 'resource/wallpaper/1668418191655;resource/wallpaper/1668418191658;resource/wallpaper/1668418191660;resource/wallpaper/1668418191662;resource/wallpaper/1668418191664;resource/wallpaper/1668418191665', 'resource/wallpaper/1668418191655', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (265, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:55.199584', '2022-11-14 17:37:36.893286', NULL, 2, 0, 0, 0, 'image', '221104', '221104', 'resource/wallpaper/1668418193729;resource/wallpaper/1668418193730;resource/wallpaper/1668418193731;resource/wallpaper/1668418193732;resource/wallpaper/1668418193733;resource/wallpaper/1668418193734;resource/wallpaper/1668418193735;resource/wallpaper/1668418193736', 'resource/wallpaper/1668418193729', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (266, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:57.262795', '2022-11-14 17:37:36.909312', NULL, 2, 0, 0, 0, 'image', '221103', '221103', 'resource/wallpaper/1668418195800;resource/wallpaper/1668418195802;resource/wallpaper/1668418195803;resource/wallpaper/1668418195804;resource/wallpaper/1668418195804;resource/wallpaper/1668418195805', 'resource/wallpaper/1668418195800', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (267, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:29:59.334540', '2022-11-14 17:37:36.926136', NULL, 2, 0, 0, 0, 'image', '221102', '221102', 'resource/wallpaper/1668418197859;resource/wallpaper/1668418197860;resource/wallpaper/1668418197862;resource/wallpaper/1668418197863;resource/wallpaper/1668418197863;resource/wallpaper/1668418197864', 'resource/wallpaper/1668418197859', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (268, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:01.384902', '2022-11-14 17:37:36.942454', NULL, 2, 0, 0, 0, 'image', '221101', '221101', 'resource/wallpaper/1668418199928;resource/wallpaper/1668418199929', 'resource/wallpaper/1668418199928', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (269, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:06.060981', '2022-11-14 17:37:36.960342', NULL, 2, 0, 0, 0, 'image', '221031', '221031', 'resource/wallpaper/1668418204588;resource/wallpaper/1668418204589;resource/wallpaper/1668418204591;resource/wallpaper/1668418204593;resource/wallpaper/1668418204597;resource/wallpaper/1668418204598', 'resource/wallpaper/1668418204588', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (270, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:08.121248', '2022-11-14 17:37:36.976678', NULL, 2, 0, 0, 0, 'image', '221030', '221030', 'resource/wallpaper/1668418206654;resource/wallpaper/1668418206655;resource/wallpaper/1668418206655;resource/wallpaper/1668418206656;resource/wallpaper/1668418206657;resource/wallpaper/1668418206658', 'resource/wallpaper/1668418206654', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (271, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:10.195857', '2022-11-14 17:37:36.993844', NULL, 2, 0, 0, 0, 'image', '221029', '221029', 'resource/wallpaper/1668418208713;resource/wallpaper/1668418208715;resource/wallpaper/1668418208716;resource/wallpaper/1668418208718;resource/wallpaper/1668418208719;resource/wallpaper/1668418208720', 'resource/wallpaper/1668418208713', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (272, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:12.266147', '2022-11-14 17:37:37.010190', NULL, 2, 0, 0, 0, 'image', '221028', '221028', 'resource/wallpaper/1668418210788;resource/wallpaper/1668418210790;resource/wallpaper/1668418210791;resource/wallpaper/1668418210792;resource/wallpaper/1668418210793;resource/wallpaper/1668418210794;resource/wallpaper/1668418210795;resource/wallpaper/1668418210796', 'resource/wallpaper/1668418210788', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (273, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:14.357579', '2022-11-14 17:37:37.029089', NULL, 2, 0, 0, 0, 'image', '221027', '221027', 'resource/wallpaper/1668418212860;resource/wallpaper/1668418212862;resource/wallpaper/1668418212867;resource/wallpaper/1668418212870;resource/wallpaper/1668418212873;resource/wallpaper/1668418212875', 'resource/wallpaper/1668418212860', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (274, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:18.978679', '2022-11-14 17:37:37.046643', NULL, 2, 0, 0, 0, 'image', '221026', '221026', 'resource/wallpaper/1668418217501;resource/wallpaper/1668418217503;resource/wallpaper/1668418217505;resource/wallpaper/1668418217508;resource/wallpaper/1668418217509;resource/wallpaper/1668418217511', 'resource/wallpaper/1668418217501', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (275, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:21.054987', '2022-11-14 17:37:37.063844', NULL, 2, 0, 0, 0, 'image', '221025', '221025', 'resource/wallpaper/1668418219579;resource/wallpaper/1668418219581;resource/wallpaper/1668418219582;resource/wallpaper/1668418219585;resource/wallpaper/1668418219586;resource/wallpaper/1668418219587;resource/wallpaper/1668418219588;resource/wallpaper/1668418219589', 'resource/wallpaper/1668418219579', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (276, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:23.120315', '2022-11-14 17:37:37.081489', NULL, 2, 0, 0, 0, 'image', '221024', '221024', 'resource/wallpaper/1668418221650;resource/wallpaper/1668418221652;resource/wallpaper/1668418221653;resource/wallpaper/1668418221654;resource/wallpaper/1668418221657;resource/wallpaper/1668418221659', 'resource/wallpaper/1668418221650', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (277, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:25.170216', '2022-11-14 17:37:37.098433', NULL, 2, 0, 0, 0, 'image', '20221023', '20221023', 'resource/wallpaper/1668418223713', 'resource/wallpaper/1668418223713', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (278, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:27.262794', '2022-11-14 17:37:37.116199', NULL, 2, 0, 0, 0, 'image', '221021', '221021', 'resource/wallpaper/1668418225770;resource/wallpaper/1668418225774;resource/wallpaper/1668418225778;resource/wallpaper/1668418225781;resource/wallpaper/1668418225783;resource/wallpaper/1668418225786;resource/wallpaper/1668418225790;resource/wallpaper/1668418225791', 'resource/wallpaper/1668418225770', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (279, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:32.130565', '2022-11-14 17:37:37.132682', NULL, 2, 0, 0, 0, 'image', '20221018', '20221018', 'resource/wallpaper/1668418230668', 'resource/wallpaper/1668418230668', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (280, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:34.182881', '2022-11-14 17:37:37.151291', NULL, 2, 0, 0, 0, 'image', '22最近一张17', '22最近一张17', 'resource/wallpaper/1668418232724', 'resource/wallpaper/1668418232724', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (281, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:36.265337', '2022-11-14 17:37:37.168053', NULL, 2, 0, 0, 0, 'image', '221017', '221017', 'resource/wallpaper/1668418234779;resource/wallpaper/1668418234781;resource/wallpaper/1668418234782;resource/wallpaper/1668418234783;resource/wallpaper/1668418234784;resource/wallpaper/1668418234785;resource/wallpaper/1668418234786;resource/wallpaper/1668418234787', 'resource/wallpaper/1668418234779', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (282, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:38.343984', '2022-11-14 17:37:37.185053', NULL, 2, 0, 0, 0, 'image', '22聊天背景16', '22聊天背景16', 'resource/wallpaper/1668418236865;resource/wallpaper/1668418236869;resource/wallpaper/1668418236873;resource/wallpaper/1668418236876;resource/wallpaper/1668418236878;resource/wallpaper/1668418236880', 'resource/wallpaper/1668418236865', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (283, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:40.411572', '2022-11-14 17:37:37.201813', NULL, 2, 0, 0, 0, 'image', '221016', '221016', 'resource/wallpaper/1668418238939;resource/wallpaper/1668418238942;resource/wallpaper/1668418238943;resource/wallpaper/1668418238945;resource/wallpaper/1668418238946;resource/wallpaper/1668418238947', 'resource/wallpaper/1668418238939', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (284, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:45.037281', '2022-11-14 17:37:37.218371', NULL, 2, 0, 0, 0, 'image', '221015', '221015', 'resource/wallpaper/1668418243569;resource/wallpaper/1668418243570;resource/wallpaper/1668418243571;resource/wallpaper/1668418243572;resource/wallpaper/1668418243573;resource/wallpaper/1668418243574', 'resource/wallpaper/1668418243569', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (285, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:47.140009', '2022-11-14 17:37:37.235463', NULL, 2, 0, 0, 0, 'image', '221014', '221014', 'resource/wallpaper/1668418245637;resource/wallpaper/1668418245638;resource/wallpaper/1668418245639;resource/wallpaper/1668418245640;resource/wallpaper/1668418245643;resource/wallpaper/1668418245644', 'resource/wallpaper/1668418245637', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (286, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:49.196876', '2022-11-14 17:37:37.252023', NULL, 2, 0, 0, 0, 'image', '2022海', '2022海', 'resource/wallpaper/1668418247727', 'resource/wallpaper/1668418247727', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (287, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:51.277853', '2022-11-14 17:37:37.268734', NULL, 2, 0, 0, 0, 'image', '221012', '221012', 'resource/wallpaper/1668418249796;resource/wallpaper/1668418249798;resource/wallpaper/1668418249799;resource/wallpaper/1668418249800;resource/wallpaper/1668418249802;resource/wallpaper/1668418249803;resource/wallpaper/1668418249805;resource/wallpaper/1668418249806', 'resource/wallpaper/1668418249796', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (288, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:53.340929', '2022-11-14 17:37:37.286248', NULL, 2, 0, 0, 0, 'image', '221011', '221011', 'resource/wallpaper/1668418251867;resource/wallpaper/1668418251870;resource/wallpaper/1668418251871;resource/wallpaper/1668418251873;resource/wallpaper/1668418251875;resource/wallpaper/1668418251877', 'resource/wallpaper/1668418251867', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (289, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:57.914641', '2022-11-14 17:37:37.302829', NULL, 2, 0, 0, 0, 'image', '221010', '221010', 'resource/wallpaper/1668418256426;resource/wallpaper/1668418256430;resource/wallpaper/1668418256433;resource/wallpaper/1668418256436;resource/wallpaper/1668418256439;resource/wallpaper/1668418256443;resource/wallpaper/1668418256447;resource/wallpaper/1668418256448', 'resource/wallpaper/1668418256426', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (290, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:30:59.958903', '2022-11-14 17:37:37.319892', NULL, 2, 0, 0, 0, 'image', '221009二赛博', '221009二赛博', 'resource/wallpaper/1668418258504;resource/wallpaper/1668418258505', 'resource/wallpaper/1668418258504', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (291, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:02.027047', '2022-11-14 17:37:37.336198', NULL, 2, 0, 0, 0, 'image', '221009', '221009', 'resource/wallpaper/1668418260548;resource/wallpaper/1668418260549;resource/wallpaper/1668418260550;resource/wallpaper/1668418260552;resource/wallpaper/1668418260553;resource/wallpaper/1668418260554;resource/wallpaper/1668418260555;resource/wallpaper/1668418260556', 'resource/wallpaper/1668418260548', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (292, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:04.109788', '2022-11-14 17:37:37.353912', NULL, 2, 0, 0, 0, 'image', '221008', '221008', 'resource/wallpaper/1668418262619', 'resource/wallpaper/1668418262619', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (293, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:06.179603', '2022-11-14 17:37:37.372356', NULL, 2, 0, 0, 0, 'image', '221007', '221007', 'resource/wallpaper/1668418264699;resource/wallpaper/1668418264701;resource/wallpaper/1668418264704;resource/wallpaper/1668418264706;resource/wallpaper/1668418264708;resource/wallpaper/1668418264709', 'resource/wallpaper/1668418264699', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (294, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:10.763653', '2022-11-14 17:37:37.388583', NULL, 2, 0, 0, 0, 'image', '221006', '221006', 'resource/wallpaper/1668418269303;resource/wallpaper/1668418269303;resource/wallpaper/1668418269304;resource/wallpaper/1668418269305;resource/wallpaper/1668418269306;resource/wallpaper/1668418269306', 'resource/wallpaper/1668418269303', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (295, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:12.830187', '2022-11-14 17:37:37.405301', NULL, 2, 0, 0, 0, 'image', '221005', '221005', 'resource/wallpaper/1668418271356;resource/wallpaper/1668418271358;resource/wallpaper/1668418271359;resource/wallpaper/1668418271360;resource/wallpaper/1668418271362;resource/wallpaper/1668418271363;resource/wallpaper/1668418271365;resource/wallpaper/1668418271366', 'resource/wallpaper/1668418271356', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (296, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:14.903681', '2022-11-14 17:37:37.424400', NULL, 2, 0, 0, 0, 'image', '221004', '221004', 'resource/wallpaper/1668418273430;resource/wallpaper/1668418273432;resource/wallpaper/1668418273433;resource/wallpaper/1668418273434;resource/wallpaper/1668418273435;resource/wallpaper/1668418273436;resource/wallpaper/1668418273437;resource/wallpaper/1668418273438', 'resource/wallpaper/1668418273430', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (297, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:16.966889', '2022-11-14 17:37:37.441057', NULL, 2, 0, 0, 0, 'image', '彩虹', '彩虹', 'resource/wallpaper/1668418275502;resource/wallpaper/1668418275503;resource/wallpaper/1668418275504;resource/wallpaper/1668418275505;resource/wallpaper/1668418275505;resource/wallpaper/1668418275506', 'resource/wallpaper/1668418275502', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (298, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:19.047162', '2022-11-14 17:37:37.460425', NULL, 2, 0, 0, 0, 'image', '黑色221003风格', '黑色221003风格', 'resource/wallpaper/1668418277560;resource/wallpaper/1668418277563;resource/wallpaper/1668418277564;resource/wallpaper/1668418277566;resource/wallpaper/1668418277567;resource/wallpaper/1668418277569;resource/wallpaper/1668418277570;resource/wallpaper/1668418277572', 'resource/wallpaper/1668418277560', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (299, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:23.579083', '2022-11-14 17:37:37.477207', NULL, 2, 0, 0, 0, 'image', '221003二', '221003二', 'resource/wallpaper/1668418282135', 'resource/wallpaper/1668418282135', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (300, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:25.629309', '2022-11-14 17:37:37.498013', NULL, 2, 0, 0, 0, 'image', '2022海洋', '2022海洋', 'resource/wallpaper/1668418284173', 'resource/wallpaper/1668418284173', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (301, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:27.724583', '2022-11-14 17:37:37.514312', NULL, 2, 0, 0, 0, 'image', '221002', '221002', 'resource/wallpaper/1668418286228;resource/wallpaper/1668418286231;resource/wallpaper/1668418286232;resource/wallpaper/1668418286233;resource/wallpaper/1668418286235;resource/wallpaper/1668418286237;resource/wallpaper/1668418286238;resource/wallpaper/1668418286239', 'resource/wallpaper/1668418286228', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (302, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:29.987438', '2022-11-14 17:37:37.532193', NULL, 2, 0, 0, 0, 'image', '221001', '221001', 'resource/wallpaper/1668418288315;resource/wallpaper/1668418288316;resource/wallpaper/1668418288317;resource/wallpaper/1668418288318;resource/wallpaper/1668418288319;resource/wallpaper/1668418288319', 'resource/wallpaper/1668418288315', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (303, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:32.275605', '2022-11-14 17:37:37.548968', NULL, 2, 0, 0, 0, 'image', '2209301', '2209301', 'resource/wallpaper/1668418290576;resource/wallpaper/1668418290577;resource/wallpaper/1668418290578;resource/wallpaper/1668418290579;resource/wallpaper/1668418290579;resource/wallpaper/1668418290580', 'resource/wallpaper/1668418290576', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (304, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:37.105922', '2022-11-14 17:37:37.566275', NULL, 2, 0, 0, 0, 'image', '220930', '220930', 'resource/wallpaper/1668418295626;resource/wallpaper/1668418295628;resource/wallpaper/1668418295631;resource/wallpaper/1668418295633;resource/wallpaper/1668418295635;resource/wallpaper/1668418295638;resource/wallpaper/1668418295640;resource/wallpaper/1668418295641', 'resource/wallpaper/1668418295626', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (305, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:39.177441', '2022-11-14 17:37:37.583993', NULL, 2, 0, 0, 0, 'image', '220929', '220929', 'resource/wallpaper/1668418297700;resource/wallpaper/1668418297702;resource/wallpaper/1668418297703;resource/wallpaper/1668418297704;resource/wallpaper/1668418297705;resource/wallpaper/1668418297706;resource/wallpaper/1668418297707;resource/wallpaper/1668418297709;resource/wallpaper/1668418297709', 'resource/wallpaper/1668418297700', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (306, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:41.261089', '2022-11-14 17:37:37.612477', NULL, 2, 0, 0, 0, 'image', '220928', '220928', 'resource/wallpaper/1668418299767;resource/wallpaper/1668418299772;resource/wallpaper/1668418299776;resource/wallpaper/1668418299778;resource/wallpaper/1668418299780;resource/wallpaper/1668418299783;resource/wallpaper/1668418299784;resource/wallpaper/1668418299786', 'resource/wallpaper/1668418299767', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (307, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:43.334411', '2022-11-14 17:37:37.628497', NULL, 2, 0, 0, 0, 'image', '220927', '220927', 'resource/wallpaper/1668418301856;resource/wallpaper/1668418301857;resource/wallpaper/1668418301859;resource/wallpaper/1668418301860;resource/wallpaper/1668418301861;resource/wallpaper/1668418301862;resource/wallpaper/1668418301863;resource/wallpaper/1668418301864', 'resource/wallpaper/1668418301856', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (308, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:45.399102', '2022-11-14 17:37:37.645150', NULL, 2, 0, 0, 0, 'image', '220926', '220926', 'resource/wallpaper/1668418303928;resource/wallpaper/1668418303930;resource/wallpaper/1668418303931;resource/wallpaper/1668418303932;resource/wallpaper/1668418303932;resource/wallpaper/1668418303933;resource/wallpaper/1668418303934;resource/wallpaper/1668418303936', 'resource/wallpaper/1668418303928', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (309, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:49.991667', '2022-11-14 17:37:37.663483', NULL, 2, 0, 0, 0, 'image', '220925', '220925', 'resource/wallpaper/1668418308515;resource/wallpaper/1668418308518;resource/wallpaper/1668418308521;resource/wallpaper/1668418308523;resource/wallpaper/1668418308524;resource/wallpaper/1668418308526', 'resource/wallpaper/1668418308515', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (310, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:52.090997', '2022-11-14 17:37:37.679946', NULL, 2, 0, 0, 0, 'image', '220924', '220924', 'resource/wallpaper/1668418310586;resource/wallpaper/1668418310590;resource/wallpaper/1668418310593;resource/wallpaper/1668418310596;resource/wallpaper/1668418310598;resource/wallpaper/1668418310600;resource/wallpaper/1668418310603;resource/wallpaper/1668418310605;resource/wallpaper/1668418310607', 'resource/wallpaper/1668418310586', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (311, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:54.154777', '2022-11-14 17:37:37.698408', NULL, 2, 0, 0, 0, 'image', '220923', '220923', 'resource/wallpaper/1668418312689;resource/wallpaper/1668418312691', 'resource/wallpaper/1668418312689', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (312, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:56.219562', '2022-11-14 17:37:37.715551', NULL, 2, 0, 0, 0, 'image', '220922', '220922', 'resource/wallpaper/1668418314743;resource/wallpaper/1668418314746;resource/wallpaper/1668418314748;resource/wallpaper/1668418314750;resource/wallpaper/1668418314751;resource/wallpaper/1668418314753', 'resource/wallpaper/1668418314743', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (313, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:31:58.287876', '2022-11-14 17:37:37.732085', NULL, 2, 0, 0, 0, 'image', '220921', '220921', 'resource/wallpaper/1668418316804;resource/wallpaper/1668418316807;resource/wallpaper/1668418316809;resource/wallpaper/1668418316812;resource/wallpaper/1668418316814;resource/wallpaper/1668418316815;resource/wallpaper/1668418316817;resource/wallpaper/1668418316818', 'resource/wallpaper/1668418316804', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (314, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:02.894749', '2022-11-14 17:37:37.748389', NULL, 2, 0, 0, 0, 'image', '220920', '220920', 'resource/wallpaper/1668418321441', 'resource/wallpaper/1668418321441', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (315, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:04.950685', '2022-11-14 17:37:37.764682', NULL, 2, 0, 0, 0, 'image', '2209192', '2209192', 'resource/wallpaper/1668418323486;resource/wallpaper/1668418323487;resource/wallpaper/1668418323488;resource/wallpaper/1668418323488;resource/wallpaper/1668418323489;resource/wallpaper/1668418323490', 'resource/wallpaper/1668418323486', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (316, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:07.013576', '2022-11-14 17:37:37.781215', NULL, 2, 0, 0, 0, 'image', '220919', '220919', 'resource/wallpaper/1668418325544;resource/wallpaper/1668418325546;resource/wallpaper/1668418325548;resource/wallpaper/1668418325549;resource/wallpaper/1668418325550;resource/wallpaper/1668418325551', 'resource/wallpaper/1668418325544', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (317, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:09.082107', '2022-11-14 17:37:37.798284', NULL, 2, 0, 0, 0, 'image', '220918', '220918', 'resource/wallpaper/1668418327614', 'resource/wallpaper/1668418327614', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (318, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:11.139912', '2022-11-14 17:37:37.814319', NULL, 2, 0, 0, 0, 'image', '220917', '220917', 'resource/wallpaper/1668418329670;resource/wallpaper/1668418329672;resource/wallpaper/1668418329672;resource/wallpaper/1668418329673;resource/wallpaper/1668418329674;resource/wallpaper/1668418329675;resource/wallpaper/1668418329676;resource/wallpaper/1668418329677', 'resource/wallpaper/1668418329670', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (319, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:15.793279', '2022-11-14 17:37:37.831745', NULL, 2, 0, 0, 0, 'image', '20220916', '20220916', 'resource/wallpaper/1668418334338', 'resource/wallpaper/1668418334338', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (320, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:17.872373', '2022-11-14 17:37:37.849345', NULL, 2, 0, 0, 0, 'image', '220915', '220915', 'resource/wallpaper/1668418336390;resource/wallpaper/1668418336392;resource/wallpaper/1668418336394;resource/wallpaper/1668418336396;resource/wallpaper/1668418336397;resource/wallpaper/1668418336399;resource/wallpaper/1668418336400;resource/wallpaper/1668418336401;resource/wallpaper/1668418336403', 'resource/wallpaper/1668418336390', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (321, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:19.955475', '2022-11-14 17:37:37.865420', NULL, 2, 0, 0, 0, 'image', '220914', '220914', 'resource/wallpaper/1668418338465;resource/wallpaper/1668418338469;resource/wallpaper/1668418338471;resource/wallpaper/1668418338473;resource/wallpaper/1668418338475;resource/wallpaper/1668418338476;resource/wallpaper/1668418338478;resource/wallpaper/1668418338480;resource/wallpaper/1668418338482;resource/wallpaper/1668418338483', 'resource/wallpaper/1668418338465', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (322, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:22.013958', '2022-11-14 17:37:37.881413', NULL, 2, 0, 0, 0, 'image', '220913', '220913', 'resource/wallpaper/1668418340549', 'resource/wallpaper/1668418340549', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (323, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:24.075642', '2022-11-14 17:37:37.898508', NULL, 2, 0, 0, 0, 'image', '220912', '220912', 'resource/wallpaper/1668418342604;resource/wallpaper/1668418342606;resource/wallpaper/1668418342608;resource/wallpaper/1668418342609;resource/wallpaper/1668418342610;resource/wallpaper/1668418342611', 'resource/wallpaper/1668418342604', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (324, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:28.617898', '2022-11-14 17:37:37.914701', NULL, 2, 0, 0, 0, 'image', '20220911', '20220911', 'resource/wallpaper/1668418347157', 'resource/wallpaper/1668418347157', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (325, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:30.696601', '2022-11-14 17:37:37.931027', NULL, 2, 0, 0, 0, 'image', '220910', '220910', 'resource/wallpaper/1668418349211;resource/wallpaper/1668418349212;resource/wallpaper/1668418349213;resource/wallpaper/1668418349214;resource/wallpaper/1668418349216;resource/wallpaper/1668418349217;resource/wallpaper/1668418349218;resource/wallpaper/1668418349218;resource/wallpaper/1668418349219;resource/wallpaper/1668418349220', 'resource/wallpaper/1668418349211', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (326, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:32.736146', '2022-11-14 17:37:37.948118', NULL, 2, 0, 0, 0, 'image', '220909', '220909', 'resource/wallpaper/1668418351286', 'resource/wallpaper/1668418351286', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (327, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:34.791747', '2022-11-14 17:37:37.964778', NULL, 2, 0, 0, 0, 'image', 'iPhone14', 'iPhone14', 'resource/wallpaper/1668418353322;resource/wallpaper/1668418353323;resource/wallpaper/1668418353324;resource/wallpaper/1668418353325;resource/wallpaper/1668418353326;resource/wallpaper/1668418353327', 'resource/wallpaper/1668418353322', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (328, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:36.848280', '2022-11-14 17:37:37.980872', NULL, 2, 0, 0, 0, 'image', '20220907', '20220907', 'resource/wallpaper/1668418355383', 'resource/wallpaper/1668418355383', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (329, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:41.391952', '2022-11-14 17:37:37.997908', NULL, 2, 0, 0, 0, 'image', '20220906', '20220906', 'resource/wallpaper/1668418359914;resource/wallpaper/1668418359915;resource/wallpaper/1668418359915;resource/wallpaper/1668418359916;resource/wallpaper/1668418359917;resource/wallpaper/1668418359918;resource/wallpaper/1668418359919;resource/wallpaper/1668418359919;resource/wallpaper/1668418359920;resource/wallpaper/1668418359921', 'resource/wallpaper/1668418359914', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (330, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:43.449494', '2022-11-14 17:37:38.014780', NULL, 2, 0, 0, 0, 'image', '220905', '220905', 'resource/wallpaper/1668418361976;resource/wallpaper/1668418361978;resource/wallpaper/1668418361979;resource/wallpaper/1668418361980;resource/wallpaper/1668418361982;resource/wallpaper/1668418361983', 'resource/wallpaper/1668418361976', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (331, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:45.524094', '2022-11-14 17:37:38.031332', NULL, 2, 0, 0, 0, 'image', '22904', '22904', 'resource/wallpaper/1668418364044;resource/wallpaper/1668418364046;resource/wallpaper/1668418364047;resource/wallpaper/1668418364048;resource/wallpaper/1668418364049;resource/wallpaper/1668418364050;resource/wallpaper/1668418364050;resource/wallpaper/1668418364051;resource/wallpaper/1668418364052;resource/wallpaper/1668418364052;resource/wallpaper/1668418364053', 'resource/wallpaper/1668418364044', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (332, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:47.585574', '2022-11-14 17:37:38.048782', NULL, 2, 0, 0, 0, 'image', '220904', '220904', 'resource/wallpaper/1668418366120', 'resource/wallpaper/1668418366120', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (333, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:49.647723', '2022-11-14 17:37:38.065338', NULL, 2, 0, 0, 0, 'image', '赛博朋克', '赛博朋克', 'resource/wallpaper/1668418368175;resource/wallpaper/1668418368177;resource/wallpaper/1668418368178;resource/wallpaper/1668418368179;resource/wallpaper/1668418368181;resource/wallpaper/1668418368182', 'resource/wallpaper/1668418368175', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (334, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:54.245097', '2022-11-14 17:37:38.081603', NULL, 2, 0, 0, 0, 'image', '22092', '22092', 'resource/wallpaper/1668418372780;resource/wallpaper/1668418372781;resource/wallpaper/1668418372782;resource/wallpaper/1668418372783;resource/wallpaper/1668418372783;resource/wallpaper/1668418372784', 'resource/wallpaper/1668418372780', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (335, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:56.309584', '2022-11-14 17:37:38.098401', NULL, 2, 0, 0, 0, 'image', '山海风光', '山海风光', 'resource/wallpaper/1668418374845', 'resource/wallpaper/1668418374845', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (336, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:32:58.385028', '2022-11-14 17:37:38.117266', NULL, 2, 0, 0, 0, 'image', '精选壁纸', '精选壁纸', 'resource/wallpaper/1668418376904;resource/wallpaper/1668418376905;resource/wallpaper/1668418376907;resource/wallpaper/1668418376908;resource/wallpaper/1668418376909;resource/wallpaper/1668418376909;resource/wallpaper/1668418376910;resource/wallpaper/1668418376911;resource/wallpaper/1668418376912;resource/wallpaper/1668418376913', 'resource/wallpaper/1668418376904', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (337, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:33:00.464198', '2022-11-14 17:37:38.134614', NULL, 2, 0, 0, 0, 'image', '黑色省电', '黑色省电', 'resource/wallpaper/1668418378973;resource/wallpaper/1668418378975;resource/wallpaper/1668418378977;resource/wallpaper/1668418378979;resource/wallpaper/1668418378982;resource/wallpaper/1668418378983;resource/wallpaper/1668418378984;resource/wallpaper/1668418378986;resource/wallpaper/1668418378987;resource/wallpaper/1668418378990', 'resource/wallpaper/1668418378973', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (338, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:33:02.524995', '2022-11-14 17:37:38.150868', NULL, 2, 0, 0, 0, 'image', '紫色浪漫', '紫色浪漫', 'resource/wallpaper/1668418381051;resource/wallpaper/1668418381054;resource/wallpaper/1668418381056;resource/wallpaper/1668418381059;resource/wallpaper/1668418381060;resource/wallpaper/1668418381062', 'resource/wallpaper/1668418381051', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (339, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:33:07.129222', '2022-11-14 17:37:38.167106', NULL, 2, 0, 0, 0, 'image', '雨', '雨', 'resource/wallpaper/1668418385654;resource/wallpaper/1668418385657;resource/wallpaper/1668418385659;resource/wallpaper/1668418385662;resource/wallpaper/1668418385664;resource/wallpaper/1668418385665', 'resource/wallpaper/1668418385654', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (340, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:33:09.211222', '2022-11-14 17:37:38.182840', NULL, 2, 0, 0, 0, 'image', '826', '826', 'resource/wallpaper/1668418387723;resource/wallpaper/1668418387725;resource/wallpaper/1668418387726;resource/wallpaper/1668418387727;resource/wallpaper/1668418387728;resource/wallpaper/1668418387729;resource/wallpaper/1668418387730;resource/wallpaper/1668418387731;resource/wallpaper/1668418387732;resource/wallpaper/1668418387733', 'resource/wallpaper/1668418387723', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (341, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:33:11.267358', '2022-11-14 17:37:38.198704', NULL, 2, 0, 0, 0, 'image', '聊天背景', '聊天背景', 'resource/wallpaper/1668418389797;resource/wallpaper/1668418389798;resource/wallpaper/1668418389800;resource/wallpaper/1668418389801;resource/wallpaper/1668418389802;resource/wallpaper/1668418389803', 'resource/wallpaper/1668418389797', 'qiniu', 0, 0);
INSERT INTO `resource` VALUES (342, 'wx123004cdf793dff7', 1, 0, 0, 0, '2022-11-14 17:33:13.321046', '2022-11-14 17:37:38.214707', NULL, 2, 0, 0, 0, 'image', '插画风', '插画风', 'resource/wallpaper/1668418391854;resource/wallpaper/1668418391857;resource/wallpaper/1668418391858;resource/wallpaper/1668418391859', 'resource/wallpaper/1668418391854', 'qiniu', 0, 0);

-- ----------------------------
-- Table structure for resource_order
-- ----------------------------
DROP TABLE IF EXISTS `resource_order`;
CREATE TABLE `resource_order`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` tinyint NOT NULL COMMENT '订单状态',
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `user_id` int NULL DEFAULT NULL,
  `resourceId` int NULL DEFAULT NULL,
  `orgin_price` decimal(10, 0) NOT NULL COMMENT '订单原始金额',
  `price` decimal(10, 0) NOT NULL COMMENT '订单现有金额',
  `discount` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单折扣',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of resource_order
-- ----------------------------

-- ----------------------------
-- Table structure for resource_with_category
-- ----------------------------
DROP TABLE IF EXISTS `resource_with_category`;
CREATE TABLE `resource_with_category`  (
  `category_id` int NOT NULL,
  `resource_id` int NOT NULL,
  PRIMARY KEY (`category_id`, `resource_id`) USING BTREE,
  INDEX `IDX_be0192bc18d7b53fd3bb34d4ac`(`category_id`) USING BTREE,
  INDEX `IDX_c20a2173fe7f846ec6a7dee04d`(`resource_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of resource_with_category
-- ----------------------------
INSERT INTO `resource_with_category` VALUES (254, 114);
INSERT INTO `resource_with_category` VALUES (255, 114);
INSERT INTO `resource_with_category` VALUES (256, 114);
INSERT INTO `resource_with_category` VALUES (257, 114);
INSERT INTO `resource_with_category` VALUES (258, 114);
INSERT INTO `resource_with_category` VALUES (259, 114);
INSERT INTO `resource_with_category` VALUES (260, 114);
INSERT INTO `resource_with_category` VALUES (261, 114);
INSERT INTO `resource_with_category` VALUES (262, 114);
INSERT INTO `resource_with_category` VALUES (263, 114);
INSERT INTO `resource_with_category` VALUES (264, 114);
INSERT INTO `resource_with_category` VALUES (265, 114);
INSERT INTO `resource_with_category` VALUES (266, 114);
INSERT INTO `resource_with_category` VALUES (267, 114);
INSERT INTO `resource_with_category` VALUES (268, 114);
INSERT INTO `resource_with_category` VALUES (269, 114);
INSERT INTO `resource_with_category` VALUES (270, 114);
INSERT INTO `resource_with_category` VALUES (271, 114);
INSERT INTO `resource_with_category` VALUES (272, 114);
INSERT INTO `resource_with_category` VALUES (273, 114);
INSERT INTO `resource_with_category` VALUES (274, 114);
INSERT INTO `resource_with_category` VALUES (275, 114);
INSERT INTO `resource_with_category` VALUES (276, 114);
INSERT INTO `resource_with_category` VALUES (277, 114);
INSERT INTO `resource_with_category` VALUES (278, 114);
INSERT INTO `resource_with_category` VALUES (279, 114);
INSERT INTO `resource_with_category` VALUES (280, 114);
INSERT INTO `resource_with_category` VALUES (281, 114);
INSERT INTO `resource_with_category` VALUES (282, 114);
INSERT INTO `resource_with_category` VALUES (283, 114);
INSERT INTO `resource_with_category` VALUES (284, 114);
INSERT INTO `resource_with_category` VALUES (285, 114);
INSERT INTO `resource_with_category` VALUES (286, 114);
INSERT INTO `resource_with_category` VALUES (287, 114);
INSERT INTO `resource_with_category` VALUES (288, 114);
INSERT INTO `resource_with_category` VALUES (289, 114);
INSERT INTO `resource_with_category` VALUES (290, 114);
INSERT INTO `resource_with_category` VALUES (291, 114);
INSERT INTO `resource_with_category` VALUES (292, 114);
INSERT INTO `resource_with_category` VALUES (293, 114);
INSERT INTO `resource_with_category` VALUES (294, 114);
INSERT INTO `resource_with_category` VALUES (295, 114);
INSERT INTO `resource_with_category` VALUES (296, 114);
INSERT INTO `resource_with_category` VALUES (297, 114);
INSERT INTO `resource_with_category` VALUES (298, 114);
INSERT INTO `resource_with_category` VALUES (299, 114);
INSERT INTO `resource_with_category` VALUES (300, 114);
INSERT INTO `resource_with_category` VALUES (301, 114);
INSERT INTO `resource_with_category` VALUES (302, 114);
INSERT INTO `resource_with_category` VALUES (303, 114);
INSERT INTO `resource_with_category` VALUES (304, 114);
INSERT INTO `resource_with_category` VALUES (305, 114);
INSERT INTO `resource_with_category` VALUES (306, 114);
INSERT INTO `resource_with_category` VALUES (307, 114);
INSERT INTO `resource_with_category` VALUES (308, 114);
INSERT INTO `resource_with_category` VALUES (309, 114);
INSERT INTO `resource_with_category` VALUES (310, 114);
INSERT INTO `resource_with_category` VALUES (311, 114);
INSERT INTO `resource_with_category` VALUES (312, 114);
INSERT INTO `resource_with_category` VALUES (313, 114);
INSERT INTO `resource_with_category` VALUES (314, 114);
INSERT INTO `resource_with_category` VALUES (315, 114);
INSERT INTO `resource_with_category` VALUES (316, 114);
INSERT INTO `resource_with_category` VALUES (317, 114);
INSERT INTO `resource_with_category` VALUES (318, 114);
INSERT INTO `resource_with_category` VALUES (319, 114);
INSERT INTO `resource_with_category` VALUES (320, 114);
INSERT INTO `resource_with_category` VALUES (321, 114);
INSERT INTO `resource_with_category` VALUES (322, 114);
INSERT INTO `resource_with_category` VALUES (323, 114);
INSERT INTO `resource_with_category` VALUES (324, 114);
INSERT INTO `resource_with_category` VALUES (325, 114);
INSERT INTO `resource_with_category` VALUES (326, 114);
INSERT INTO `resource_with_category` VALUES (327, 114);
INSERT INTO `resource_with_category` VALUES (328, 114);
INSERT INTO `resource_with_category` VALUES (329, 114);
INSERT INTO `resource_with_category` VALUES (330, 114);
INSERT INTO `resource_with_category` VALUES (331, 114);
INSERT INTO `resource_with_category` VALUES (332, 114);
INSERT INTO `resource_with_category` VALUES (333, 114);
INSERT INTO `resource_with_category` VALUES (334, 114);
INSERT INTO `resource_with_category` VALUES (335, 114);
INSERT INTO `resource_with_category` VALUES (336, 114);
INSERT INTO `resource_with_category` VALUES (337, 114);
INSERT INTO `resource_with_category` VALUES (338, 114);
INSERT INTO `resource_with_category` VALUES (339, 114);
INSERT INTO `resource_with_category` VALUES (340, 114);
INSERT INTO `resource_with_category` VALUES (341, 114);
INSERT INTO `resource_with_category` VALUES (342, 114);

-- ----------------------------
-- Table structure for resource_with_tag
-- ----------------------------
DROP TABLE IF EXISTS `resource_with_tag`;
CREATE TABLE `resource_with_tag`  (
  `tag_id` int NOT NULL,
  `resource_id` int NOT NULL,
  PRIMARY KEY (`tag_id`, `resource_id`) USING BTREE,
  INDEX `IDX_82fd84b79c93d9aeed390e1bcc`(`tag_id`) USING BTREE,
  INDEX `IDX_905d65ee32ee2e8e62e4218948`(`resource_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of resource_with_tag
-- ----------------------------
INSERT INTO `resource_with_tag` VALUES (254, 18);
INSERT INTO `resource_with_tag` VALUES (255, 18);
INSERT INTO `resource_with_tag` VALUES (256, 18);
INSERT INTO `resource_with_tag` VALUES (257, 18);
INSERT INTO `resource_with_tag` VALUES (258, 18);
INSERT INTO `resource_with_tag` VALUES (259, 18);
INSERT INTO `resource_with_tag` VALUES (260, 18);
INSERT INTO `resource_with_tag` VALUES (261, 18);
INSERT INTO `resource_with_tag` VALUES (262, 18);
INSERT INTO `resource_with_tag` VALUES (263, 18);
INSERT INTO `resource_with_tag` VALUES (264, 18);
INSERT INTO `resource_with_tag` VALUES (265, 18);
INSERT INTO `resource_with_tag` VALUES (266, 18);
INSERT INTO `resource_with_tag` VALUES (267, 18);
INSERT INTO `resource_with_tag` VALUES (268, 18);
INSERT INTO `resource_with_tag` VALUES (269, 18);
INSERT INTO `resource_with_tag` VALUES (270, 18);
INSERT INTO `resource_with_tag` VALUES (271, 18);
INSERT INTO `resource_with_tag` VALUES (272, 18);
INSERT INTO `resource_with_tag` VALUES (273, 18);
INSERT INTO `resource_with_tag` VALUES (274, 18);
INSERT INTO `resource_with_tag` VALUES (275, 18);
INSERT INTO `resource_with_tag` VALUES (276, 18);
INSERT INTO `resource_with_tag` VALUES (277, 18);
INSERT INTO `resource_with_tag` VALUES (278, 18);
INSERT INTO `resource_with_tag` VALUES (279, 18);
INSERT INTO `resource_with_tag` VALUES (280, 18);
INSERT INTO `resource_with_tag` VALUES (281, 18);
INSERT INTO `resource_with_tag` VALUES (282, 17);
INSERT INTO `resource_with_tag` VALUES (283, 18);
INSERT INTO `resource_with_tag` VALUES (284, 18);
INSERT INTO `resource_with_tag` VALUES (285, 18);
INSERT INTO `resource_with_tag` VALUES (286, 18);
INSERT INTO `resource_with_tag` VALUES (287, 18);
INSERT INTO `resource_with_tag` VALUES (288, 18);
INSERT INTO `resource_with_tag` VALUES (289, 18);
INSERT INTO `resource_with_tag` VALUES (290, 16);
INSERT INTO `resource_with_tag` VALUES (291, 18);
INSERT INTO `resource_with_tag` VALUES (292, 18);
INSERT INTO `resource_with_tag` VALUES (293, 18);
INSERT INTO `resource_with_tag` VALUES (294, 18);
INSERT INTO `resource_with_tag` VALUES (295, 18);
INSERT INTO `resource_with_tag` VALUES (296, 18);
INSERT INTO `resource_with_tag` VALUES (297, 18);
INSERT INTO `resource_with_tag` VALUES (298, 18);
INSERT INTO `resource_with_tag` VALUES (299, 18);
INSERT INTO `resource_with_tag` VALUES (300, 18);
INSERT INTO `resource_with_tag` VALUES (301, 18);
INSERT INTO `resource_with_tag` VALUES (302, 18);
INSERT INTO `resource_with_tag` VALUES (303, 18);
INSERT INTO `resource_with_tag` VALUES (304, 18);
INSERT INTO `resource_with_tag` VALUES (305, 18);
INSERT INTO `resource_with_tag` VALUES (306, 18);
INSERT INTO `resource_with_tag` VALUES (307, 18);
INSERT INTO `resource_with_tag` VALUES (308, 18);
INSERT INTO `resource_with_tag` VALUES (309, 18);
INSERT INTO `resource_with_tag` VALUES (310, 18);
INSERT INTO `resource_with_tag` VALUES (311, 18);
INSERT INTO `resource_with_tag` VALUES (312, 18);
INSERT INTO `resource_with_tag` VALUES (313, 18);
INSERT INTO `resource_with_tag` VALUES (314, 18);
INSERT INTO `resource_with_tag` VALUES (315, 18);
INSERT INTO `resource_with_tag` VALUES (316, 18);
INSERT INTO `resource_with_tag` VALUES (317, 18);
INSERT INTO `resource_with_tag` VALUES (318, 18);
INSERT INTO `resource_with_tag` VALUES (319, 18);
INSERT INTO `resource_with_tag` VALUES (320, 18);
INSERT INTO `resource_with_tag` VALUES (321, 18);
INSERT INTO `resource_with_tag` VALUES (322, 18);
INSERT INTO `resource_with_tag` VALUES (323, 18);
INSERT INTO `resource_with_tag` VALUES (324, 18);
INSERT INTO `resource_with_tag` VALUES (325, 18);
INSERT INTO `resource_with_tag` VALUES (326, 18);
INSERT INTO `resource_with_tag` VALUES (327, 18);
INSERT INTO `resource_with_tag` VALUES (328, 18);
INSERT INTO `resource_with_tag` VALUES (329, 18);
INSERT INTO `resource_with_tag` VALUES (330, 18);
INSERT INTO `resource_with_tag` VALUES (331, 18);
INSERT INTO `resource_with_tag` VALUES (332, 18);
INSERT INTO `resource_with_tag` VALUES (333, 16);
INSERT INTO `resource_with_tag` VALUES (334, 18);
INSERT INTO `resource_with_tag` VALUES (335, 18);
INSERT INTO `resource_with_tag` VALUES (336, 18);
INSERT INTO `resource_with_tag` VALUES (337, 18);
INSERT INTO `resource_with_tag` VALUES (338, 18);
INSERT INTO `resource_with_tag` VALUES (339, 18);
INSERT INTO `resource_with_tag` VALUES (340, 18);
INSERT INTO `resource_with_tag` VALUES (341, 17);
INSERT INTO `resource_with_tag` VALUES (342, 18);

-- ----------------------------
-- Table structure for site_config
-- ----------------------------
DROP TABLE IF EXISTS `site_config`;
CREATE TABLE `site_config`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `appid` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序appid，用于区分小程序',
  `create_at` datetime(0) NOT NULL,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '站点名称',
  `beian` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '备案',
  `resource_cdn_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '资源cdn(保留字段)',
  `version` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'config版本',
  `categorytype` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类配置, {key: {}}',
  `background` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '背景颜色配置',
  `mbgColor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序背景颜色配置',
  `qiniuPath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '七牛云上传path',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of site_config
-- ----------------------------
INSERT INTO `site_config` VALUES (1, 'wx123004cdf793dff7', '0000-00-00 00:00:00', '', '', '', '', '', '', '', '');

-- ----------------------------
-- Table structure for system_config
-- ----------------------------
DROP TABLE IF EXISTS `system_config`;
CREATE TABLE `system_config`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '配置分类id',
  `config_tab_id` int NOT NULL COMMENT '配置分类id',
  `upload_type` int NOT NULL COMMENT '上传文件格式1单图2多图3文件',
  `width` int NOT NULL COMMENT '多行文本框的宽度',
  `height` int NOT NULL COMMENT '多行文框的高度',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置简介',
  `sort` int NOT NULL COMMENT '排序',
  `status` int NOT NULL COMMENT '是否隐藏',
  `menu_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字段名称',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类型(文本框,单选按钮...)',
  `input_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '表单类型',
  `parameter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '规则 单选框和多选框',
  `required` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '规则',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '默认值',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_config
-- ----------------------------
INSERT INTO `system_config` VALUES (1, 2, 0, 1, 0, '站点开始|关闭（用于升级等临时关闭）', 11, 1, '', '', '', '', '', '', '');
INSERT INTO `system_config` VALUES (2, 2, 0, 100, 0, '网站名称很多地方会显示的，建议认真填写', 10, 1, '', '', '', '', '', '', '');
INSERT INTO `system_config` VALUES (3, 2, 0, 100, 0, '备案号', 12, 1, '', '', '', '', '', '', '');
INSERT INTO `system_config` VALUES (4, 2, 0, 100, 0, '网站地址', 14, 1, '', '', '', '', '', '', '');

-- ----------------------------
-- Table structure for system_config_tab
-- ----------------------------
DROP TABLE IF EXISTS `system_config_tab`;
CREATE TABLE `system_config_tab`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '配置分类id',
  `pid` int NOT NULL COMMENT '上级分类id',
  `display` tinyint NOT NULL COMMENT '配置分类是否显示',
  `type` int NOT NULL COMMENT '配置类型',
  `sort` int NOT NULL COMMENT '排序',
  `status` int NOT NULL COMMENT '配置分类状态',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置分类名称',
  `eng_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置分类英文名称',
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '图标',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_config_tab
-- ----------------------------
INSERT INTO `system_config_tab` VALUES (1, 0, 0, 1, 1, 1, '', '', '');
INSERT INTO `system_config_tab` VALUES (2, 1, 0, 1, 2, 1, '', '', '');
INSERT INTO `system_config_tab` VALUES (3, 0, 0, 1, 1, 0, '', '', '');
INSERT INTO `system_config_tab` VALUES (4, 3, 0, 1, 4, 0, '', '', '');
INSERT INTO `system_config_tab` VALUES (5, 0, 0, 0, 1, 1, '', '', '');
INSERT INTO `system_config_tab` VALUES (6, 0, 0, 0, 0, 1, '', '', '');

-- ----------------------------
-- Table structure for system_group
-- ----------------------------
DROP TABLE IF EXISTS `system_group`;
CREATE TABLE `system_group`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `cate_id` int NOT NULL COMMENT '分类id',
  `config_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '数据字段',
  `delete_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '数据组名称',
  `info` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '数据提示',
  `fields` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '数据组字段以及类型（json数据）',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_416f428bad27d1486e82227065`(`config_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_group
-- ----------------------------
INSERT INTO `system_group` VALUES (4, 0, 'banner_position', NULL, '轮播图位置', '轮播图位置', '[{\"name\":\"位置\",\"title\":\"position\",\"type\":\"input\"},{\"name\":\"说明\",\"title\":\"remark\",\"type\":\"input\"}]');
INSERT INTO `system_group` VALUES (8, 1, 'app_data', NULL, '全局数据', '全局数据', '[{\"name\":\"标题\",\"title\":\"title\",\"type\":\"input\"},{\"name\":\"标识\",\"title\":\"key\",\"type\":\"input\"},{\"name\":\"名称\",\"title\":\"label\",\"type\":\"input\"},{\"name\":\"值\",\"title\":\"value\",\"type\":\"input\"},{\"title\":\"desc\",\"name\":\"说明\",\"type\":\"input\"}]');
INSERT INTO `system_group` VALUES (9, 0, 'category_type', NULL, '分类类型', '分类类型', '[{\"name\":\"标题\",\"title\":\"title\",\"type\":\"input\"},{\"name\":\"标识\",\"title\":\"key\",\"type\":\"input\"},{\"name\":\"名称\",\"title\":\"label\",\"type\":\"input\"},{\"name\":\"说明\",\"title\":\"desc\",\"type\":\"input\"}]');
INSERT INTO `system_group` VALUES (10, 0, 'tag_type', NULL, '标签类型', '标签类型', '[{\"name\":\"名称\",\"title\":\"title\",\"type\":\"input\"},{\"name\":\"标识\",\"title\":\"key\",\"type\":\"input\"},{\"name\":\"显示名称\",\"title\":\"label\",\"type\":\"input\"},{\"name\":\"说明\",\"title\":\"desc\",\"type\":\"input\"}]');

-- ----------------------------
-- Table structure for system_group_data
-- ----------------------------
DROP TABLE IF EXISTS `system_group_data`;
CREATE TABLE `system_group_data`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `gid` int NOT NULL COMMENT '对应的数据组id',
  `add_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '添加数据时间',
  `sort` int NOT NULL COMMENT '数据排序',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态（1：开启；2：关闭；）',
  `delete_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '数据组对应的数据值（json数据）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_group_data
-- ----------------------------
INSERT INTO `system_group_data` VALUES (2, 4, '2022-10-09 10:57:08.157000', 222, 1, NULL, '{\"position\":{\"type\":\"input\",\"value\":\"HomeTop\"},\"remark\":{\"type\":\"input\",\"value\":\"首页顶部\"}}');
INSERT INTO `system_group_data` VALUES (3, 8, '2022-10-10 09:58:22.969000', 1, 1, NULL, '{\"value\":{\"type\":\"input\",\"value\":\"https://up-z2.qiniup.com\"},\"title\":{\"type\":\"input\",\"value\":\"七牛云上传URL\"},\"key\":{\"type\":\"input\",\"value\":\"qiniuUploadUrl\"},\"label\":{\"type\":\"input\",\"value\":\"七牛云上传URL\"},\"desc\":{\"type\":\"input\",\"value\":\"七牛云上传URL\"}}');
INSERT INTO `system_group_data` VALUES (4, 8, '2022-10-10 10:54:45.177000', 1, 1, NULL, '{\"value\":{\"type\":\"input\",\"value\":\"banner/\"},\"title\":{\"type\":\"input\",\"value\":\"banner上传前缀\"},\"key\":{\"type\":\"input\",\"value\":\"qiniuBannerPath\"},\"label\":{\"type\":\"input\",\"value\":\"banner上传前缀\"},\"desc\":{\"type\":\"input\",\"value\":\"banner上传前缀\"}}');
INSERT INTO `system_group_data` VALUES (5, 8, '2022-10-10 12:03:31.862000', 2, 1, NULL, '{\"value\":{\"type\":\"input\",\"value\":\"http://img.zukmb.cn/\"},\"title\":{\"type\":\"input\",\"value\":\"七牛cdn地址\"},\"key\":{\"type\":\"input\",\"value\":\"qiniuHttpHost\"},\"label\":{\"type\":\"input\",\"value\":\"七牛cdn地址\"},\"desc\":{\"type\":\"input\",\"value\":\"七牛cdn地址\"}}');
INSERT INTO `system_group_data` VALUES (6, 9, '2022-10-11 16:38:44.496000', 1, 1, NULL, '{\"title\":{\"type\":\"input\",\"value\":\"资源分类\"},\"key\":{\"type\":\"input\",\"value\":\"resource\"},\"label\":{\"type\":\"input\",\"value\":\"资源分类\"},\"desc\":{\"type\":\"input\",\"value\":\"资源分类\"}}');
INSERT INTO `system_group_data` VALUES (7, 9, '2022-10-11 16:39:10.311000', 2, 1, NULL, '{\"title\":{\"type\":\"input\",\"value\":\"商城分类\"},\"key\":{\"type\":\"input\",\"value\":\"shop_menu\"},\"label\":{\"type\":\"input\",\"value\":\"商城分类\"},\"desc\":{\"type\":\"input\",\"value\":\"商城分类\"}}');
INSERT INTO `system_group_data` VALUES (8, 10, '2022-10-12 11:23:46.357000', 1, 1, NULL, '{\"title\":{\"type\":\"input\",\"value\":\"资源标签\"},\"key\":{\"type\":\"input\",\"value\":\"resource\"},\"label\":{\"type\":\"input\",\"value\":\"资源标签\"},\"desc\":{\"type\":\"input\",\"value\":\"资源标签\"}}');

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `appid` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序appid，用于区分小程序',
  `sort` int NOT NULL DEFAULT 1,
  `status` tinyint NOT NULL DEFAULT 1,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `delete_at` datetime(0) NULL DEFAULT NULL,
  `type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标签类型：比如资源标签、文章标签、商品标签',
  `tag_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'tag name',
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'remark',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (2, 'wx123004cdf793dff7', 1, 1, '2022-10-12 11:40:54.132634', '2022-11-14 17:01:39.000000', NULL, 'resource', '美女', '美女');
INSERT INTO `tag` VALUES (3, 'wx123004cdf793dff7', 2, 1, '2022-10-12 11:42:15.830894', '2022-11-14 17:01:46.000000', NULL, 'resource', '风景', '风景');
INSERT INTO `tag` VALUES (8, 'wx123004cdf793dff7', 1, 1, '2022-10-18 12:35:06.871008', '2022-11-14 17:01:55.000000', NULL, 'resource', '小清新', '小清新');
INSERT INTO `tag` VALUES (9, 'wx123004cdf793dff7', 1, 1, '2022-10-18 12:35:27.169738', '2022-11-14 17:02:31.000000', NULL, 'resource', '动漫', '动漫');
INSERT INTO `tag` VALUES (10, 'wx123004cdf793dff7', 1, 1, '2022-10-18 12:35:40.485077', '2022-11-14 17:02:38.000000', NULL, 'resource', '沙雕', '沙雕');
INSERT INTO `tag` VALUES (11, 'wx123004cdf793dff7', 1, 1, '2022-10-18 12:36:04.077736', '2022-11-14 17:02:49.000000', NULL, 'resource', '王者荣耀', '王者荣耀');
INSERT INTO `tag` VALUES (12, 'wx123004cdf793dff7', 1, 1, '2022-10-18 12:36:13.251371', '2022-11-14 17:02:58.000000', NULL, 'resource', '日系动漫', '日系动漫');
INSERT INTO `tag` VALUES (13, 'wx123004cdf793dff7', 2, 1, '2022-10-18 12:36:28.348492', '2022-11-14 17:03:08.000000', NULL, 'resource', '和平精英', '和平精英');
INSERT INTO `tag` VALUES (14, 'wx123004cdf793dff7', 2, 1, '2022-10-18 12:36:39.324730', '2022-11-14 17:03:17.000000', NULL, 'resource', '风景', '风景');
INSERT INTO `tag` VALUES (15, 'wx123004cdf793dff7', 1, 1, '2022-10-18 12:37:20.950022', '2022-11-14 17:03:25.000000', NULL, 'resource', '景深', '景深');
INSERT INTO `tag` VALUES (16, 'wx123004cdf793dff7', 1, 1, '2022-10-18 12:37:49.723339', '2022-11-14 17:01:12.000000', NULL, 'resource', '赛博', '赛博');
INSERT INTO `tag` VALUES (17, 'wx123004cdf793dff7', 2, 1, '2022-10-19 08:53:39.597143', '2022-11-14 17:01:28.000000', NULL, 'resource', '聊天背景', '聊天背景');
INSERT INTO `tag` VALUES (18, 'wx123004cdf793dff7', 5, 1, '2022-10-19 09:35:19.712047', '2022-11-14 17:03:39.000000', NULL, 'resource', '色彩', '色彩');
INSERT INTO `tag` VALUES (19, 'wx123004cdf793dff7', 56, 1, '2022-10-25 18:58:15.508184', '2022-11-14 17:04:07.000000', NULL, 'resource', '省电', '省电');
INSERT INTO `tag` VALUES (20, 'wx123004cdf793dff7', 55, 1, '2022-10-25 21:05:55.862132', '2022-11-14 17:04:51.000000', NULL, 'resource', '天空', '天空');
INSERT INTO `tag` VALUES (21, 'wx123004cdf793dff7', 56, 1, '2022-10-25 21:08:11.187895', '2022-11-14 17:05:01.000000', NULL, 'resource', '太空', '太空');

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `remark` varchar(900) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sort` int NOT NULL DEFAULT 1,
  `status` tinyint NOT NULL DEFAULT 1,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `delete_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test
-- ----------------------------

-- ----------------------------
-- Table structure for test_entity
-- ----------------------------
DROP TABLE IF EXISTS `test_entity`;
CREATE TABLE `test_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(900) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test_entity
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `status` tinyint NOT NULL DEFAULT 1,
  `pid` int NOT NULL DEFAULT 0 COMMENT '父级pid',
  `group_id` int NOT NULL DEFAULT 0 COMMENT '所属组',
  `username` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `score` int NOT NULL DEFAULT 0 COMMENT '积分',
  `role` int NOT NULL DEFAULT 0 COMMENT '所属角色',
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户密码',
  `profileId` int NULL DEFAULT NULL,
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `delete_at` datetime(0) NULL DEFAULT NULL,
  `vip_level` int NOT NULL DEFAULT 0 COMMENT '用户VIP等级',
  `salt` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '加密盐',
  `mobile` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户手机号',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `REL_9466682df91534dd95e4dbaa61`(`profileId`) USING BTREE,
  CONSTRAINT `FK_9466682df91534dd95e4dbaa616` FOREIGN KEY (`profileId`) REFERENCES `user_profile` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (38, '2022-11-15 09:22:48.183017', 1, 0, 0, '', 0, 0, NULL, 22, '2022-11-15 09:22:48.183017', NULL, 0, NULL, NULL);

-- ----------------------------
-- Table structure for user_collection
-- ----------------------------
DROP TABLE IF EXISTS `user_collection`;
CREATE TABLE `user_collection`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `delete_at` datetime(0) NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类型: resource',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_collection
-- ----------------------------

-- ----------------------------
-- Table structure for user_contribution
-- ----------------------------
DROP TABLE IF EXISTS `user_contribution`;
CREATE TABLE `user_contribution`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `delete_at` datetime(0) NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `resource_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_contribution
-- ----------------------------

-- ----------------------------
-- Table structure for user_creator
-- ----------------------------
DROP TABLE IF EXISTS `user_creator`;
CREATE TABLE `user_creator`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int NOT NULL COMMENT '1 审核中， 2 审核通过，3 审核不通过',
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `delete_at` datetime(0) NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_creator
-- ----------------------------
INSERT INTO `user_creator` VALUES (4, 1, '2022-11-15 10:06:26.214913', '2022-11-15 10:06:26.214913', NULL, 38, '1122', '哈哈哈');

-- ----------------------------
-- Table structure for user_profile
-- ----------------------------
DROP TABLE IF EXISTS `user_profile`;
CREATE TABLE `user_profile`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `gender` tinyint NOT NULL DEFAULT 2 COMMENT '性别   0 男  1  女  2 保密',
  `appid` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序appid，用于区分小程序',
  `openid` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序用户openid',
  `nickname` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户昵称',
  `avatar` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `country` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '所在国家',
  `province` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '省份',
  `city` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '城市',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_profile
-- ----------------------------
INSERT INTO `user_profile` VALUES (22, 0, 'wx123004cdf793dff7', 'ow-i35QFy0IZVSE_WFSqM2Ib6g-I', '独立的法西ᯤ⁶ᴳ', 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq1mZDClBxTjUbHOPYtRDzeiareWGDDybJD959mPibI9llfib28O5He3De13vB0zXjMJwcRic26rpkK5Q/132', '', '', '');

-- ----------------------------
-- Table structure for user_sign_info
-- ----------------------------
DROP TABLE IF EXISTS `user_sign_info`;
CREATE TABLE `user_sign_info`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL DEFAULT 0 COMMENT 'user id',
  `last_sign_date` datetime(0) NULL DEFAULT NULL COMMENT '最后签到的时间',
  `create_at` datetime(0) NOT NULL,
  `status` int NOT NULL COMMENT '状态 1 正常 2 本轮结束',
  `sign_this_max` int NOT NULL DEFAULT 0 COMMENT '本轮签到几天',
  `sign_max` int NOT NULL DEFAULT 0 COMMENT '最大签到天数',
  `sign_num` int NOT NULL DEFAULT 0 COMMENT '总签到天数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_sign_info
-- ----------------------------
INSERT INTO `user_sign_info` VALUES (1, 8, '2022-08-03 11:57:40', '0000-00-00 00:00:00', 1, 0, 0, 0);
INSERT INTO `user_sign_info` VALUES (2, 8, '2022-08-04 11:57:40', '0000-00-00 00:00:00', 1, 0, 0, 0);
INSERT INTO `user_sign_info` VALUES (3, 8, '2022-08-05 11:57:40', '0000-00-00 00:00:00', 1, 0, 0, 0);
INSERT INTO `user_sign_info` VALUES (4, 8, '2022-08-06 11:57:40', '0000-00-00 00:00:00', 1, 0, 0, 0);
INSERT INTO `user_sign_info` VALUES (7, 8, '2022-08-07 14:54:15', '2022-08-09 14:54:15', 1, 0, 0, 0);
INSERT INTO `user_sign_info` VALUES (8, 8, '2022-08-08 15:14:18', '0000-00-00 00:00:00', 1, 0, 0, 0);
INSERT INTO `user_sign_info` VALUES (12, 8, '2022-08-09 15:31:49', '2022-08-09 15:31:49', 1, 0, 0, 0);

-- ----------------------------
-- Table structure for user_wechat
-- ----------------------------
DROP TABLE IF EXISTS `user_wechat`;
CREATE TABLE `user_wechat`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `appid` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序appid，用于区分小程序',
  `openid` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序用户openid',
  `nickname` varchar(900) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `avatar` varchar(900) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `gender` tinyint NOT NULL DEFAULT 2 COMMENT '性别   0 男  1  女  2 保密',
  `country` varchar(900) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `province` varchar(900) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city` varchar(900) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_wechat
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
