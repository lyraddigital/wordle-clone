export interface ExistingRowProps {
    guess: { key: string, colour: string }[];
}

export default function ExistingRow({ guess }: ExistingRowProps) {
    return (
        <div className="flex gap-[5px] justify-center">
            {guess.map((l, i) => (
                <div key={i} className="basis-[62px] h-[62px] shrink-0 text-white flex justify-center items-center text-3xl font-bold uppercase border-2">
                    {l.key}
                </div>
            ))}
        </div>
    );
}
