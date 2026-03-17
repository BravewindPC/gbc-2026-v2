"use client"
import { useEffect, useState } from "react";
import Bracket from "../components/bracket";
import Table from "../components/table";
import { GroupData, Match } from "@/lib/type";
import Head from "next/head";

export default function BracketPage() {
    const [selectedOption, setSelectedOption] = useState("Men's Doubles");
    const [dataGroup, setDataGroup] = useState<GroupData[]>([]);
    const [dataBracket, setDataBracket] = useState<Match[]>([]);

    useEffect(() => {
        const fetchDataGroup = async () => {
            try {
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
                const response = await fetch(`/api/groups/${type}`);
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDataGroup(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        const fetchDataBracket = async () => {
            try {
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
                const response = await fetch(`/api/bracket/${type}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDataBracket(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchDataGroup();
        fetchDataBracket();
    }, [selectedOption]);

    const options = ["Men's Doubles", "Men's Singles", "Mixed Doubles"];
    return (
        <>
            <Head>
                    <title>Bracket</title>
                    <meta name="description" content="Bracket dan Standings Group Stage GBC UBT 2024" />
            </Head>
            <div className=" py-8 sm:py-14  w-full h-full font-balmy text-templatePaleYellow">
                <div className="ml-[7%] flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                    {options.map((option) => {
                        const isSelected = selectedOption === option;

                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setSelectedOption(option)}
                                className={`p-2 sm:p-4 md:p-5 w-[130px] custom:w-[180px] md:w-[300px] text-xs custom:text-lg md:text-1xl leading-tight transition duration-300 ${
                                    isSelected
                                        ? "bg-templatePaleYellow text-[#175933]"
                                        : "bg-[#175933] text-templatePaleYellow hover:bg-templatePaleYellow hover:text-[#175933]"
                                }`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
                <div className=" mt-5 sm:mt-20 overflow-auto hide-scrollbar w-[85%] mx-auto h-[700px] sm:h-[900px] text-[#175933]">
                    <div className=" flex items-center bg-[#175933] min-w-[900px] h-full mx-auto overflow-x-auto hide-scrollbar">
                        <Bracket key={`bracket-${selectedOption}`} data={dataBracket}/>
                    </div>
                </div>
                {dataGroup.map((item,index) => (<div key={`group-${index}`} className=" my-5 sm:my-20 overflow-auto w-[85%] mx-auto text-[#175933]">
                    <div className="p-2 text-[#175933] shadow-outline-reverse-low text-xl">Group {index+1}</div>
                    <div className=" flex items-center bg-inherit mx-auto overflow-x-auto hide-scrollbar">
                        <Table
                            key={`table-${index}-${selectedOption}`}
                            type={
                                selectedOption === "Men's Singles" ? "MenSingle" :
                                selectedOption === "Men's Doubles" ? "MenDouble" :
                                selectedOption === "Mixed Doubles" ? "MixedDouble" :
                                "MenDouble"
                            }
                            data={item}
                        />
                    </div>
                </div>))}
            </div>
        </>
    );
}
