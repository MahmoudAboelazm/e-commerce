import express from "express";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import { Cart } from "../entities/Cart";
import { MyRequest } from "../types";
import { handleAddToCart } from "../utils/handleCartItems";
const router = express.Router();

router.post("/add-to-cart", async (req: MyRequest, res) => {
  const { productId, quantity } = req.body as any;
  const { cartId, userId } = req.session;

  if (cartId || userId) {
    return res.send(
      await handleAddToCart({ cartId, userId, quantity }, productId),
    );
  }
  // if no card id then generate new one then assign it to session then insert to the table
  const newCardId = v4();

  await Cart.create({
    cartId: newCardId,
    productId,
    count: quantity || 1,
  }).save();
  req.session.cartId = newCardId;
  return res.send(
    await getConnection()
      .getRepository(Cart)
      .createQueryBuilder("cart")
      .where('cart."cartId" = :cartId and cart."productId" = :productId', {
        cartId: newCardId,
        productId,
      })
      .leftJoinAndSelect("cart.product", "product")
      .getOne(),
  );
});

router.get("/cart-items", async (req: MyRequest, res) => {
  const { userId, cartId } = req.session;

  if (!cartId && !userId) {
    return res.send(null);
  }
  const cart = getConnection()
    .getRepository(Cart)
    .createQueryBuilder("cart")
    .where("cart.cartId = :cartId", { cartId: cartId })
    .leftJoinAndSelect("cart.product", "product");

  userId
    ? cart.where("cart.userId = :userId", { userId: userId })
    : cart.where("cart.cartId = :cartId", { cartId: cartId });
  return res.send(await cart.getMany());
});

router.post("/update-cart-item", async (req: MyRequest, res) => {
  const { userId, cartId } = req.session;
  const { quantity, productId } = req.body;
  if (!userId && !cartId) return res.send(null);
  if (quantity <= 0) {
    res.send(
      await Cart.delete(userId ? { productId, userId } : { productId, cartId }),
    );
  }

  await Cart.update(
    userId
      ? {
          userId: userId,
          productId,
        }
      : {
          cartId: cartId as any,
          productId,
        },
    {
      count: quantity,
    },
  );
  const cart = getConnection()
    .getRepository(Cart)
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

  res.send(await cart.getOne());
});
router.delete("/delete-cart-item", async (req: MyRequest, res) => {
  const { userId, cartId } = req.session;
  const { productId } = req.body;

  if (!userId && !cartId) return res.send(null);
  await Cart.delete(userId ? { productId, userId } : { productId, cartId });
  res.send({ productId });
});
module.exports = router;
