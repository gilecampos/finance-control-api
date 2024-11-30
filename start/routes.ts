/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})


router.group(() => {
  router.post('users/register', [UsersController, 'create'])
  router.post('users/login', [UsersController, 'store'])
}).prefix('api/v1')

