"use client";

import { useSession } from "next-auth/react";

import {
  AreaChart,
  FilePen,
  FileText,
  Gauge,
  HandIcon,
  Landmark,
  PiggyBank,
  Scale,
  Settings,
  UserCheck,
  UserCircle,
  UserMinus,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { User } from "@prisma/client";

const SideNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = useMemo(
    () => [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Gauge,
        isActive: pathname === "/dashboard",
      },
      {
        title: "Loans",
        href: "/loan",
        icon: HandIcon,
        isActive: pathname === "/loan",
      },
      {
        title: "Borrowers",
        href: "/page-not-found",
        icon: UserMinus,
        isActive: pathname === "/page-not-found",
      },
      {
        title: "Repayments",
        href: "/page-not-found",
        icon: UserCheck,
        isActive: pathname === "/page-not-found",
      },
      {
        title: "Loan Params",
        href: "/page-not-found",
        icon: Scale,
        isActive: pathname === "/page-not-found",
      },
      {
        title: "Accounting",
        href: "/page-not-found",
        icon: Wallet,
        isActive: pathname === "/page-not-found",
      },
      {
        title: "Reports",
        href: "/page-not-found",
        icon: AreaChart,
        isActive: pathname === "/page-not-found",
      },
      {
        title: "Collateral",
        href: "/page-not-found",
        icon: FileText,
        isActive: pathname === "/page-not-found",
      },
      {
        title: "Savings",
        href: "/page-not-found",
        icon: PiggyBank,
        isActive: pathname === "/page-not-found",
      },
      {
        title: "Other Incomes",
        href: "/page-not-found",
        icon: Landmark,
        isActive: pathname === "/page-not-found",
      },
      {
        title: "Signature",
        href: "/page-not-found",
        icon: FilePen,
        isActive: pathname === "/page-not-found",
      },
      {
        title: "Settings",
        href: "/page-not-found",
        icon: Settings,
        isActive: pathname === "/page-not-found",
      },
    ],
    [pathname]
  );

  const [user, setUser] = useState<{ name: string }>();

  useEffect(() => {
    const fecthUser = async () => {
      const user = (await axios.get(`api/user/data`)).data;
      setUser(user);
      console.log(user);
    };

    fecthUser();
  }, []);

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-[#132E1A] sm:flex mt-[7vh]">
      <div className="flex items-center gap-2 px-2 text-[#ADCF1A] border-b-2 border-zinc-700 my-4 pb-4 shadow-lg">
        <UserCircle />
        <p>{user?.name}</p>
      </div>
      <nav className="flex flex-col items-center text-white mb-10 w-48">
        {links.map((link, index) => (
          <Link
            href={link.href}
            className={`flex hover:bg-[#0A512F] hover:text-white  items-center transition-colors hover:text-foreground h-full p-3 md:w-full gap-2 border-b-2 border-black/20 ${
              link.isActive ? "bg-[#0A512F]" : ""
            }`}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideNavbar;
