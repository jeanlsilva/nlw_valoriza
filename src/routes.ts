import { Router } from 'express';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUserReceivedComplimentsController } from './controllers/ListUserReceivedComplimentsController';
import { ListUsersController } from './controllers/ListUsersController';
import { ListUserSentComplimentsController } from './controllers/ListUserSentComplimentsController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ListUserReceivedComplimentsService } from './services/ListUserReceivedComplimentsService';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSentComplimentsController =
    new ListUserSentComplimentsController();
const listUserReceivedComplimentsController =
    new ListUserReceivedComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/users', createUserController.handle);
router.post('/sessions', authenticateUserController.handle);
router.post(
    '/tags',
    ensureAuthenticated,
    ensureAdmin,
    createTagController.handle,
);
router.post(
    '/compliments',
    ensureAuthenticated,
    createComplimentController.handle,
);

router.get(
    '/users/compliments/sent',
    ensureAuthenticated,
    listUserSentComplimentsController.handle,
);
router.get(
    '/users/compliments/received',
    ensureAuthenticated,
    listUserReceivedComplimentsController.handle,
);

router.get('/tags', ensureAuthenticated, listTagsController.handle);

router.get('/users', ensureAuthenticated, listUsersController.handle);

export { router };
