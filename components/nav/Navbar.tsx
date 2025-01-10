import { SidebarTrigger } from "../ui/sidebar";
import UserIcon from "./UserIcon";

// TODO: add search functionality (maybe a search bar in the navbar)

const Navbar = () => {
  return (
    <nav className="flex w-full h-12 bg-slate-50 items-center justify-between sticky top-0 z-10 p-3 border-b border-slate-200">
      <SidebarTrigger />
      <div className="flex items-center justify-center gap-3">
       
        <UserIcon />
      </div>
    </nav>
  );
};

export default Navbar;
