const Mixpanel = require('mixpanel')
require('dotenv').config();

const mixpanel = Mixpanel.init(process.env.MIXPANEL_PROJECT_TOKEN)

module.exports = { mixpanel }