import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Auth'

export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(StoreValidator) //PEGA DA REQUISIÇÃO EMAIL E SENHA

    const token = await auth.attempt(email, password, {
      expiresIn: '30 days',
    }) // tentativa de login, caso seja sucess vai armazenar o token, const token =

    return token
  } //login

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  } //logout
}
