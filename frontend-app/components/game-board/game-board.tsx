'use client';

import Grid from "@/components/grid/grid";
import Help from "@/components/header/help";
import Statistics from "@/components/header/statistics";
import Switch from "@/components/header/switch";
import ModalsProvider from "@/components/providers/modals-provider";
import StatisticsProvider from "@/components/providers/statistics-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import WordleProvider from "@/components/providers/wordle-provider";
import KeyPad from "@/components/keypad/keypad";
import HelpModal from "@/components/modals/help-modal";
import StatisticsModal from "@/components/modals/statistics-modal/statistics-modal";

export default function GameBoard() {
    return (
        <ThemeProvider>
            <StatisticsProvider>
                <WordleProvider>
                    <ModalsProvider>
                        <Help />
                        <Statistics />
                        <Switch />
                        <Grid />
                        <KeyPad />
                        <HelpModal />
                        <StatisticsModal />
                    </ModalsProvider>
                </WordleProvider>
            </StatisticsProvider>
        </ThemeProvider>
    );
}