import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.exists({ table: 'user_keys', column: 'key' })]),
    name: schema.string({ trim: true }),
    redirectUrl: schema.string({ trim: true }, [rules.confirmed('passwordConfirmation')]),
  })

  public cacheKey = this.ctx.routeKey

  public messages: CustomMessages = {}
}
