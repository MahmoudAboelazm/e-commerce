import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  count: number;

  @Column({ nullable: true })
  cartId: string;

  @Column({ nullable: true })
  userId!: number;

  @ManyToOne(() => User, (user) => user.cart)
  user: User;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(() => Product, (product) => product.cart)
  product: Product;
}
