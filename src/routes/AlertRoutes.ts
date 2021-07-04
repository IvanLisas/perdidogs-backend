import { Router } from 'express'
import { User } from '../models/User'
import userService from '../services/UserService'

const alertRoutes = Router()

alertRoutes.put('/', async (req, res) => {
  try {
    res.json(await userService.login(req.body.email, req.body.password))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

alertRoutes.put('/forgot-password', async (req, res) => {
  try {
    const email = req.body.email;
    if(email==null){
      res.status(403).send('El email que ha ingresado es invalido')
    }else{
      res.json(await userService.forgotPassword(email))
    }
  } catch (error) {
    res.status(403).send(error.message)
  }
})

alertRoutes.get('/:userid', async (req, res) => {
  const id = parseInt(req.params.userid)
  try {
    res.json(await userService.get(id))
  } catch (error) {
    res.send(error.message)
  }
})

alertRoutes.put('/update', async (req, res) => {
  try {
    return res.json(await userService.update(req.body))
  } catch (error) {
    res.send(error.message)
  }
})

alertRoutes.put('/changePassword',async (req, res) => {
  try {
    const idUser = req.body.userId
    const oldPassword = req.body.oldPassword
    const newPassWord = req.body.newPassword
   // console.log(oldPassword, newPassWord)

    res.json(await userService.changePassword(idUser, oldPassword,newPassWord))
  } catch (error) {
    res.send(error.message)
  }
})
alertRoutes.delete('/:userid', async (req, res) => {
  try {
    const id = parseInt(req.params.userid)
    const user = await userService.get(id)
    return res.json(userService.delete(user))
  } catch (error) {
    res.send(error.message)
  }
})

alertRoutes.post('/registration', async (req, res) => {
  try {
    const user = User.fromJson(req.body)
    console.log(req.body)
    res.json(await userService.registrateUser(user))
  } catch (error) {
    res.status(400).send(error.message)
  }
})

export default alertRoutes
