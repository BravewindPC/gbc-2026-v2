import Image from "next/image";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar"

export default function Home() {
    return (
        <div className=" text-templateDarkBlue w-full">
            <div className="flex flex-col w-[85%] mx-auto my-5 custom:my-11 bg-gradient-custom2 p-5 rounded-xl md:rounded-3xl">
                {/* 4 Grid Layout */}
                <div className="mt-8 sm:mt-12 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                    
                    {/* Grid 1: Logo and Title */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-4 custom:gap-6">
                            <div className="w-[100px] h-[100px] custom:w-[160px] custom:h-[160px] md:w-[200px] md:h-[200px] flex-shrink-0 thick-shadow">
                                <Image src="/LogoS.png" layout="fill" alt="logo" objectFit="contain" />
                            </div>
                            <div className="flex flex-col font-balmy text-[8px] custom:text-sm md:text-lg text-templatePaleYellow thick-shadow">
                                <div>Ganesha</div>
                                <div>Badminton</div>
                                <div>Championship</div>
                                <div>2026</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Grid 2: Apa itu GBC? */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center text-center">
                            <div className="text-base custom:text-2xl md:text-2xl font-balmy text-templateWhite thick-shadow">
                                Apa itu GBC?
                            </div>
                            <div className="mt-3 sm:mt-4 md:mt-4 font-monserrat text-[6px] custom:text-xs md:text-sm text-templateWhite px-2">
                                Ganesha Badminton Championship adalah sebuah kompetisi yang diselenggarakan oleh 
                                Unit Bulu Tangkis Institut Teknologi Bandung (UBT ITB). 
                                Ganesha Badminton Championship dilaksanakan 
                                setiap 2 tahun sekali secara bergantian dengan OLIM KM yang diselenggarakan oleh KM ITB. 
                                Ganesha Badminton Championship bertujuan untuk mewadahi minat dan bakat mahasiswa ITB dalam 
                                bidang bulu tangkis yang dilakukan dengan mengadakan suatu kompetisi bulu tangkis.
                            </div>
                        </div>
                    </div>

                    {/* Grid 3: Tanggal */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center text-center">
                            <div className="text-base custom:text-2xl md:text-2xl font-balmy text-templateWhite thick-shadow">
                                Tanggal
                            </div>
                            <div className="mt-3 sm:mt-4 md:mt-4 font-monserrat text-xs custom:text-lg md:text-xl text-templateWhite font-bold">
                                25 April - 10 May 2026
                            </div>
                        </div>
                    </div>

                    {/* Grid 4: Lokasi */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center text-center">
                            <div className="text-base custom:text-2xl md:text-2xl font-balmy text-templateWhite thick-shadow">
                                Lokasi
                            </div>
                            <div className="mt-3 sm:mt-4 md:mt-4 font-monserrat text-xs custom:text-lg md:text-xl text-templateWhite font-bold">
                                GOR KONI
                            </div>
                            <div className="mt-2 sm:mt-3 font-monserrat text-[6px] custom:text-xs md:text-sm text-templateWhite px-2">
                                Jl. Jakarta No.18, Kacapiring, Kec. Batununggal, Kota Bandung, Jawa Barat
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[100px]"></div>
                {/* <div className="flex flex-col items-center justify-center">
                     <div className=" mt-52 sm:mt-60 lg:mt-32 text-xl custom:text-3xl md:text-5xl font-balmy text-templateWhite thick-shadow text-center">
                        SPONSORSHIP
                    </div>
                    <div className=" mt-3 sm:mt-8 lg:mt-18 w-full h-[50px] custom:h-[100px] md:h-[180px]">
                        <Image src="/sponsor.png" layout="fill" alt="logo" objectFit="contain" />
                    </div>
                </div> */}
            </div>
        </div>
    );
}