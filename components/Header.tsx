import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="font-bold">
          ByteBusters — SIH Demo
        </Link>
        <nav className="space-x-3">
          <Link href="/citizen/login" className="text-sm">
            Citizen
          </Link>
          <Link href="/authority/login" className="text-sm">
            Authority
          </Link>
        </nav>
      </div>
    </header>
  );
}
