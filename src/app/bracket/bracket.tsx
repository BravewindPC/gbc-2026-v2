"use client";

import { useMemo, useState } from "react";

export default function BracketPage() {
    const [selectedOption, setSelectedOption] = useState("Men's Doubles");
    const [isOpen, setIsOpen] = useState(false);

    const bracketImageSrc = useMemo(() => {
        switch (selectedOption) {
            case "Men's Singles":
                return "/MENSINGLE.png";
            case "Men's Doubles":
                return "/MENDOUBLE.png";
            case "Mixed Doubles":
                return "/MIXEDDOUBLE.png";
            default:
                return "/MENDOUBLE.png";
        }
    }, [selectedOption]);

    const options = ["Men's Doubles", "Men's Singles", "Mixed Doubles"];

    return (
        <div className="w-full min-h-screen bg-gradient-custom2 text-tourOrange">
            <div className="px-5 py-8 sm:px-10 sm:py-14 w-[98%] max-w-[1200px] mx-auto font-balmy">
                
                <div className="mb-5 md:mb-8 text-lg custom:text-2xl md:text-5xl shadow-outline tracking-wide font-balmy">
                    Bracket
                </div>

                <div className="relative z-20 inline-block mb-8">
                    <button
                        className="p-3 sm:p-4 mb-1 w-[160px] custom:w-[200px] md:w-[280px] text-sm custom:text-lg md:text-2xl bg-tourOrange text-tourDarkGreen hover:brightness-110 transition duration-300 flex justify-between items-center rounded-lg font-balmy shadow-lg border-2 border-transparent"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="text-left leading-tight">{selectedOption}</span>
                        <span className={`ml-2 text-xs md:text-sm text-tourDarkGreen transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    {isOpen && (
                        <>
                            <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setIsOpen(false)}
                            ></div>

                            <div className="absolute top-full left-0 mt-2 bg-tourOrange w-full rounded-xl shadow-2xl z-20 border-2 border-tourDarkGreen/20 overflow-hidden">
                                <ul className="py-2 text-tourDarkGreen flex flex-col">
                                    {options.map((option) => (
                                    <li
                                        key={option}
                                        className={`px-5 py-3 hover:bg-tourDarkGreen hover:text-tourOrange cursor-pointer transition-colors duration-200 font-balmy text-sm sm:text-lg md:text-xl ${selectedOption === option ? 'bg-tourDarkGreen/10' : ''}`}
                                        onClick={() => {
                                            setSelectedOption(option);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {option}
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>

                <div className="relative z-0 bg-tourDarkGreen w-full rounded-xl overflow-hidden shadow-2xl border border-tourOrange/20">
                    <div className="overflow-auto hide-scrollbar w-full h-[700px] sm:h-[700px]">
                        <div className="bg-[#144240] min-w-[900px] h-full mx-auto overflow-x-auto overflow-y-auto hide-scrollbar p-3 sm:p-6">
                            <img
                                src={bracketImageSrc}
                                alt={`${selectedOption} bracket`}
                                className="w-[1365px] max-w-none h-auto rounded-md"
                            />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}