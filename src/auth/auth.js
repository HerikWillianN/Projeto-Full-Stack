import express from 'express'
import passport from 'passport'
import localStrategy from 'passport-local'
import crypto from 'crypto'
import { Mongo } from '../database/mongo.js'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

const collectName = 'users'

passport.use(new localStrategy({ usernameField: 'email' }, async (email, password, callback) => {
    const user = await Mongo.db
        .collection(collectName)
        .findOne({ email: email })

    if (!user) {
        return callback(null, false)
    }

    const saltBuffer = user.salt.saltBuffer.buffer

    crypto.pbkdf2(password, saltBuffer, 310000, 16, 'sha256', (err, hashedPassword) => {
        if (err) {
            return callback(null, false)
        }

        const userPasswordBuffer = Buffer.from(user.password.buffer)

        if (!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
            return callback(null, false)
        }

        const { password, salt, ...rest } = user

        return callback(null, rest)

    })
}))

const authRouter = express.Router()

authRouter.post('/signup', async (req, res) => {
    const checkUser = await Mongo.db
        .collection(collectName)
        .findOne({ email: req.body.email })

    if (checkUser) {
        return res.status(500).send({
            sucess: false,
            statusCode: 500,
            body: {
                text: 'User already exists!'
            }
        })
    }

    const salt = crypto.randomBytes(16)
    crypto.pbkdf2(req.body.password, salt, 310000, 16, 'sha256', async (err, hashedPassword) => {
        if (err) {
            return res.status(500).send({
                sucess: false,
                statusCode: 500,
                body: {
                    text: 'Error on crypto password',
                    err: err
                }
            })
        }

        const result = await Mongo.db
            .collection(collectName)
            .insertOne({
                email: req.body.email,
                password: hashedPassword,
                salt: { saltBuffer: salt }
            })


        if (result.insertedId) {
            const user = await Mongo.db
                .collection(collectName)
                .findOne({ _id: new ObjectId(result.insertedId) })

            const token = jwt.sign(user, 'secret')

            return res.send({
                sucess: true,
                statusCode: 200,
                body: {
                    text: 'User Registered Correctly',
                    token,
                    user,
                    logged: true
                }
            })
        }
    })
})

authRouter.post('/login', (req, res) => {
    passport.authenticate('local', (error, user) => {
        if (error) {
            return res.status(500).send({
                sucess: false,
                statusCode: 500,
                body: {
                    text: 'Error during authentication',
                    error
                }

            })
        }

        if(!user) {
            return res.status(400).send({
                sucess: false,
                statusCode: 400,
                body: {
                    text: 'Credentials are not correct'
                }
            })
        }

        const token = jwt.sign(user, 'secret')
        return res.status(200).send({
            sucess: true,
            statusCode: 200,
            body: {
                text: 'User logged in correctly',
                user,
                token
            }
        })
    })(req, res)
})

export default authRouter
// função async é ideal para interação com database