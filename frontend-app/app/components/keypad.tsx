import KeyPadKey from "./keypadkey";

const firstRowLetters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const secondRowLetters = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const thirdRowLetters = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

export default function KeyPad() {
    return (
        <div className="min-w-[350px] max-w-[500px] w-full flex flex-col gap-[8px]">
            <div className="flex mx-3 gap-[2px] sm:gap-[6px]">
                {firstRowLetters.map(l => (
                    <KeyPadKey key={l} letter={l} />
                ))}
            </div>
            <div className="flex mx-3 gap-[2px] sm:gap-[6px]">
                <div className="flex-[0.5]"></div>
                {secondRowLetters.map(l => (
                    <KeyPadKey key={l} letter={l} />
                ))}
                <div className="flex-[0.5]"></div>
            </div>
            <div className="flex mx-3 gap-[2px] sm:gap-[6px]">
                <button className="p-0 flex-[1.5] text-neutral-300 text-xs uppercase font-bold h-[58px] rounded-[4px] bg-neutral-400">
                    Enter
                </button>
                {thirdRowLetters.map(l => (
                    <KeyPadKey key={l} letter={l} />
                ))}
                <button className="p-0 flex-[1.5] text-neutral-300 text-xs uppercase font-bold h-[58px] rounded-[4px] bg-neutral-400">
                    Delete
                </button>
            </div>
        </div>
    );
}