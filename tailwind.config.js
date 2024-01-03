const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

    },
    screens: {
      'xs': { 'min': '470px', 'max': '640px' },
      'pdXs': { 'max': '469px' },
      'nbXs': { 'max': '500px' },
      'sm-max': { 'max': '640px' },
      "sm-phoneMax" : { 'max': '350px' },
      "sm-phoneMin" : { 'min': '350px' },

    },
  },
  plugins: [],
});