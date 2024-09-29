'use client';

import Header from "../components/header/header";
import LockIcon from "../components/icons/lock-icon";
import ThemeProvider from "../components/providers/theme-provider";

export default function NotAuthorized() {
    return (
        <ThemeProvider>
            <div className="h-dvh flex flex-col items-center dark:text-white relative">
                <Header />
                <div className="absolute h-dvh flex flex-col justify-center">
                    <section className="w-full max-w-[500px] px-6 text-center">
                        <header className=" flex flex-col items-center">
                            <div className="my-5">
                                <LockIcon />
                            </div>
                            <h2 className="text-4xl uppercase font-bold">Not Authorized. Is this still cached?</h2>
                        </header>

                        <p className="mt-5 md:text-2xl">
                            I am sorry but the page you are trying to access is not authorized.
                        </p>
                    </section>
                </div>
            </div>
        </ThemeProvider>
    );
}