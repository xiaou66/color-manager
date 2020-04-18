// eslint-disable-next-line no-undef
const initSqlJs = require('../lib/sql-wasm')
export default () => {
  return new Promise((resolve, reject) => {
    initSqlJs({
      // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
      // You can omit locateFile completely when running in node
      locateFile: file => 'https://cdn.staticfile.org/sql.js/1.2.2/dist/sql-wasm.wasm'
    }).then(SQL => {
      // eslint-disable-next-line no-undef
      const filebuffer = window.fs.readFileSync(`${utools.getPath('userData')}/database/colors.db`)
      const db = new SQL.Database(filebuffer)
      resolve(db)
    }).catch(err => {
      reject(err)
    })
  })
}
