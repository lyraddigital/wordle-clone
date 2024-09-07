'use client';

import Help from "./header/help";
import Statistics from "./header/statistics";
import Switch from "./header/switch";
import ModalsProvider from "./providers/modals-provider";
import StatisticsProvider from "./providers/statistics-provider";
import ThemeProvider from "./providers/theme-provider";
import WordleProvider from "./providers/wordle-provider";
import Grid from "./grid/grid";
import KeyPad from "./key-pad/keypad";
import HelpModal from "./modals/help-modal/help-modal";
import StatisticsModal from "./modals/statistics-modal/statistics-modal";

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