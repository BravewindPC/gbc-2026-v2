import { PrismaClient } from "@prisma/client";

// 1. Definisi fungsi pembuat instance
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// 2. DI SINI letak blok declare global tersebut
declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// 3. Inisialisasi variabel db menggunakan globalThis
export const db = globalThis.prisma ?? prismaClientSingleton();

// 4. Jika bukan production, simpan db ke globalThis agar tidak membuat koneksi baru saat reload
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;