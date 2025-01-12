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
import { currentUser } from "@/lib/auth";

// TODO: add more actions to the dropdown menu (e.g. settings, notifications)

const UserAvatar = async () => {
  const user = await currentUser()

  console.log(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user && user.image ? (
          <div className="flex items-center justify-center gap-2">
            <Image
              className="rounded-full"
              src={user.image}
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

export default UserAvatar;
