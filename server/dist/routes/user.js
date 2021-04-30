"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputLogin = exports.UserInput = void 0;
const argon2_1 = __importDefault(require("argon2"));
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const LoginOrRegisterError_1 = require("../utils/LoginOrRegisterError");
const router = express_1.default.Router();
class UserInput {
}
exports.UserInput = UserInput;
class UserInputLogin {
}
exports.UserInputLogin = UserInputLogin;
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    const error = yield LoginOrRegisterError_1.handleRegisterError(input);
    if (error) {
        return res.send(error);
    }
    const hashedPassword = yield argon2_1.default.hash(input.password);
    let user;
    try {
        const result = yield typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values({
            username: input.username,
            email: input.email,
            password: hashedPassword,
        })
            .returning("*")
            .execute();
        user = result.raw[0];
        delete user.password;
    }
    catch (err) {
        if ((err.code = "23505")) {
            return res.send({
                error: {
                    field: "username",
                    message: "username already exist",
                },
            });
        }
    }
    req.session.userId = user.id;
    res.send(user);
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usernameOrEmail, password } = req.body;
    const userConnection = typeorm_1.getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User_1.User, "user")
        .addSelect("user.password");
    usernameOrEmail.includes("@")
        ? userConnection.where("user.email = :email", { email: usernameOrEmail })
        : userConnection.where("user.username = :username", {
            username: usernameOrEmail,
        });
    const user = yield userConnection.getOne();
    if (!user) {
        return res.send({
            error: {
                field: "usernameOrEmail",
                message: "usernameOrEmail doesn't exist",
            },
        });
    }
    const validate = yield argon2_1.default.verify(user.password, password);
    delete user.password;
    if (!validate) {
        return res.send({
            error: {
                field: "password",
                message: "Incorrect password",
            },
        });
    }
    req.session.userId = user.id;
    return res.send(user);
}));
router.get("/users", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield User_1.User.find());
}));
router.get("/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const m = yield User_1.User.findOne(req.session.userId);
    console.log(req.session);
    req.session.userId
        ? res.send(yield User_1.User.findOne(req.session.userId))
        : res.send(null);
}));
router.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send(yield new Promise((resolve) => req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
            console.log(err);
            return resolve(false);
        }
        return resolve(true);
    })));
}));
module.exports = router;
//# sourceMappingURL=user.js.map