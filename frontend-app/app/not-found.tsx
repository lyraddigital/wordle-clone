'use client';

import ThemeProvider from "./components/providers/theme-provider";

export default function NotFound() {
    return (
        <ThemeProvider>
            <p>Not Found</p>
        </ThemeProvider>
    );
}