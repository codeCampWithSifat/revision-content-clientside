/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui : {
    themes : [
      {
        mytheme : {
          primary: "#0FCFEC",
          secondary: "#19D3AE",
          neutral: "#3A4256",
          accent: "#37CDBE",
          "base-100": "#FFFFFF",
        }
      }
    ]
  },
  theme: {
    extend: {},
  },
  // sifatPortal: {
  //   themes: [
  //     {
  //       mytheme: {
  //         primary: "#0FCFEC",
  //         secondary: "#19D3AE",
  //         neutral: "#3A4256",
  //         accent: "#37CDBE",
  //         "base-100": "#FFFFFF",
  //       },
  //     },
  //   ],
  // },

  plugins: [require("daisyui")],
};
