import Link from "next/link";
import { useRouter } from "next/router";
import { classNames } from "./Functions";

function NavLink({ href, children }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={classNames(
        router.pathname == encodeURI(href)
          ? " bg-[url('/icons/circular-hightlight.svg')] bg-no-repeat bg-[center_bottom_98%] bg-contain"
          : "",
        "px-3 py-3 mt-14 h-full w-full"
      )}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav
      className="grid grid-rows-3 justify-center items-center box-border absolute w-[6.67%] h-[39%] left-[2%] top-[27.7%]
                bg-white border-[1px] border-solid border-[#CAC4C4] rounded-[30px] 
                shadown-black/25"
    >
      <NavLink href="/">
        <img src="/icons/icon-1.svg" className="h-[35%]" />
      </NavLink>

      <NavLink href="/workout">
        <img src="/icons/icon-2.svg" className="h-[35%]" />
      </NavLink>

      <NavLink href="/about">
        <img src="/icons/icon-3.svg" className="h-[35%]" />
      </NavLink>
    </nav>
  );
}
