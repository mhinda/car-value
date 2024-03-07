import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    create(email: string, password: string){
        const user = this.repo.create({email, password});
        
        return this.repo.save(user);
    }

    findOneBy(id: number) {
        return this.repo.findOneBy({id});
    }

    findBy(email: string) {
        return this.repo.findBy({email});
    }

    findAll() {
        return this.repo.find()
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOneBy(id);
        if (!user) throw new Error('User not found')
    
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOneBy(id);
        if (!user) throw new Error('User not found')
    
        return this.repo.remove(user);
    }
}
