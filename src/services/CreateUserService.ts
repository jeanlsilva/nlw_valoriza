import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({
        name,
        email,
        password,
        admin = false,
    }: IUserRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        if (!email) {
            throw new Error('Incorrect email!');
        }

        const passwordHash = await hash(password, 8);

        const userAlreadyExists = await usersRepository.findOne({ email });

        if (userAlreadyExists) {
            throw new Error('User already exists!');
        }

        const user = usersRepository.create({
            name,
            email,
            password: passwordHash,
            admin,
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService };
