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
const Product_1 = require("../entities/Product");
const router = express_1.default.Router();
router.patch("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { pageNumber, productsQuantity, category, genre, orderByPrice, } = req.body;
    let productId = pageNumber * productsQuantity - productsQuantity;
    const productCount = yield Product_1.Product.count();
    console.log(productId);
    if (!pageNumber || !productsQuantity) {
        productId = productCount;
        productsQuantity = 8;
    }
    let products;
    const qb = typeorm_1.getConnection()
        .getRepository(Product_1.Product)
        .createQueryBuilder("p")
        .orderBy('"createdAt"', "DESC")
        .offset(productId)
        .limit(productsQuantity);
    if (orderByPrice) {
        qb.orderBy('"price"', orderByPrice === "ASC" ? orderByPrice : "DESC");
    }
    if (genre) {
        products = yield qb.where('"genre" = :genre ', { genre }).getMany();
        return res.send({
            products,
            productCount: yield Product_1.Product.count({ where: { genre } }),
        });
    }
    if (category) {
        products = yield qb
            .where('"categories" = :categories ', {
            categories: category,
        })
            .getMany();
        return res.send({
            products,
            productCount: yield Product_1.Product.count({ where: { categories: category } }),
        });
    }
    products = yield qb.getMany();
    return res.send({ products, productCount });
}));
router.post("/add-product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, sizes, categories, description, price, genre, } = req.body;
    const product = yield Product_1.Product.create({
        title,
        sizes,
        categories,
        description,
        price,
        genre,
    }).save();
    return res.send(product);
}));
module.exports = router;
//# sourceMappingURL=product.js.map