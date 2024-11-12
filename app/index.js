import DomainTable from '../components/DomainTable';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">DNS Validator</h1>
      <DomainTable />
    </div>
  );
}
