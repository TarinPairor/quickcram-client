import { useState } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useChatGPTMutation } from "../functions/handleChatGPTRequest";
import { useCreateCalendarEventMutation } from "../functions/useCreateCalendarEventMutation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CalendarEventDialog from "../components/CalendarEventDialog";
import InfoAccordion from "@/components/InfoAccordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

function Home() {
  const [prompt, setPrompt] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventData, setEventData] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState("");
  const [previousEventData, setPreviousEventData] = useState("");

  const chatGPTMutation = useChatGPTMutation();
  const createCalendarEventMutation = useCreateCalendarEventMutation();

  const handleChatGPTClick = async () => {
    if (!prompt) {
      return;
    }
    if (prompt === previousPrompt && previousEventData) {
      // Reuse the existing event data
      setEventData(previousEventData);
      setIsDialogOpen(true);
    } else {
      // Make a new API call
      chatGPTMutation.mutate(prompt, {
        onSuccess: (data) => {
          if (data) {
            console.log("ChatGPT response:", data);
            setEventData(data);
            setPreviousPrompt(prompt);
            setPreviousEventData(data);
            setIsDialogOpen(true);
          }
        },
        onError: (error) => {
          console.error("Error calling chatgpt:", error);
        },
      });
    }
  };

  const handleConfirm = () => {
    if (eventData) {
      createCalendarEventMutation.mutate(eventData);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="absolute top-0 right-0 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-white inline-flex p-0">
            <Avatar>
              <AvatarImage
                src={
                  localStorage.getItem("userPicture")?.replace(/['"]+/g, "") ||
                  ""
                }
              />
              <AvatarFallback>
                {localStorage.getItem("userName")?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-center">
            <DropdownMenuLabel>
              <Avatar>
                <AvatarImage
                  src={
                    localStorage
                      .getItem("userPicture")
                      ?.replace(/['"]+/g, "") || ""
                  }
                />
                <AvatarFallback>
                  {localStorage.getItem("userName")?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center mt-4">QuickCram</h1>
        <p className="text-center mt-2 flex flex-wrap">
          {localStorage.getItem("userName")
            ? `Welcome ${localStorage
                .getItem("userName")
                ?.replace(/['"]+/g, "")}`
            : "Sign in through Google"}
          . Quickly create Google Calendar events with AI!
        </p>
      </div>
      <div className=" flex flex-wrap justify-center gap-2 m-10 p-10 border-4 rounded-md">
        <Button onClick={handleChatGPTClick} variant={"default"}>
          Submit Event
        </Button>

        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          id="large-input"
        />
        <GoogleLoginButton />
        <CalendarEventDialog
          isOpen={isDialogOpen}
          onRequestClose={() => setIsDialogOpen(false)}
          onConfirm={handleConfirm}
          eventData={eventData}
        />
      </div>
      <InfoAccordion />
    </div>
  );
}

export default Home;
