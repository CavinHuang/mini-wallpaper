"use strict";
/**
 * user model
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const userProfile_1 = require("./userProfile");
const decorator_1 = require("@/core/decorator");
const userCreator_1 = require("./userCreator");
let User = class User {
    id;
    pid;
    group_id;
    vip_level;
    role;
    username;
    password;
    salt;
    mobile;
    score;
    profile;
    status;
    creator;
    create_at;
    update_at;
    delete_at;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '父级pid',
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], User.prototype, "pid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '所属组',
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], User.prototype, "group_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '用户VIP等级',
        default: 0
    }),
    __metadata("design:type", Number)
], User.prototype, "vip_level", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '所属角色',
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 200,
        comment: '用户名'
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({
        length: 200,
        comment: '用户密码',
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({
        length: 200,
        comment: '加密盐',
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 200,
        comment: '用户手机号',
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '积分',
        default: 0
    }),
    __metadata("design:type", Number)
], User.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => userProfile_1.UserProfile, profile => profile.user, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", userProfile_1.UserProfile)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        default: 1
    }),
    __metadata("design:type", Number)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => userCreator_1.UserCreator, creator => creator.user),
    __metadata("design:type", userCreator_1.UserCreator)
], User.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'datetime'
    }),
    __metadata("design:type", Date)
], User.prototype, "create_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'datetime'
    }),
    __metadata("design:type", Date)
], User.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        nullable: true
    }),
    __metadata("design:type", Date)
], User.prototype, "delete_at", void 0);
User = __decorate([
    (0, decorator_1.Repo)('User'),
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
