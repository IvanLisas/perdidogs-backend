import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { Comment } from './Comment'
import { PostStatus } from './PostStatus'
import { Location } from './Location'
import { Pet } from './Pet'
import { Picture } from './Picture'
import { User } from './User'
import { Breed } from './Breed'
import { Size } from './Size'

@Entity()
export class Post {
  constructor(init?: Partial<Post>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn() postId!: number

  @Column({ type: 'varchar'}) description!: string

  @CreateDateColumn() creationDate!: Date

  @Column() owner!: User

  @CreateDateColumn() endDate!: Date

  @Column() breed!: Breed

  @Column() size!: Size

  @Column() color!: string

  @ManyToOne((type) => PostStatus) @JoinColumn({ name: 'status_id' }) status!: PostStatus

  @ManyToOne((type) => Comment) @JoinColumn({ name: 'comment_id' }) comment!: Comment

  @ManyToOne((type) => Picture) @JoinColumn({ name: 'id_photo' }) picture!: Picture

  @ManyToOne((type) => Location) @JoinColumn({ name: 'location_id' }) location!: Location

  @ManyToOne((type) => Pet) @JoinColumn({ name: 'pet_id' }) pet!: Pet

  validate() {
    if (!this.description || !this.status || !this.picture || !this.creationDate || !this.endDate || !this.location || !this.pet || !this.comment || !this.size || !this.breed || !this.color) {
      throw 'Publicacion inválida'
    }
  }

  static fromJson(postJson: string) {
    return Object.assign(new Post(), postJson)
  }
}
