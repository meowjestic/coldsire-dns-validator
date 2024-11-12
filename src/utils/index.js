// Function to check SPF record
export async function checkSPF(domain) {
    try {
      const txtRecords = await dns.resolveTxt(domain);
      return txtRecords.some(record => record.join('').includes('v=spf1'));
    } catch {
      return false;
    }
  }
  
  // Function to check DKIM record
export async function checkDKIM(domain) {
    try {
      const dkimRecord = `_domainkey.${domain}`;
      const txtRecords = await dns.resolveTxt(dkimRecord);
      return txtRecords.some(record => record.join('').includes('v=DKIM1'));
    } catch {
      return false;
    }
  }
  
  // Function to check DMARC record
export async function checkDMARC(domain) {
    try {
      const dmarcRecord = `_dmarc.${domain}`;
      const txtRecords = await dns.resolveTxt(dmarcRecord);
      return txtRecords.some(record => record.join('').includes('v=DMARC1'));
    } catch {
      return false;
    }
  }