import { NextResponse } from 'next/server';
import { addDns , getAllDns } from '@/src/services/DnsValidationHistory';
import {checkSPF,checkDKIM,checkDMARC} from '@/src/utils'


// Main API function to handle DNS checks
export async function POST(req) {
  // const { domain } = await req.json();
  const formData = await req.formData()
  const domain = formData.get('domain')

  const spf = await checkSPF(domain);
  const dkim = await checkDKIM(domain);
  const dmarc = await checkDMARC(domain);

  // Store the result
  console.log('updating...')
  const result = { domain , spf, dkim, dmarc, created_at: new Date() };
  const addDnsToDatabase = await addDns(result)

  console.log(`updated : ${JSON.stringify(addDnsToDatabase)}`)

  if(addDnsToDatabase[0]){
    return NextResponse.json(result);
  }else{
    return NextResponse.json({error: addDnsToDatabase[1]} , {status: 500} );
  }

}

export async function GET() {
  const fetchAll = await getAllDns();

  if(fetchAll[0]){
    return NextResponse.json(fetchAll[1]);
  }else{
    return NextResponse.json({error: fetchAll[1]} , {status: 500} );
  }
  
}
