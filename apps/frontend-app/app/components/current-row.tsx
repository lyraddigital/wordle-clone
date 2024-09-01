import useCurrentGuess from "../hooks/use-current-guess";

export default function CurrentRow() {
    const currentGuess = useCurrentGuess();
    const letters = currentGuess.split("");

    return (
        <div className="flex gap-[5px] justify-center">
            {letters.map((letter, i) => (
                <div key={i} className="basis-[62px] h-[62px] shrink-0 text-white flex justify-center items-center text-3xl font-bold uppercase border-2">
                    {letter}
                </div>
            ))}
            {[...Array(5 - letters.length)].map((_, i) => (
                <div key={i} className="basis-[62px] h-[62px] shrink-0 text-white flex justify-center items-center text-3xl font-bold uppercase border-2"></div>
            ))}
        </div>
    );
}
