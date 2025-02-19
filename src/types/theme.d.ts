import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    content: string;
  }

  interface TypeText {
    title: string;
  }
}

// Extend palette to include custom colors
declare module '@mui/material/styles/createPalette' {
  interface TypeText {
    title: string;
  }
}
