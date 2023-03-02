import Link from "next/link";
import { useRouter } from "next/router";

function NavLink({ href, children }) {
  const router = useRouter();
  return <Link href={href}>{children}</Link>;
}

export default function Navbar() {
  return (
    <nav
      className="box-border absolute w-[6.67%] h-[39%] left-[2%] top-[27.7%]
                bg-white border-[1px] border-solid border-[##CAC4C4] rounded-[30px] 
                shadown-black/25"
    >
      <div className="relative flex flex-col items-center justify-center p-0 h-full">
        <NavLink href="/">
          <img
            src="/icons/icon-1.svg"
            className="absolute flex-none order-none flex-grow-0 w-[29.5%] h-[7.84%] left-[34.8%] top-[25%] "
          />
        </NavLink>
        <NavLink href="/workout">
          <img
            src="/icons/icon-2.svg"
            className="absolute flex-none order-none flex-grow-0 w-[29.5%] h-[7.84%] left-[34.8%] top-[50%] "
          />
        </NavLink>
        <NavLink href="/about">
          <img
            src="/icons/icon-3.svg"
            className="absolute flex-none order-none flex-grow-0 w-[29.5%] h-[7.84%] left-[34.8%] top-[75%]"
          />
        </NavLink>
      </div>
    </nav>
  );
}
