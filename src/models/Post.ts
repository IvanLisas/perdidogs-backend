import {
  Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn
}
from "typeorm";
import {
  Comment
}
from "./Comment";
import {
  Photo
}
from "./Photo";
import {
  PostStatus
}
from "./PostStatus";
import {
  Location
}
from "./Location";
import {
  Pet
}
from "./Pet";
import {
  Picture
}
from "./Picture";


@Entity() export class Post {

  constructor(init?: Partial<Post > ) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn() postId!: number;

  @Column() description!: string;

  @CreateDateColumn() creationDate!: Date;

  @Column() endDate!: Date;

  @ManyToOne(type => PostStatus) @JoinColumn({ name: "status_id" }) status!: PostStatus;


  @ManyToOne(type => Comment) @JoinColumn({ name: "comment_id" }) comment!: Comment;


  @ManyToOne(type => Picture) @JoinColumn({ name: "id_photo" }) picture!: Picture;

  @ManyToOne(type => Location) @JoinColumn({ name: "location_id" }) location!: Location;

  @ManyToOne(type => Pet) @JoinColumn({ name: "pet_id" }) pet!: Pet;


  validate() {
    if(!this.description || !this.status || !this.picture || !this.creationDate || !this.endDate || !this.location || !this.pet || !this.comment) {
      throw "Publicacion inválida"
    }
  }

  static fromJson(postJson: string) {
    return Object.assign(new Post(), postJson)
  }

}
