
'use client';

import { useState } from "react";
import Image from "next/image";

export default function page() {
    const [selectedDay, setSelectedDay] = useState(1);

    const days = [1, 2, 3, 4, 5];
    const photosPerDay = 9;

    return (
        <div className="w-full min-h-screen bg-gradient-custom2 text-templateDarkBlue">
            <div className="w-[85%] mx-auto py-8 custom:py-12 lg:py-16">
                
                {/* Day Selection Buttons */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 font-balmy text-sm sm:text-base md:text-xl rounded-lg transition-all ${
                                selectedDay === day
                                    ? 'bg-templateDarkBlue text-templatePaleYellow thick-shadow'
                                    : 'bg-templatePaleYellow text-templateDarkBlue hover:bg-opacity-80'
                            }`}
                        >
                            Day {day}
                        </button>
                    ))}
                </div>

                {/* Photo Gallery Grid */}
                <div className="mt-8 md:mt-12">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-balmy text-templateWhite text-center mb-8 thick-shadow">
                        Day {selectedDay} Gallery
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {[...Array(photosPerDay)].map((_, index) => (
                            <div 
                                key={index}
                                className="bg-templateWhite rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-[250px] sm:h-[280px] md:h-[320px] flex items-center justify-center border-2 border-dashed border-templateDarkBlue"
                            >
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl text-templateDarkBlue mb-2">📷</div>
                                    <p className="text-templateDarkBlue font-monserrat text-sm md:text-base">
                                        Photo {index + 1}
                                    </p>
                                    <p className="text-templateDarkBlue font-monserrat text-xs text-gray-500 mt-1">
                                        (Placeholder)
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}