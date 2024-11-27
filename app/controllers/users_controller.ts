import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/user'
import User from '#models/user'

export default class UsersController {
  async create({response, request}: HttpContext) {
    const credentials = await request.validateUsing(createUserValidator)
    try {
      const user = await User.create(credentials)
      if(user.id) {
        return response.status(201).send({ status: 201, message: "Usuário criado com sucesso" })
      }
    } catch (error) {
      return response.status(400).send({ status: 400, message: error })
    }
  }

  async store({ response, request }: HttpContext) {
    const credentials = request.only(['email', 'password'])
    const user = await User.verifyCredentials(credentials.email, credentials.password)

    try {
      const token = await User.accessTokens.create( user, ['*'], { expiresIn: '30 days'})
      return response.status(200).send({ status: 200, message: 'Login successful', authentication: token })
    } catch (error) {
      return response.status(401).send({ status: 401, message: error })
    }

  }
}