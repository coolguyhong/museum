/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import './vee-validate.js'
import './axios.js'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
}
