import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/user'
import User from '#models/user'

export default class UsersController {
  async create({response, request}: HttpContext) {
    const credentials = await request.validateUsing(createUserValidator)
    
    try {
      const user = await User.create(credentials)
      if(user.id) {
        return response.status(201).send({ status: 201, message: "Created user" })
      }
    } catch (error) {
      console.log(error)
    }
  }
}