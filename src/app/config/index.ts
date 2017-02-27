declare var require: any;
export const CONFIG = require('./config.json');

if (CONFIG.useUrlBase === true) {
    for (const property in CONFIG.urls) {
        CONFIG.urls[property] = CONFIG.urlBase + CONFIG.urls[property]
    }
}
