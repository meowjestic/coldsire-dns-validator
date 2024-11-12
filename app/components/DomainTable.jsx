'use client';
import { useState, useEffect } from 'react';
import { lookup as getMimeType } from 'mime-types';
import Papa from 'papaparse';

function DomainTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [check, setCheck] = useState('');

  useEffect(() => {
    fetch('/api/v1/validate')
      .then(res => res.json())
      .then(setData);
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    const mimeType = getMimeType(file.name);
    const isCSV = mimeType === 'text/csv';

    if (!isCSV) {
      alert("File needs to be in csv format")
      return false;
    }

    const formData = new FormData();
    formData.append("file", file);

    await fetch('/api/v1/dns', {
      method: 'POST',
      body: formData,
    })
    .then(response => alert('success uploading csv'))
    .catch(error => alert(error));
  };

  const uploadDomains = async (domain) => {
    alert('checking')

    const formData = new FormData();
    formData.append("domain", domain);

    await fetch('/api/v1/validate', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if(response.ok){
        alert('success')
      }else{
        return response.json()
      }
    })
    .then(response => {if( response?.error ){alert(response.error)}})
    .catch(error => alert(error));

    
    // Fetch updated data from server
    fetch('/api/v1/validate')
      .then(res => res.json())
      .then(setData);
  };

  const filteredData = data.filter(domain =>
    domain.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search domains"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4"
      />
      <input
        type="text"
        placeholder="Check domains"
        onBlur={(e) => {
          if(e.target.value != ""){
            return uploadDomains(e.target.value)
          }
        }}
        className="border p-2 mb-4"
      />
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border p-2">Domain</th>
            <th className="border p-2">SPF</th>
            <th className="border p-2">DKIM</th>
            <th className="border p-2">DMARC</th>
            <th className="border p-2">Last Checked</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry, index) => (
            <tr key={index}>
              <td className="border p-2">{entry.domain}</td>
              <td className="border p-2">{entry.spf ? "Valid" : "Invalid"}</td>
              <td className="border p-2">{entry.dkim ? "Valid" : "Invalid"}</td>
              <td className="border p-2">{entry.dmarc ? "Valid" : "Invalid"}</td>
              <td className="border p-2">{new Date(entry.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DomainTable;
