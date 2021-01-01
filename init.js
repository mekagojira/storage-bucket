const fs = require('fs')
const { exec } = require('child_process')

const [
    name = 'express-es6-mongodb-template',
    version = '1.0.0',
    description = 'Express ES6 MongoDB Template',
] = process.argv.slice(2)

console.log('Your config:')
console.log({ name, description, version })

const execute = (shell, callback) => {
    console.log(`Execute command: ${shell}`)
    exec(shell, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`)
            return
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return
        }
        console.log(`stdout: ${stdout || 'None'}`)
        if (typeof callback === 'function') callback()
    })
}

fs.readFile('package.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err)
    }

    const result = `{
  "name": "${name}",
  "version": "${version}",
  "description": "${description}",
  ${data.split('\n').splice(4).join('\n').trim()}`

    fs.writeFile('package.json', result, 'utf8', function (err) {
        if (err) return console.log(err)
        console.log('Save config success')

        execute('rm -rf .git', () =>
            execute('rm -rf node_modules', () =>
                execute('yarn', () => {
                    execute('git init', () =>
                        console.log('Pre-init successfully!')
                    )
                })
            )
        )
    })
})
