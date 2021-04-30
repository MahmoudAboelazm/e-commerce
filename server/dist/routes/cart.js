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
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Cart_1 = require("../entities/Cart");
const handleCartItems_1 = require("../utils/handleCartItems");
const router = express_1.default.Router();
router.post("/add-to-cart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = req.body;
    const { cartId, userId } = req.session;
    if (cartId || userId) {
        return res.send(yield handleCartItems_1.handleAddToCart({ cartId, userId, quantity }, productId));
    }
    const newCardId = uuid_1.v4();
    yield Cart_1.Cart.create({
        cartId: newCardId,
        productId,
        count: quantity || 1,
    }).save();
    req.session.cartId = newCardId;
    return res.send(yield typeorm_1.getConnection()
        .getRepository(Cart_1.Cart)
        .createQueryBuilder("cart")
        .where('cart."cartId" = :cartId and cart."productId" = :productId', {
        cartId: newCardId,
        productId,
    })
        .leftJoinAndSelect("cart.product", "product")
        .getOne());
}));
router.get("/cart-items", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, cartId } = req.session;
    if (!cartId && !userId) {
        return res.send(null);
    }
    const cart = typeorm_1.getConnection()
        .getRepository(Cart_1.Cart)
        .createQueryBuilder("cart")
        .where("cart.cartId = :cartId", { cartId: cartId })
        .leftJoinAndSelect("cart.product", "product");
    userId
        ? cart.where("cart.userId = :userId", { userId: userId })
        : cart.where("cart.cartId = :cartId", { cartId: cartId });
    return res.send(yield cart.getMany());
}));
router.post("/update-cart-item", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, cartId } = req.session;
    const { quantity, productId } = req.body;
    if (!userId && !cartId)
        return res.send(null);
    if (quantity <= 0) {
        res.send(yield Cart_1.Cart.delete(userId ? { productId, userId } : { productId, cartId }));
    }
    yield Cart_1.Cart.update(userId
        ? {
            userId: userId,
            productId,
        }
        : {
            cartId: cartId,
            productId,
        }, {
        count: quantity,
    });
    const cart = typeorm_1.getConnection()
        .getRepository(Cart_1.Cart)
        .createQueryBuilder("cart")
        .leftJoinAndSelect("cart.product", "product");
    userId
        ? cart.where('cart."userId" = :userId and cart."productId" = :productId', {
            userId: userId,
            productId,
        })
        : cart.where('cart."cartId" = :cartId and cart."productId" = :productId', {
            cartId: cartId,
            productId,
        });
    res.send(yield cart.getOne());
}));
router.delete("/delete-cart-item", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, cartId } = req.session;
    const { productId } = req.body;
    if (!userId && !cartId)
        return res.send(null);
    yield Cart_1.Cart.delete(userId ? { productId, userId } : { productId, cartId });
    res.send({ productId });
}));
module.exports = router;
//# sourceMappingURL=cart.js.map