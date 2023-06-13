import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/User/Register'
import { User, UserKey } from 'App/Models'
import { faker } from '@faker-js/faker'

export default class UserRegisterController {
  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)
    const user = await User.create({ email })

    await user.save()

    const key = faker.datatype.uuid() + String(new Date().getTime())

    const keyData: Partial<UserKey> = {
      id: 0,
    }

    user.related('keys').create(keyData)

    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}
}
