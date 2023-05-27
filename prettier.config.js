/* eslint-disable no-undef */
module.exports = {
    plugins: [require('prettier-plugin-tailwindcss')],
    tailwindConfig: 'tailwind.config.js',
    tailwindAttributes: ['myClassList'],
    tailwindFunctions: ['tw'],
  }