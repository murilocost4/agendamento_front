// postcss.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),          // Use 'tailwindcss' corretamente
    require('autoprefixer'),         // Adicione o Autoprefixer, se necessário
  ],
}
