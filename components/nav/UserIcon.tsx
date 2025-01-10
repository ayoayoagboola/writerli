import { auth } from "@/auth";
import Image from "next/image";
import { UserIcon as Icon, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogoutButton from "./LogoutButton";

// TODO: add more actions to the dropdown menu (e.g. settings, notifications)

const UserIcon = async () => {
  const session = await auth();

  console.log(session);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {session && session.user && session.user.image ? (
          <div className="flex items-center justify-center gap-2">
            <Image
              className="rounded-full"
              src={session.user.image}
              width={24}
              height={24}
              alt="User Avatar"
            />
          </div>
        ) : (
          <div>
            <Icon className="rounded-full" />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem

        //   className="text-red-600 stroke-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
        >
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserIcon;
