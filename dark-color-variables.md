:root {
    /* Background Colors */
    --bg-primary: #0a0b0d;        /* Main background (darkest) */
    --bg-secondary: #13151a;      /* Card/section backgrounds */
    --bg-tertiary: #1a1d23;       /* Elevated elements */
    --bg-hover: #22252d;          /* Hover states */
    
    /* Text Colors */
    --text-primary: #ffffff;       /* Main headings */
    --text-secondary: #9ca3af;     /* Subtitles/secondary text */
    --text-tertiary: #6b7280;      /* Muted text */
    --text-disabled: #4b5563;      /* Disabled/very muted */
    
    /* Accent Colors */
    --accent-primary: #3b82f6;     /* Primary actions (blue) */
    --accent-success: #10b981;     /* Success states (green) */
    --accent-warning: #f59e0b;     /* Warning states (orange) */
    --accent-danger: #ef4444;      /* Error/danger (red) */
    --accent-info: #8b5cf6;        /* Info states (purple) */
    
    /* Border & Dividers */
    --border-primary: #2d3139;     /* Main borders */
    --border-secondary: #1f2228;   /* Subtle borders */
    
    /* Interactive Elements */
    --button-bg: #1a1d23;          /* Default button background */
    --button-hover: #22252d;       /* Button hover state */
    --input-bg: #13151a;           /* Input field background */
    --input-border: #2d3139;       /* Input borders */
    
    /* Status Colors */
    --status-active: #3b82f6;      /* Active/selected state */
    --status-pending: #f59e0b;     /* Pending/in-progress */
    --status-complete: #10b981;    /* Completed state */
}

Implementation Instructions:

Replace all background colors with the corresponding dark theme colors
Update all text colors to ensure proper contrast on dark backgrounds
Adjust border colors to be visible but subtle on dark backgrounds
Ensure hover states are lighter than base states for proper feedback
Keep all padding, margins, positions, and layouts exactly as they are
Only modify: background-color, color, border-color, box-shadow colors, and fill/stroke for SVGs

Additional Considerations:

Add subtle shadows with rgba(0,0,0,0.3) for depth
Use semi-transparent overlays where needed: rgba(255,255,255,0.05)
Ensure AA compliance for text contrast ratios
Apply transitions for smooth color changes: transition: background-color 0.2s, color 0.2s