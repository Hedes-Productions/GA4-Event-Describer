const { getAllGAEvents } = require('../controllers/gaAnalytics.controller')
const { oauthLogin, oauthCallback, validateOAuthLogin } = require('../controllers/oauth2.controller')

const oauthLoginRoute = require('express').Router()


oauthLoginRoute.get('/', oauthLogin)
oauthLoginRoute.get('/oauth2callback', oauthCallback)
oauthLoginRoute.get('/getallgaevents', validateOAuthLogin, getAllGAEvents)

module.exports = oauthLoginRoute