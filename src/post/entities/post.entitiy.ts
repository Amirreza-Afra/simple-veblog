import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique : true})
  title: string;

  @Column('text')
  content: string;

  @Column()
  author: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
