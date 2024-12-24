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
import { useMemo } from "react";
import { Button } from "./ui/button";
import { redirectToAuthPage } from "@/functions/redirectToAuthPage";

export default function ProfileDropdown() {
  const userPicture = useMemo(() => {
    return localStorage.getItem("userPicture")?.replace(/['"]+/g, "");
  }, []);

  const userName = useMemo(() => {
    return localStorage.getItem("userName")?.replace(/['"]+/g, "");
  }, []);

  const userEmail = useMemo(() => {
    return localStorage.getItem("userEmail")?.replace(/['"]+/g, "");
  }, []);

  const accessToken = useMemo(() => {
    return localStorage.getItem("accessToken")?.replace(/['"]+/g, "");
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white inline-flex rounded-full p-0">
        <Avatar className="md:hover:scale-110">
          <AvatarImage src={userPicture} />
          <AvatarFallback>{userName?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-start">
        <DropdownMenuLabel>
          <Avatar>
            <AvatarImage src={userPicture} />
            <AvatarFallback>{userName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuLabel>
        <Separator />
        <DropdownMenuItem className="font-bold">{userName}</DropdownMenuItem>
        <DropdownMenuItem>{userEmail}</DropdownMenuItem>
        <DropdownMenuItem>
          {accessToken ? (
            <Badge variant="correct">Authenticated</Badge>
          ) : (
            <Badge variant="destructive">Not Authenticated</Badge>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant={"outline"} onClick={redirectToAuthPage}>
            Get Access Token
          </Button>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
