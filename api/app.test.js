import { test, decribe, before, after } from 'node:test'
import assert from 'node:assert'
import app from './app.js'
import { resolve } from 'node:dns'

let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

//antes de todos los test, se ejecuta UNA vez, para levantar el servidor
before(async () =>{
    return new Promise((resolve, reject) =>{
        server = app.listen(PORT, () => resolve())
        server.on('error', reject)
    })
})

//despues de todos los test, se ejecuta UNA vez, para cerrar el servidor
after(async () => {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) return reject(err)
            resolve()
        })
    })
})