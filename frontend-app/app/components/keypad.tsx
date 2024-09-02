import KeyPadKeySpacer from "./key-pad-key-spacer";
import KeyPadRow from "./key-pad-row";
import KeyPadAlphaKey from "./keypad-alpha-key";
import KeyPadKey from "./keypad-key";

const firstRowLetters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const secondRowLetters = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const thirdRowLetters = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

export default function KeyPad() {
    return (
        <div className="min-w-[350px] max-w-[500px] w-full flex flex-col gap-[8px]">
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
                <KeyPadKey value="Enter" classes="bg-neutral-500">Enter</KeyPadKey>
                {thirdRowLetters.map(l => (
                    <KeyPadAlphaKey key={l} letter={l} />
                ))}
                <KeyPadKey value="Backspace" classes="bg-neutral-500">Delete</KeyPadKey>
            </KeyPadRow>
        </div>
    );
}