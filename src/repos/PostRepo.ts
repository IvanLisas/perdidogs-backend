import { EntityRepository, Repository } from "typeorm";
import { Post } from "../models/Post";

@EntityRepository(Post)
export class RepoPost extends Repository<Post> {

    posts = [Post]

    async allPosts() {
        try {
            return await this.find()
        } catch (e) {
            console.log(e)
        }
    }

    async searchById(id: number) {
        return await this.findOneOrFail(id)
    }

    async anyPosts() {
        try {
            return await this.count() == 0
        } catch (e) {
            console.log(e)
        }
    }

    async savePost(Post: Post) {
        try {
            await this.save(Post)
        } catch (e) {
            console.log(e)
        }
    }

}