import React from 'react';
import { useTheme, Typography } from '@mui/material';

const Loader: React.FC<{ open: boolean }> = ({ open }) => {
  const theme = useTheme();
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(24,24,27,0.7)' : 'rgba(250,250,250,0.7)',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s',
      }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: `drop-shadow(0 0 16px ${theme.palette.primary.main})`,
          marginBottom: 24,
        }}
      >
        <circle
          cx="40"
          cy="40"
          r="32"
          stroke={theme.palette.primary.main}
          strokeWidth="8"
          strokeDasharray="60 100"
          strokeLinecap="round"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="40"
          cy="40"
          r="20"
          stroke={theme.palette.secondary.main}
          strokeWidth="4"
          strokeDasharray="30 60"
          strokeLinecap="round"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 40 40"
            to="0 40 40"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.85)' : 'rgba(24,24,27,0.85)',
          fontWeight: 600,
          letterSpacing: 1,
          textShadow: `0 2px 8px ${theme.palette.primary.main}33`,
        }}
      >
        Loading...
      </Typography>
    </div>
  );
};

export default Loader; 