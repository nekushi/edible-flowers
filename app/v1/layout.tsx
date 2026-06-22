import Link from "next/link";

export default function EfMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // large viewport height || dynamic viewport height
    <div className="h-lvh grid grid-cols-12">
      <div className="border col-span-2">
        <h1>This is edible flowers layout.</h1>
        <div className="flex flex-col">
          <Link href={"./dashboard"}>Dashboard</Link>
          <Link href={"./products"}>Products</Link>
          <Link href={"./history"}>History</Link>
          <Link href={"./settings"}>Settings</Link>
        </div>
        {/* <nav className="border">
          <ul>
            <li>Dashboard</li>
            <li>Content</li>
            <li>History</li>
            <li>Settings</li>
          </ul>
        </nav> */}
      </div>
      <div className="border col-span-10">{children}</div>
    </div>
  );
}
