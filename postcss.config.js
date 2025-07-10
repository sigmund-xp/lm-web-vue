// postcss.config.js
const { PurgeCSS } = require('@fullhuman/postcss-purgecss')


const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    require('autoprefixer'),
    ...(isProduction
      ? [
          PurgeCSS({
            content: [
              './index.html',
              './src/**/*.vue',
              './src/**/*.js',
              './src/**/*.ts',
            ],
            safelist: [
              /^v-/,             // Vuetify components (v-btn, v-card, etc)
              /^theme--/,        // Theme classes
              /^text--/,         // Text classes
              /^bg--/,           // Background helpers
              /^elevation-/,     // Elevation helpers
              /^rounded-/,       // Border radius
              /^d-/, /^ma-/, /^pa-/, /^mt-/, /^ml-/, /^mr-/, /^mb-/, // Spacing
              'application',     // Vuetify main app class
              'container', 'row', 'col', // Grid system
            ],
            defaultExtractor: content =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
}
