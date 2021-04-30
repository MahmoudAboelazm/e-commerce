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
exports.handleAddToCart = void 0;
const Cart_1 = require("../entities/Cart");
const typeorm_1 = require("typeorm");
class InputId {
}
const handleAddToCart = (id, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const cartCheck = yield Cart_1.Cart.findOne(id.userId
        ? {
            where: {
                userId: id.userId,
                productId,
            },
        }
        : {
            where: {
                cartId: id.cartId,
                productId,
            },
        });
    if (cartCheck) {
        yield Cart_1.Cart.update(id.userId
            ? {
                userId: id.userId,
                productId,
            }
            : {
                cartId: id.cartId,
                productId,
            }, {
            count: id.quantity
                ? id.quantity + cartCheck.count
                : cartCheck.count + 1,
        });
        cartCheck.count = id.quantity
            ? id.quantity + cartCheck.count
            : cartCheck.count + 1;
        return cartCheck;
    }
    yield Cart_1.Cart.create(id.userId
        ? {
            userId: id.userId,
            productId,
            count: id.quantity || 1,
        }
        : {
            cartId: id.cartId,
            productId,
            count: id.quantity || 1,
        }).save();
    const cart = typeorm_1.getConnection()
        .getRepository(Cart_1.Cart)
        .createQueryBuilder("cart")
        .leftJoinAndSelect("cart.product", "product");
    id.userId
        ? cart.where('cart."userId" = :userId and cart."productId" = :productId', {
            userId: id.userId,
            productId,
        })
        : cart.where('cart."cartId" = :cartId and cart."productId" = :productId', {
            cartId: id.cartId,
            productId,
        });
    return yield cart.getOne();
});
exports.handleAddToCart = handleAddToCart;
//# sourceMappingURL=handleCartItems.js.map