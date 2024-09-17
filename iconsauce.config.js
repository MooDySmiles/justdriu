module.exports = {
  content: [
    './src/pages/**/*.{js,json,ts,tsx,html}',
    './src/components/**/*.{js,json,ts,tsx,html}',
    './node_modules/@maggioli-design-system/*/src/**/*.{ts,tsx}',
  ],
  plugin: [
    require('@iconsauce/material-icons'),
  ],
}
