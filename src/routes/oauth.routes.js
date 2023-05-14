const { getAllGAEvents } = require('../controllers/gaAnalytics.controller')
const { oauthLogin, oauthCallback } = require('../controllers/oauth2.controller')

const oauthLoginRoute = require('express').Router()


oauthLoginRoute.get('/', oauthLogin)
oauthLoginRoute.get('/oauth2callback', oauthCallback, getAllGAEvents)

module.exports = oauthLoginRoute