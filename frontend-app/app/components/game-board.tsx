import StatisticsProvider from "./providers/statistics-provider";
import WordleProvider from "./providers/wordle-provider";
import Grid from "./grid/grid";
import KeyPad from "./key-pad/keypad";
import Modal from "./modal";

export default function GameBoard() {
    return (
        <StatisticsProvider>
            <WordleProvider>
                <Grid />
                <KeyPad />
                <Modal />
            </WordleProvider>
        </StatisticsProvider>
    );
}