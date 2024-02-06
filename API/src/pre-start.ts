// NOTE: DO NOT IMPORT ANY SOURCE CODE HERE
import path from 'path'
import dotenv from 'dotenv'

// Set the env
const result2 = dotenv.config({
  path: path.join(__dirname, `../env/development.env`),
})
if (result2.error) {
  throw result2.error
}
