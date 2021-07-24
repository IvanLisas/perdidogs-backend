import { Router } from 'express'
import { User } from '../models/User'
import userService from '../services/UserService'

const userRoutes = Router()

userRoutes.put('/login', async (req, res) => {
  try {
    res.json(await userService.login(req.body.email, req.body.password))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

// userRoutes.put('/loginWithToken', async (req, res) => {
//   try {
//     res.json(await userService.loginWithToken(req.body.email, req.body.token))
//   } catch (error) {
//     res.status(403).send(error.message)
//   }
// })
userRoutes.put('/forgot-password', async (req, res) => {
  try {
    const email = req.body.email
    console.log(email)
    if (email == null) {
      res.status(403).send('El email que ha ingresado es invalido')
    } else {
      res.json(await userService.forgotPassword(email))
    }
  } catch (error) {
    console.log(error.message)
    res.status(403).send(error.message)
  }
})

userRoutes.get('/:userid', async (req, res) => {
  const id = parseInt(req.params.userid)
  try {
    res.json(await userService.get(id))
  } catch (error) {
    res.send(error.message)
  }
})

userRoutes.put('/update', async (req, res) => {
  try {
    return res.json(await userService.update(req.body))
  } catch (error) {
    res.send(error.message)
  }
})

userRoutes.put('/changePassword', async (req, res) => {
  try {
    const idUser = req.body.userId
    const oldPassword = req.body.oldPassword
    const newPassWord = req.body.newPassword
    res.json(await userService.changePassword(idUser, oldPassword, newPassWord))
  } catch (error) {
    res.send(error.message)
  }
})

userRoutes.put('/changePasswordWithToken', async (req, res) => {
  try {
    const idUser = req.body.userId
    const token = req.body.token
    const newPassWord = req.body.newPassword
    res.json(await userService.changePassword(idUser, token, newPassWord))
  } catch (error) {
    res.send(error.message)
  }
})


userRoutes.delete('/:userid', async (req, res) => {
  try {
    const id = parseInt(req.params.userid)
    const user = await userService.get(id)
    return res.json(userService.delete(user))
  } catch (error) {
    res.send(error.message)
  }
})

userRoutes.post('/registration', async (req, res) => {
  try {
    const user = User.fromJson(req.body)
    return res.json(await userService.registrateUser(user))
  } catch (error) {
    res.status(400).send(error.message)
  }
})

userRoutes.put('/byUsername', async (req, res) => {
  try {
    return res.json(await userService.getByUsername(req.body.username))
  } catch (error) {
    res.status(400).send(error.message)
  }
})

export default userRoutes
