import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/User/ForgotPassword'
import { User, UserKey } from 'App/Models'
import { faker } from '@faker-js/faker'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class ForgotPasswordsController {
  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)

    const user = await User.create({ email })

    await user.save()

    const key = faker.datatype.uuid() + new Date().getTime()

    user.related('keys').create({ key })

    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

    await Mail.send((message) => {
      message.to(email)
      message.from('contato@facebook.com', 'Facebook')
      message.subject('recuperação de senha')
      message.htmlView('emails/password', { link })
    })
  }

  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail('key', params.key)
    const user = await userKey.related('user').query().firstOrFail()

    return user
  }

  public async update({}: HttpContextContract) {}
}
