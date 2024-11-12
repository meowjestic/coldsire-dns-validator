import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// add multiple data dns to prisma
export async function addMultipleDns(data) {
    try {
        const createMany = await prisma.dnsValidationHistory.createMany({
            data: data,
            skipDuplicates: true,
        })

        return [true, null]
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return [false,error.message]
        }
    }
}

// add data dns to prisma
export async function addDns(data) {
    try {
        const create = await prisma.dnsValidationHistory.create({
            data: {
                domain : data.domain,
                spf: data.spf,
                dkim: data.dkim,
                dmarc: data.dmarc,
                is_checked: true,
            },
        })
    
        return [true, create]
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if(error.code == "P2002"){
                return [false, 'Email is unique, your inputted email already exist']
            }
            return [false,error.message]
        }
    }
}

// update data dns
export async function updateDns(data){
    try {
        const update = await prisma.dnsValidationHistory.upsert({
            where: {
                domain : data.domain,
                is_checked: false,
            },
            update: {
                domain : data.domain,
                spf : data.spf,
                dkim: data.dkim,
                dmarc : data.dmarc,
                is_checked : true
            },
            create: {
                domain : data.domain,
                spf : data.spf,
                dkim: data.dkim,
                dmarc : data.dmarc,
                is_checked : true
            },
        })
        
        return [true,update]
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return [false,error.message]
        }
    }
}

// read all data dns
export async function getAllDns(){
    try {
        const fetchAll = await prisma.dnsValidationHistory.findMany()
        return [true, fetchAll]
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return [false,error.message]
        }
    }
}

// clean table
export async function wipeTableDns(){
    try {
        const deleteAll = await prisma.dnsValidationHistory.deleteMany({})
        return [true,null]
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return [false,error.message]
        }
    }
}