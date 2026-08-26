/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        navy:        "#062B6F",
        navyDark:    "#031E52",
        brand:       "#1769FF",
        success:     "#12A95C",
        successSoft: "#DDF7E7",
        warn:        "#FF9B19",
        warnSoft:    "#FFF4E0",
        purple:      "#7654D8",
        ink:         "#0E1B36",
        muted:       "#71809A",
        edge:        "#E5EAF1",
        surface:     "#F8FAFD",
        danger:      "#E5484D",
        dangerSoft:  "#FDECEC",
      },
    },
  },
  plugins: [],
};