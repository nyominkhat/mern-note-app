import { Link, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserDropdown = ({ name }: { name: string | null }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate(0);
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-semibold transition outline-none text-md text-slate-700 hover:text-slate-800">
        {name}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to={`/${name?.toLowerCase().replace(" ", "-")}`}>Notes</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
