import cron from 'node-cron';
import { POST } from '../validate/route';
import { getAllDns, updateDns } from '../../../../src/services/DnsValidationHistory';
import {checkSPF,checkDKIM,checkDMARC} from '@/src/utils'


const job = cron.schedule('30 * * * *', async () => {
  const dnsResults = await getAllDns()
  for (const domain of dnsResults[1]) {
    console.log('running...')
    const spf = await checkSPF(domain.domain.toLowerCase());
    const dkim = await checkDKIM(domain.domain.toLowerCase());
    const dmarc = await checkDMARC(domain.domain.toLowerCase());

    const result = { domain: domain.domain.toLowerCase(), spf, dkim, dmarc, created_at: new Date() };
    const updating = await updateDns(result)

    if(updating[0]){
      console.log(`success on checking : ${domain.domain.toLowerCase()}`)
    }else{
      console.log(`failure on checking : ${domain.domain.toLowerCase()}`)
    }
  }
});

export async function GET() {
  return new Response('Cron job is running');
}