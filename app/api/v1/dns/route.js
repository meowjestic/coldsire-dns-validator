import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import { addMultipleDns, wipeTableDns } from '../../../../src/services/DnsValidationHistory';
import { Readable } from 'stream';

export async function POST(req) {
    const formData = await req.formData()
    const file = formData.get("file")

    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const bufferFile = Readable.from(buffer)

    if (bufferFile) {
        Papa.parse(bufferFile, {
            header: false,
            skipEmptyLines: true,
            complete: (result) => {
                const domains = result.data.map(row => row[0]); // Assuming each row has a domain in the first column
                const sendData = [];
                domains.forEach(data => {
                    let d = { 'domain' : data}
                    sendData.push(d)
                })
                const add = addMultipleDns(sendData)
                // const add = wipeTableDns()
                if (!add[0]) {
                    return NextResponse.json({ error: add[1] }, { status: 400 })
                }
            },
        });
    }



    return NextResponse.json({ message: "success" }, { status: 400 })
}