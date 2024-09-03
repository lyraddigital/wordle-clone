import { useEffect, useState } from "react";

import useWordle from "../hooks/use-wordle";

export default function Modal() {
    const { isGameOver, isCorrect } = useWordle();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (isGameOver) {
                setShowModal(true);
            }
        }, 3000);
    }, [isGameOver, setShowModal]);

    const handlePlayAgainClick = () => {
        window.location.reload();
    };

    return (
        showModal && (
            <div className="flex justify-center items-center fixed w-full h-full bg-white/50">
                <div className="min-w-[390px] p-[8px] border-1 bg-white border-neutral-500 rounded-[16px] shadow-inner">
                    <div className="flex justify-end">
                        <span className="mr-2 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path className="fill-neutral-400" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                            </svg>
                        </span>
                    </div>
                    <h2 className="text-center uppercase font-bold">Statistics</h2>
                    <div className="mt-2 flex justify-center">
                        <button className="bg-green-500 text-white text-2xl uppercase font-bold px-[6px] py-[1px]" onClick={handlePlayAgainClick}>
                            Play Again
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}