import { Cart } from "../entities/Cart";
import { getConnection } from "typeorm";

class InputId {
  cartId?: number;
  userId?: number;
  quantity?: number;
}

export const handleAddToCart = async (id: InputId, productId: number) => {
  const cartCheck = await Cart.findOne(
    id.userId
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
        },
  );

  if (cartCheck) {
    await Cart.update(
      id.userId
        ? {
            userId: id.userId,
            productId,
          }
        : {
            cartId: id.cartId as any,
            productId,
          },
      {
        count: id.quantity
          ? id.quantity + cartCheck.count
          : cartCheck.count + 1,
      },
    );
    cartCheck.count = id.quantity
      ? id.quantity + cartCheck.count
      : cartCheck.count + 1;
    return cartCheck;
  }

  // if no cart found
  await Cart.create(
    id.userId
      ? {
          userId: id.userId,
          productId,
          count: id.quantity || 1,
        }
      : {
          cartId: id.cartId as any,
          productId,
          count: id.quantity || 1,
        },
  ).save();
  const cart = getConnection()
    .getRepository(Cart)
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

  return await cart.getOne();
};
// export const getCartItems = async (id: InputId) =>
//   await getConnection().query(
//     `
//         select c.*,
//         json_build_object(
//           'id', p.id,
//           'title', p.title,
//           'price', p.price

//         ) product
//         from cart c

//         inner join public.product p on p.id = c."productId"
//         ${
//           id.userId
//             ? `where c."userId" = ${id.userId}`
//             : `where c."cartId" = ${String(id.cartId)}`
//         }

//         `,
//   );
