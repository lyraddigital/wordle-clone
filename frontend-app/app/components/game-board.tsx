import Help from "./header/help";
import Statistics from "./header/statistics";
import ModalsProvider from "./providers/modals-provider";
import StatisticsProvider from "./providers/statistics-provider";
import WordleProvider from "./providers/wordle-provider";
import Grid from "./grid/grid";
import KeyPad from "./key-pad/keypad";
import HelpModal from "./modals/help-modal/help-modal";
import StatisticsModal from "./modals/statistics-modal/statistics-modal";

export default function GameBoard() {
    return (
        <StatisticsProvider>
            <WordleProvider>
                <ModalsProvider>
                    <Help />
                    <Statistics />
                    <Grid />
                    <KeyPad />
                    <HelpModal />
                    <StatisticsModal />
                </ModalsProvider>
            </WordleProvider>
        </StatisticsProvider>
    );
}