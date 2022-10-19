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

 Date: 19/10/2022 09:06:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `appid` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '小程序appid，用于区分小程序',
  `type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '资源的枚举值: image/video/audio',
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'name',
  `info` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'info',
  `url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '资源的地址',
  `thumb_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '资源的缩略图地址',
  `upload_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'local' COMMENT '资源的上传方式, local/qiniu',
  `price` decimal(10, 0) NOT NULL COMMENT '资源的单价',
  `vip_price` decimal(10, 0) NOT NULL COMMENT '会员资源的单价',
  `sort` int NOT NULL COMMENT '排序值',
  `is_hot` tinyint NOT NULL COMMENT '是否热门',
  `is_recommend` tinyint NOT NULL COMMENT '是否推荐',
  `author` int NOT NULL COMMENT '作者id',
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `delete_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES (8, '1', '1', '1', '1', '1', '1', 'local', 1, 1, 1, 1, 1, 1, '2022-10-19 09:05:41.648519', '2022-10-19 09:05:41.648519', NULL);

SET FOREIGN_KEY_CHECKS = 1;
