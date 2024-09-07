import useModals from "../../../hooks/use-modals";
import CenteredModalShell from "../shell/centered-modal-shell";

export default function HelpModal() {
    const { showHelpModal, setShowHelpModal } = useModals();

    return (
        <CenteredModalShell showModal={showHelpModal} showCloseBox={true} onClose={() => setShowHelpModal(false)} title="How to play">
            <div className="px-5 mt-[20px] text-sm max-h-[60vh] md:max-h-[40vh] overflow-auto">
                <p className="mt-[10px]">
                    The objective of the game is to guess the current 5 letter word, that Wordle is thinking of. You have a total of 6 turns to work out the word.
                </p>
                <hr className="my-4 border-1 border-neutral-300" />
                <section>
                    <h3 className="mt-[10px] text-center text-md font-bold uppercase">Color Hints</h3>
                    <p className="mt-[10px]">
                        Everytime you guess a word, the game will let you know how close your guess is to the word. This is done using color codes on each letter.
                    </p>
                    <section>
                        <h4 className="mt-[10px] text-sm font-bold">Examples</h4>
                        <div className="mt-[10px] flex gap-1">
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400 bg-green-600 text-white">B</div>
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400">E</div>
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400">A</div>
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400">S</div>
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400">T</div>
                        </div>
                        <p className="my-3">
                            When a letter is marked in green, this means that this letter is in the correct position. In the case of above the word you&apos;re trying to guess
                            starts with the letter <strong>B</strong>.
                        </p>
                        <div className="mt-[10px] flex gap-1">
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400">S</div>
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400">C</div>
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400">O</div>
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400 bg-yellow-400 text-white">R</div>
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400">E</div>
                        </div>
                        <p className="my-3">
                            When a letter is marked in yellow, this means that this letter exists in the word, but it is not in the correct position. In the case of above the word you&apos;re trying to guess
                            contains the letter <strong>R</strong>, but it&apos;s not the 4th letter.
                        </p>
                        <div className="mt-[10px] flex gap-1">
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400 bg-neutral-500 text-white">A</div>
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400">P</div>
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400">P</div>
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400">L</div>
                            <div className="py-2 px-3 text-3xl font-bold upper border-2 border-neutral-400">E</div>
                        </div>
                        <p className="my-3">
                            When a letter is marked in a dark grey color, this means that this letter does not exist anywhere in the word. In the case of above the <span>A</span> letter does not appear anywhere
                            in the word you&apos;re trying to guess, so you should not guess words with the letter A going forward.
                        </p>
                    </section>
                </section>
                <hr className="my-4 border-1 border-neutral-300" />
                <section>
                    <h3 className="mt-[10px] text-center text-md font-bold uppercase">Controls</h3>
                    <p className="mt-[10px]">
                        You can play this game in 3 ways. Using either your keyboard, mouse or both.
                    </p>
                    <section>
                        <h4 className="mt-[10px] text-sm font-bold">Keyboard</h4>
                        <p className="mt-[10px]">
                            Use your actual keyboard to type in the letters for your current guess. For each letter pressed it will populate
                            the next unfilled square in the grid until all 5 squares are filled in. Once you&quot;ve filled in the 5 letter offcially submit your guess
                            by pressing the enter key on your keyboard.
                        </p>
                        <p className="mt-[10px]">
                            If you happen to make a mistake by typing in the wrong letter, you can always use backspace key on your keyboard to remove letters from your current guess.
                        </p>
                    </section>
                    <section>
                        <h4 className="mt-[10px] text-sm font-bold">Mouse and the virtual keyboard</h4>
                        <p className="mt-[10px]">
                            For those using mobile devices or similar, OR those who just want to use their mouse instead of keyboard,
                            it may be easier to just use the virtual keyboard at the bottom of the screen. It performs all actions that the regular keyboard does.
                        </p>
                    </section>
                </section>
            </div>
        </CenteredModalShell>
    );
}