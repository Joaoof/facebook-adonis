import Route from '@ioc:Adonis/Core/Route'

Route.post('/users/register', 'Users/Register.store')
Route.get('/users/register/:key', 'Users/Register.show')
Route.put('/users/register', 'Users/Register.update')

Route.post('/users/forgot-password', 'Users/ForgotPasswords.store')
Route.get('/users/register/:key', 'Users/ForgotPasswords.show')
Route.put('/users/register', 'Users/ForgotPasswords.update')
