function withOpacity(variableName) {
  return ({ opacityValue = 1 } = {}) => {
    return `rgba(var(${variableName}), ${opacityValue})`
  }
}

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity("--color-fill"),
          main: withOpacity("--color-bg-main"),
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
          "button-accent": withOpacity("--color-button-accent"),
        },
      },
      borderColor: {
        skin: {
          fill: withOpacity("--color-fill"),
          main: withOpacity("--color-bg-main"),
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
          "button-accent": withOpacity("--color-button-accent"),
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
