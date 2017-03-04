declare var require: any;
export const CONFIG = require('./config.json');

if (CONFIG.useUrlBase === true) {
  for (const property in CONFIG.urls) {
    if (CONFIG.urls[property]) {
      CONFIG.urls[property] = CONFIG.urlBase + CONFIG.urls[property]
    }
  }
}

try {
  if (CONFIG.crypto.hash.iterations && CONFIG.crypto.hash.iterationsProductionMode && CONFIG.modeProduction) {
    CONFIG.crypto.hash.iterations = CONFIG.crypto.hash.iterationsProductionMode;
  }
} catch (err) { }
