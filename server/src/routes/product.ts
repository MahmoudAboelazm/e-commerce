import express from "express";
import { getConnection } from "typeorm";
import { Product } from "../entities/Product";

const router = express.Router();

router.patch("/products", async (req, res) => {
  let {
    pageNumber,
    productsQuantity,
    category,
    genre,
    orderByPrice,
  } = req.body;
  let productId = pageNumber * productsQuantity - productsQuantity;

  const productCount = await Product.count();

  // in case of "ASC" remove this line
  //productId = productCount - productId;
  console.log(productId);

  if (!pageNumber || !productsQuantity) {
    productId = productCount;
    productsQuantity = 8;
  }
  let products;
  const qb = getConnection()
    .getRepository(Product)
    .createQueryBuilder("p")
    .orderBy('"createdAt"', "DESC")
    .offset(productId)
    .limit(productsQuantity);
  if (orderByPrice) {
    qb.orderBy('"price"', orderByPrice === "ASC" ? orderByPrice : "DESC");
  }
  if (genre) {
    products = await qb.where('"genre" = :genre ', { genre }).getMany();
    return res.send({
      products,
      productCount: await Product.count({ where: { genre } }),
    });
  }
  if (category) {
    products = await qb
      .where('"categories" = :categories ', {
        categories: category,
      })
      .getMany();
    return res.send({
      products,
      productCount: await Product.count({ where: { categories: category } }),
    });
  }
  products = await qb.getMany();
  return res.send({ products, productCount });
});

router.post("/add-product", async (req, res) => {
  const {
    title,
    sizes,
    categories,
    description,
    price,
    genre,
  } = req.body as Product;

  const product = await Product.create({
    title,
    sizes,
    categories,
    description,
    price,
    genre,
  }).save();

  return res.send(product);
});

module.exports = router;
