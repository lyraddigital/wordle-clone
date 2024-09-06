import Help from "./help";
import Switch from "./switch";

export default function Header() {
    return (
        <header className="flex justify-center w-full border-b-2 border-b-neutral-600 max-w-[500px] mx-6 px-2">
            <Help />
            <h1 className="text-4xl uppercase dark:text-white text-center my-4">Wordle</h1>
            <Switch />
        </header>
    );
}

