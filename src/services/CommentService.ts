import { Chat } from '../models/Chat'
import { getRepository } from 'typeorm'
import { MessageDTO } from '../routes/ChatRoutes'
import userService from './UserService'
import { Message } from '../models/Message'
import { Comment } from '../models/Comment'
import { EmailService } from './EmailService'
import postService from './PostService'
import { Post } from '../models/Post'

export class CommentService {
  async getByPostId(postId: number): Promise<Comment[]> {
    try {
      return await getRepository(Comment).find({ relations: ['owner'], where: { Id: postId } })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async save(comment: Comment): Promise<Post> {
    await getRepository(Comment).save(comment)
    return await postService.findById(comment.post.Id)
  }

  async create(message: MessageDTO): Promise<Chat | undefined> {
    const user1 = await userService.getUserById(message.sender)
    const user2 = await userService.getUserById(message.adressee)
    if (message.chat == 0) {
      const mesagge = new Message({ sender: user1, adressee: user2, body: message.messageBody })
      await getRepository(Message).save(mesagge)
      const chat = new Chat({ owner: user1, owner2: user2, messageList: [mesagge] })

      return await getRepository(Chat).save(chat)
    } else {
      /*   const users = await getRepository(Chat).find({ relations: ["photos"] }); */
      const chat = await getRepository(Chat).findOneOrFail(message.chat, { relations: ['messageList'], order: { creationDate: 'DESC' } })
      const mesagge = new Message({ sender: user1, adressee: user2, body: message.messageBody })
      await getRepository(Message).save(mesagge)
      chat.messageList.push(mesagge)

      return await getRepository(Chat).save(chat)
    }
  }
}

const commentService = new CommentService()

export default commentService
