/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        gilory: ["Gilory", "sans-serif"],
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        black: "var(--black-c)",
        white: "var(--white)",
      },
      borderRadius: {
        lg: "60px",
        md: "20px",
        sm: "10px",
      },
      screens: {
        "m-xlg": { max: "1600px" },
        "m-lg": { max: "1250px" },
        "m-md": { max: "1024px" },
        "m-sm": { max: "767px" },
      },
    },
  },
  plugins: [],
};
