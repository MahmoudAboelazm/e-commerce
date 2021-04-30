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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLoginError = exports.handleRegisterError = void 0;
class FieldError {
}
const handleRegisterError = (input) => __awaiter(void 0, void 0, void 0, function* () {
    if (input.username.length < 3) {
        return {
            error: {
                field: "username",
                message: "username must be at least 3 char",
            },
        };
    }
    if (input.username.includes("@")) {
        return {
            error: {
                field: "username",
                message: "username must not include @",
            },
        };
    }
    if (input.email.length <= 2) {
        return {
            error: {
                field: "email",
                message: "email must be at least 3 char",
            },
        };
    }
    if (!input.email.includes("@")) {
        return {
            error: {
                field: "email",
                message: "email must include @",
            },
        };
    }
    if (input.password.length <= 2) {
        return {
            error: {
                field: "password",
                message: "password must be at least 3 char",
            },
        };
    }
    return null;
});
exports.handleRegisterError = handleRegisterError;
const handleLoginError = (input) => __awaiter(void 0, void 0, void 0, function* () {
    if (input.username.length < 3) {
        return {
            error: {
                field: "username",
                message: "username must be at least 3 char",
            },
        };
    }
    if (input.username.includes("@")) {
        return {
            error: {
                field: "username",
                message: "username must not include @",
            },
        };
    }
    if (input.email.length <= 2) {
        return {
            error: {
                field: "email",
                message: "email must be at least 3 char",
            },
        };
    }
    if (!input.email.includes("@")) {
        return {
            error: {
                field: "email",
                message: "email must include @",
            },
        };
    }
    if (input.password.length <= 2) {
        return {
            error: {
                field: "password",
                message: "password must be at least 3 char",
            },
        };
    }
    return null;
});
exports.handleLoginError = handleLoginError;
//# sourceMappingURL=LoginOrRegisterError.js.map