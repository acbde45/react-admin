import { createTheme } from '@material-ui/core/styles';

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

// spacing
const spacing = 6;

declare module '@material-ui/core/styles/createTheme' {}

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    spacing: number;
  }

  interface CommonColors {
    darkBlack: string;
  }
}

// A custom theme for this app
const theme = createTheme({
  spacing,
  breakpoints: {
    // Define custom breakpoint values.
    // These will apply to Material-UI components that use responsive
    // breakpoints, such as `Grid` and `Hidden`. You can also use the
    // theme breakpoint functions `up`, `down`, and `between` to create
    // media queries for these breakpoints
    values: {
      xl,
      lg,
      md,
      sm,
      xs,
    },
  },
});

export default theme;
