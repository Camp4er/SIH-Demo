export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">SIH — Civic Issue Reporting Demo</h1>
      <p>
        This demo showcases: issue reporting, image upload + mock verification,
        complaint tracking, authority dashboard and chat.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/citizen/login" className="p-4 rounded shadow bg-white">
          Citizen Portal →
        </a>
        <a href="/authority/login" className="p-4 rounded shadow bg-white">
          Authority Portal →
        </a>
      </div>
    </div>
  );
}
