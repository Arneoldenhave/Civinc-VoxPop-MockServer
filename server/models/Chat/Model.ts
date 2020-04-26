import ChatsSchema from './ChatsSchema';
import MessageSchema from './MessageSchema';

export default class ChatsModel {

    messages: MessageSchema[] = [];
    chats: ChatsSchema[] = [];

    timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    async create(chat: ChatsSchema) : Promise<ChatsSchema> {
        await this.timeout(10) 
        this.chats.push(chat)
        return chat;
    };


    async updateChat(id: string, message : MessageSchema) : Promise<boolean| Error> {
        await this.timeout(10);
        this.messages.push(message);
        return true
    };

    async findBy(id: string) {

    }

    async findByEvent(id: string) {

    }

    async findByUser(id: string) {

    }

    async like(messageId: string, like: boolean) {

    }

    async findMessageBy(id: string) {

    }

    async save(message: MessageSchema) {

    }

} 
