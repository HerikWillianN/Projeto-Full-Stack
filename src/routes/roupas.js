import express from 'express'
import RoupasControllers from '../controllers/roupas.js'

const roupasRouter = express.Router()
const roupasControllers = new RoupasControllers

roupasRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await roupasControllers.getRoupas()

    res.status(statusCode).send({ success, statusCode, body })
})

roupasRouter.get('/availables/', async (req, res) => {
    const { success, statusCode, body } = await roupasControllers.getAvailableRoupas()

    res.status(statusCode).send({ success, statusCode, body })
})

roupasRouter.post('/', async (req, res) => {
    const { success, statusCode, body } = await roupasControllers.addRoupa(req.body)

    res.status(statusCode).send({ success, statusCode, body })
})

roupasRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await roupasControllers.deleteRoupa(req.params.id)

    res.status(statusCode).send({ success, statusCode, body })
})

roupasRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await roupasControllers.updateRoupa(req.params.id, req.body)

    res.status(statusCode).send({ success, statusCode, body })
})

export default roupasRouter