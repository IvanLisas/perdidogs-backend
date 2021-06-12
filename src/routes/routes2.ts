import { Router } from 'express'

const hello2 = Router()

hello2.get('/2', (req, res) => {
  return res.json( ' la 2')
})

hello2.get('/2/:tagId', function (req, res) {
  res.send('tagId is set to ' + req.params.tagId)
})

export default hello2
