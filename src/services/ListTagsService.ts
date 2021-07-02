import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import { TagsRepository } from '../repositories/TagsRepository';

class ListTagsService {
    async execute() {
        const tagsRepositories = getCustomRepository(TagsRepository);

        const tags = tagsRepositories.find();

        return classToPlain(tags);
    }
}

export { ListTagsService };
