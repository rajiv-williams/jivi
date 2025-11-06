import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dns from 'node:dns'
const path = require("path")

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [vue()],
  resolve: {
alias: {
"@": path.resolve(__dirname,"./src"),
}
},
  server: {
    host: '0.0.0.0', // or true
    port: 5173,
  },
})

// module.exports = {
//   devServer: {
//     host: '0.0.0.0', // or true
//     port:8000
//   },
//   runtimeCompiler: true,
//   transpileDependencies: []
// }



