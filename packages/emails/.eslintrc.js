const OFF = 'off'

module.exports = {
  root: true,
  extends: ['plugin:react/recommended', 'plugin:tailwindcss/recommended', 'custom'],
  plugins: ['react', 'tailwindcss'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/no-unescaped-entities': OFF,
    'react/display-name': OFF,
    'tailwindcss/no-custom-classname': OFF,
    'tailwindcss/classnames-order': OFF,
  },
}
