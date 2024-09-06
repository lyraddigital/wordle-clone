import KeyPadKeySpacer from "./key-pad-key-spacer";
import KeyPadRow from "./key-pad-row";
import KeyPadAlphaKey from "./keypad-alpha-key";
import KeyPadKey from "./keypad-key";

const firstRowLetters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const secondRowLetters = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const thirdRowLetters = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

export default function KeyPad() {
    return (
        <div className="min-w-[350px] max-w-[500px] w-full flex flex-col gap-[8px] pb-5">
            <KeyPadRow>
                {firstRowLetters.map(l => (
                    <KeyPadAlphaKey key={l} letter={l} />
                ))}
            </KeyPadRow>
            <KeyPadRow>
                <KeyPadKeySpacer />
                {secondRowLetters.map(l => (
                    <KeyPadAlphaKey key={l} letter={l} />
                ))}
                <KeyPadKeySpacer />
            </KeyPadRow>
            <KeyPadRow>
                <KeyPadKey value="Enter" classes="text-[11px] bg-neutral-300 dark:bg-neutral-500">Enter</KeyPadKey>
                {thirdRowLetters.map(l => (
                    <KeyPadAlphaKey key={l} letter={l} />
                ))}
                <KeyPadKey value="Backspace" classes="text-[11px] font-bold bg-neutral-300 dark:bg-neutral-500 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                    </svg>
                </KeyPadKey>
            </KeyPadRow>
        </div>
    );
}