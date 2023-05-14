const { oauthLogin, oauthCallback } = require('../controllers/oauth2.controller')

const oauthLoginRoute = require('express').Router()


oauthLoginRoute.get('/', oauthLogin)
oauthLoginRoute.get('/oauth2callback', oauthCallback)

module.exports = oauthLoginRoute