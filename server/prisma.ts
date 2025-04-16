import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Browser environment: this function does not persist data in the browser.
     * Instead, it logs a message and returns null.
     */
/*******  a9b3a2e8-90f9-4f42-8a6e-68b3aec09c80  *******/}

export default prisma