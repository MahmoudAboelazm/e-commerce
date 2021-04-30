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
exports.handleAddToCart = exports.getCartItems = void 0;
const Cart_1 = require("../entities/Cart");
const typeorm_1 = require("typeorm");
class InputId {
}
const getCartItems = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield typeorm_1.getConnection().query(`
        select c.*,
        json_build_object(
          'id', p.id,
          'title', p.title,
          'price', p.price
         
        ) product
        from cart c

        inner join public.product p on p.id = c."productId"
        ${id.userId
        ? `where c."userId" = ${id.userId}`
        : `where c."cartId" = ${id.cartId}`}
        
        `);
});
exports.getCartItems = getCartItems;
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
            }, { count: cartCheck.count + 1 });
        cartCheck.count = cartCheck.count + 1;
        return cartCheck;
    }
    const cart = yield Cart_1.Cart.create(id.userId
        ? {
            userId: id.userId,
            productId,
        }
        : {
            cartId: id.cartId,
            productId,
        }).save();
    return cart;
});
exports.handleAddToCart = handleAddToCart;
//# sourceMappingURL=getCartItems.js.map