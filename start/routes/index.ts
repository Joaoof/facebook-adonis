import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './users'
import './uploads'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/user-register', async ({ view }) => {
  return view.render('emails/verify-email')
})

Route.get('/user-password', async ({ view }) => {
  return view.render('emails/password')
})
