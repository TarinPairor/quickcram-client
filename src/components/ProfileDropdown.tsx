import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import LogoutButton from "./LogoutButton";
import { Separator } from "./ui/separator";

export default function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white inline-flex p-0">
        <Avatar>
          <AvatarImage
            src={
              localStorage.getItem("userPicture")?.replace(/['"]+/g, "") || ""
            }
          />
          <AvatarFallback>
            {localStorage.getItem("userName")?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-start">
        <DropdownMenuLabel>
          <Avatar>
            <AvatarImage
              src={
                localStorage.getItem("userPicture")?.replace(/['"]+/g, "") || ""
              }
            />
            <AvatarFallback>
              {localStorage.getItem("userName")?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuLabel>
        <Separator />
        <DropdownMenuItem className="font-bold">
          {localStorage.getItem("userName")?.replace(/['"]+/g, "")}
        </DropdownMenuItem>
        <DropdownMenuItem>
          {localStorage.getItem("userEmail")?.replace(/['"]+/g, "")}
        </DropdownMenuItem>
        <DropdownMenuItem>
          {localStorage.getItem("accessToken")?.replace(/['"]+/g, "") ? (
            <Badge variant="correct">Authenticated</Badge>
          ) : (
            <Badge variant="destructive">Not Authenticated</Badge>
          )}
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
