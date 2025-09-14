import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* <img
            src="/jharkhand-emblem.png"
            alt="Jharkhand Emblem"
            className="w-10 h-10"
          /> */}
          <div>
            <Link href="/" className="font-bold text-lg flex flex-col leading-tight">
              ByteBusters — SIH Demo
              <span className="text-xs font-normal text-gray-500">
                Government of Jharkhand
              </span>
            </Link>
          </div>
        </div>
        <nav className="space-x-3">
          <Link href="/citizen/login" className="text-sm hover:underline">
            Citizen
          </Link>
          <Link href="/authority/login" className="text-sm hover:underline">
            Authority
          </Link>
        </nav>
      </div>
    </header>
  );
}
