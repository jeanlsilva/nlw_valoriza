import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../repositories/UsersRepository';

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({ email });

        if (!user) {
            throw new Error('Email/password is incorrect!');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Email/password is incorrect');
        }

        const token = sign(
            {
                email: user.email,
            },
            '54f63ca2f849c4ecbff1a8078a6c50b0',
            {
                subject: user.id,
                expiresIn: '1d',
            },
        );

        return token;
    }
}

export { AuthenticateUserService };
