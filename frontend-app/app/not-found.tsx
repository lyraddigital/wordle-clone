'use client';

import Header from "./components/header/header";
import ThemeProvider from "./components/providers/theme-provider";

export default function NotFound() {
    return (
        <ThemeProvider>
            <div className="h-dvh flex flex-col items-center dark:text-white relative">
                <Header />
                <div className="absolute h-dvh flex flex-col justify-center">
                    <section className="w-full max-w-[500px] px-6 text-center">
                        <header className=" flex flex-col items-center">
                            <h2>
                                <span className="my-5 text-[7rem] block">404</span>
                                <span className="text-4xl uppercase font-bold">Not Found</span>
                            </h2>
                        </header>

                        <p className="mt-5 md:text-2xl">
                            I am sorry, but the page you are looking for could not be found.
                        </p>
                    </section>
                </div>
            </div>
        </ThemeProvider>
    );
}