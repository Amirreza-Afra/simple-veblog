import { Post } from "src/post/entities/post.entitiy";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'comments'})
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  author: string;
  
  @CreateDateColumn()
  createdAt : Date;
  
  @Column()
  postId: number;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;
}