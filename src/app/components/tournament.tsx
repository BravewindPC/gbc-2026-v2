"use client"
import { Match, Organization } from "@/lib/type";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { PopupAdmin } from "./popupadmin";
import { PopupClient } from "./popupclient";

interface TournamentProps {
    client: boolean;
}

const Tournament: React.FC<TournamentProps> = ({ client }) => {
    const options = ["Men's Doubles", "Men's Singles", "Mixed Doubles"];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Men's Doubles");
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 4, 25));
    const [dataSchedule, setDataSchedule] = useState<Match[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<Match | null>(null);

    function formatDate(date:Date) {
        const d = new Date(date),
            month = '' + (d.getMonth()),
            day = '' + d.getDate(),
            year = d.getFullYear();

        return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
    }

    const handleScheduleClick = (scheduleData:Match) => {
        setSelectedSchedule(scheduleData);
        setIsPopupVisible(true);
    };

    useEffect(() => {
        const fetchDataGroup = async () => {
            let type;
            switch (selectedOption) {
                case "Men's Singles":
                    type = "MenSingle";
                    break;
                case "Men's Doubles":
                    type = "MenDouble";
                    break;
                case "Mixed Doubles":
                    type = "MixedDouble";
                    break;
                default:
                    type = "MenDouble";
            }

            const formattedDate = formatDate(selectedDate);
            const response = await fetch(`/api/schedule/${type}/${formattedDate}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json();
            data = data.sort((a: Match, b: Match) => {
                const dateA = a.dateStart ? new Date(a.dateStart) : new Date(0);
                const dateB = b.dateStart ? new Date(b.dateStart) : new Date(0);
            
                const timeComparison = dateA.getTime() - dateB.getTime();
                if (timeComparison !== 0) {
                    return timeComparison;
                }
        
                const courtA = a.court || 0;
                const courtB = b.court || 0;
                return courtA - courtB;
            });
            setDataSchedule(data);
        };

        fetchDataGroup().catch(console.error);
    }, [selectedOption, selectedDate]);

    function normalizeMatch(match: Match): Match {
        return {
            ...match,
            players1: match.players1 ?? "TBD",
            players2: match.players2 ?? "TBD",
            organization1: match.organization1 ?? null,
            organization2: match.organization2 ?? null,
            score1: match.score1 ?? [],
            score2: match.score2 ?? [],
            dateStart: match.dateStart ?? null,
            dateEnd: match.dateEnd ?? null,
            court: match.court ?? null,
            round: match.round ?? null,
        }
    }

    return (
        <div className=" px-5 py-8 sm:px-10 sm:py-14 w-[98%] max-w-[1000px] mx-auto font-balmy text-tourOrange">
            
            <div className=" mb-5 md:mb-8 text-lg custom:text-2xl md:text-5xl shadow-outline tracking-wide font-balmy">
                Match Schedule 25 April - 10 May 2026
            </div>
            
            <div className="relative z-20 h-[50px] sm:h-[60px] md:h-[70px]"> {/* Fixed height container prevents pushing */}
                <div className="absolute top-0 left-0"> {/* Anchor the dropdown to the top-left */}
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
            </div>
            
            <div className="mt-10 bg-tourDarkGreen w-full rounded-xl overflow-hidden shadow-2xl">
                
                <div className=" flex justify-evenly w-full bg-tourDarkGreen cursor-pointer border-b-2 border-tourOrange/20">
                    <div 
                        onClick={() => setSelectedDate(new Date(2026, 4, 25))}
                        className={`h-8 custom:h-10 md:h-14 text-[10px] custom:text-[12px] sm:text-lg md:text-2xl whitespace-nowrap leading-none flex justify-center items-center w-full transition duration-200 ease-in ${
                            formatDate(selectedDate) === formatDate(new Date(2026, 4, 25))
                            ? 'bg-tourOrange text-tourDarkGreen'
                            : 'text-tourOrange hover:bg-tourOrange hover:text-tourDarkGreen'
                        }`}
                    >
                        25 Apr
                    </div>
                    <div 
                        onClick={() => setSelectedDate(new Date(2026, 4, 26))}
                        className={`h-8 custom:h-10 md:h-14 text-[10px] custom:text-[12px] sm:text-lg md:text-2xl whitespace-nowrap leading-none flex justify-center items-center w-full transition duration-200 ease-in ${
                            formatDate(selectedDate) === formatDate(new Date(2026, 4, 26))
                            ? 'bg-tourOrange text-tourDarkGreen'
                            : 'text-tourOrange hover:bg-tourOrange hover:text-tourDarkGreen'
                        }`}
                    >
                        26 Apr
                    </div>
                    <div 
                        onClick={() => setSelectedDate(new Date(2026, 5, 3))}
                        className={`h-8 custom:h-10 md:h-14 text-[10px] custom:text-[12px] sm:text-lg md:text-2xl whitespace-nowrap leading-none flex justify-center items-center w-full transition duration-200 ease-in ${
                            formatDate(selectedDate) === formatDate(new Date(2026, 5, 3))
                            ? 'bg-tourOrange text-tourDarkGreen'
                            : 'text-tourOrange hover:bg-tourOrange hover:text-tourDarkGreen'
                        }`}
                    >
                        3 May
                    </div>
                    <div 
                        onClick={() => setSelectedDate(new Date(2026, 5, 9))}
                        className={`h-8 custom:h-10 md:h-14 text-[10px] custom:text-[12px] sm:text-lg md:text-2xl whitespace-nowrap leading-none flex justify-center items-center w-full transition duration-200 ease-in ${
                            formatDate(selectedDate) === formatDate(new Date(2026, 5, 9))
                            ? 'bg-tourOrange text-tourDarkGreen'
                            : 'text-tourOrange hover:bg-tourOrange hover:text-tourDarkGreen'
                        }`}
                    >
                        9 May
                    </div>
                    <div 
                        onClick={() => setSelectedDate(new Date(2026, 5, 10))}
                        className={`h-8 custom:h-10 md:h-14 text-[10px] custom:text-[12px] sm:text-lg md:text-2xl whitespace-nowrap leading-none flex justify-center items-center w-full transition duration-200 ease-in ${
                            formatDate(selectedDate) === formatDate(new Date(2026, 5, 10))
                            ? 'bg-tourOrange text-tourDarkGreen'
                            : 'text-tourOrange hover:bg-tourOrange hover:text-tourDarkGreen'
                        }`}
                    >
                        10 May
                    </div>
                </div>

                <div className="flex flex-col gap-4 p-3 sm:p-5">
                    {dataSchedule.map((rawMatch, index) => {
                        const match = normalizeMatch(rawMatch);
                        const isEven = index % 2 === 0;
                        return (
                        <div 
                            key={index}
                            onClick={() => handleScheduleClick(match)} 
                            className={`relative overflow-hidden cursor-pointer rounded-2xl shadow-lg border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-center px-3 py-4 sm:px-6 sm:py-5 ${
                                isEven
                                ? 'bg-tourDarkGreen text-tourOrange border-tourOrange/40'
                                : 'bg-tourOrange text-tourDarkGreen border-tourDarkGreen/40'
                            }`}
                        >
                            <div className={`absolute -right-6 -top-6 w-20 h-20 sm:w-32 sm:h-32 rounded-full opacity-10 pointer-events-none ${isEven ? 'bg-tourOrange' : 'bg-tourDarkGreen'}`}></div>
                            <div className={`absolute -left-4 -bottom-4 w-12 h-12 sm:w-20 sm:h-20 rounded-full opacity-10 pointer-events-none ${isEven ? 'bg-tourOrange' : 'bg-tourDarkGreen'}`}></div>

                            <div className="relative z-10 flex flex-col w-full gap-3 sm:gap-4">
                                <div className="flex justify-between items-start w-full text-[7px] custom:text-[9px] sm:text-xs font-monserrat font-bold opacity-90 border-b border-dashed border-current pb-2">
                                    <div className="w-1/3 text-left">
                                        {match.dateStart ? 
                                            `Starting at ${new Date(match.dateStart).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false,timeZone:'UTC' })}` :
                                            'Start time TBA'
                                        }
                                    </div>
                                    
                                    <div className="w-1/3 text-center tracking-widest uppercase">
                                        {match.court ? `Court ${match.court}` : ''}
                                    </div>

                                    <div className="w-1/3 flex justify-end">
                                        {match.live ? (
                                            <div className="inline-flex items-center text-red-500 gap-[3px] custom:gap-[7px] sm:gap-[10px]">
                                                <span className="w-[6px] h-[6px] custom:w-2 custom:h-2 sm:w-[10px] sm:h-[10px] bg-red-500 rounded-full animate-blink duration-1000"></span>
                                                Live
                                            </div>
                                        ) : (() => {
                                            const startDate = match.dateStart ? new Date(match.dateStart) : null;
                                            const endDate = match.dateEnd ? new Date(match.dateEnd) : null;
                                            
                                            if (startDate && endDate && endDate > startDate) {
                                                const totalMinutes = Math.round(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60));
                                                const hours = Math.floor(totalMinutes / 60);
                                                const minutes = totalMinutes % 60;
                                                return (
                                                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                                                        <FaClock className="text-[8px] sm:text-sm"/>
                                                        <span>{`${hours}:${minutes.toString().padStart(2, '0')}`}</span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </div>
                                </div>
                                
                                <div className="flex w-full items-center justify-between">
                                    
                                    <div className="flex flex-col items-center justify-center w-[35%] text-center">
                                        <div className="font-balmy font-normal text-[9px] custom:text-[12px] sm:text-xl leading-snug px-1">
                                            {match.players1 || "TBD"}
                                        </div>
                                        <div className="font-monserrat font-bold text-[8px] custom:text-[10px] sm:text-sm mt-1 sm:mt-2">
                                            {match.organization1}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center w-[30%] gap-1 sm:gap-2">
                                    
                                        
                                        <div className="flex flex-col items-center font-balmy font-normal text-[10px] custom:text-[12px] sm:text-2xl gap-1">
                                            {match.score1.length > 0 && match.score1.length === match.score2.length ? (
                                                match.score1.map((score, idx) => (
                                                    <div key={idx} className="flex items-center justify-center w-full">
                                                        <span className="w-7 custom:w-9 sm:w-12 text-right">{score}</span>
                                                        <span className="mx-1 sm:mx-3 text-[8px] sm:text-lg opacity-50">-</span>
                                                        <span className="w-7 custom:w-9 sm:w-12 text-left">{match.score2[idx]}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="opacity-50 text-[10px] sm:text-lg mt-1">VS</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center w-[35%] text-center">
                                        <div className="font-balmy font-normal text-[9px] custom:text-[12px] sm:text-xl leading-snug px-1">
                                            {match.players2 || "TBD"}
                                        </div>
                                        <div className="font-monserrat font-bold text-[8px] custom:text-[10px] sm:text-sm mt-1 sm:mt-2">
                                            {match.organization2}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ) }
                    )}
                </div>

                {dataSchedule.length === 0 && (
                    <div className="text-center mx-5 mb-5 py-8 px-4 text-tourDarkGreen font-balmy italic border-2 border-dashed border-tourDarkGreen/30 rounded-xl bg-white/20 backdrop-blur-sm">
                        <p className="text-[10px] custom:text-xs sm:text-base leading-relaxed">No matches available for this category or date.</p>
                    </div>
                )}
            </div>

            {isPopupVisible && selectedSchedule && (
                <div className="relative z-[999]">
                    {client ? 
                        <PopupClient onClose={() => setIsPopupVisible(false)} match={selectedSchedule} /> : 
                        <PopupAdmin onClose={() => setIsPopupVisible(false)} match={selectedSchedule} />
                    }
                </div>
            )}
        </div>
    );
}

export default Tournament;