import { Router } from 'express'
import dropDownService from '../services/DropDownService'
const dropDownRoutes = Router()

dropDownRoutes.get('/colors', async (req, res) => {
  try {
    return res.json(await dropDownService.getAllColors())
  } catch (error) {
    res.status(400).send(error.message)
  }
})

dropDownRoutes.get('/sizes', async (req, res) => {
  try {
    return res.json(await dropDownService.getAllSizes())
  } catch (error) {
    res.status(400).send(error.message)
  }
})

dropDownRoutes.get('/lengths', async (req, res) => {
  try {
    return res.json(await dropDownService.getAllLengths())
  } catch (error) {
    res.status(400).send(error.message)
  }
})

dropDownRoutes.get('/breeds', async (req, res) => {
  try {
    return res.json(await dropDownService.getAllBreeds())
  } catch (error) {
    res.status(400).send(error.message)
  }
})

export default dropDownRoutes