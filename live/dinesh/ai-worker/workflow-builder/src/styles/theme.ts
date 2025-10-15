// theme.ts
export const theme = {
  colors: {
    bg: {
      primary: '#1a1a1a',
      secondary: '#2d2d30',
      tertiary: '#3e3e42',
      hover: '#4e4e52',
      panel: 'rgba(30, 0, 0, 0.6)', // glassmorphic red-black
    },
    border: {
      primary: '#3e3e42',
      secondary: '#505053',
      active: '#ff4d4f', // red accent
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#b0b0b0',
      tertiary: '#888888',
    },
    accent: {
      primary: '#ff4d4f', // red
      success: '#4ec9b0',
      warning: '#dcdcaa',
      danger: '#f48771',
    },
    node: {
      trigger: '#f48771',
      logic: '#4ec9b0',
      flow: '#ff4d4f',
      data: '#dcdcaa',
      widget: '#c586c0',
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  fontSize: {
    xs: '11px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
  },
  shadows: {
    sm: '0 2px 6px rgba(0,0,0,0.4)',
    md: '0 4px 12px rgba(0,0,0,0.5)',
    lg: '0 8px 24px rgba(0,0,0,0.6)',
  },
  animations: {
    fadeIn: 'fadeIn 0.3s ease-in-out',
    slideUp: 'slideUp 0.3s ease-out',
    pulse: 'pulse 2s ease-in-out infinite',
    glow: 'glow 0.3s ease-in-out',
  },
  glassmorphism: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    strong: 'rgba(255, 255, 255, 0.15)',
  }
}
