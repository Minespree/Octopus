const repl = require('repl')

// initialize all the non-express stuff
const fs = require('fs')
global.settings = require('./settings/dev') // TODO: Let's fix this later
const path = require('path')
const sequelize = require('./services/sequelize')

const modelFiles = fs.readdirSync(path.join(__dirname, 'models'))
modelFiles.forEach(f => {
    global[f.substring(0, f.length - 3)] = require(path.join(__dirname, 'models', f))
})

sequelize.sync().then(() => repl.start())