import {
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Cart } from "./Cart";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ type: "int", default: 0 })
  price!: number;

  @Column({ type: "int", default: 0 })
  reviews!: number;

  @Column()
  categories: string;

  @Column()
  sizes: string;

  @Column({ nullable: true })
  genre: string;

  @OneToMany(() => Cart, (cart) => cart.product)
  cart: Cart[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
