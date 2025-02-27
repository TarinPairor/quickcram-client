import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GoogleCalendarRequestBody } from "@/types/GoogleCalendarRequestBody";
import { useCreateCalendarEventMutation } from "@/functions/useCreateCalendarEventMutation";

interface CalendarEventDialogProps {
  isOpen: boolean;
  onRequestClose: () => void;
  // onConfirm: (updatedEventData: GoogleCalendarRequestBody) => void;
  eventData?: string;
}

const CalendarEventDialog: React.FC<CalendarEventDialogProps> = ({
  isOpen,
  onRequestClose,
  // onConfirm,
  eventData,
}) => {
  const createCalendarEventMutation =
    useCreateCalendarEventMutation(onRequestClose);
  const [updatedEventData, setUpdatedEventData] =
    useState<GoogleCalendarRequestBody | null>(null);

  const onConfirm = (eventData: GoogleCalendarRequestBody) => {
    if (eventData) {
      createCalendarEventMutation.mutate(JSON.stringify(eventData));
    }
  };

  useEffect(() => {
    if (eventData) {
      try {
        const parsedData: GoogleCalendarRequestBody = JSON.parse(eventData);
        setUpdatedEventData(parsedData);
      } catch (error) {
        console.error("Error parsing event data:", error);
      }
    }
  }, [eventData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedEventData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "start" | "end"
  ) => {
    const { value } = e.target;
    setUpdatedEventData((prevData) => ({
      ...prevData!,
      [field]: prevData![field].map((item, i) =>
        i === index ? { ...item, dateTime: value } : item
      ),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onRequestClose}>
      <DialogTrigger asChild>
        <Button className="hidden">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>This is your event</DialogTitle>
          <DialogDescription>View the details of your event.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Summary</label>
            <input
              type="text"
              name="summary"
              value={updatedEventData?.summary || ""}
              onChange={handleChange}
              className="mt-1 bg-white p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={updatedEventData?.description || ""}
              onChange={handleChange}
              className="mt-1 bg-white p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={updatedEventData?.location || ""}
              onChange={handleChange}
              className="mt-1 bg-white p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Start DateTime</label>
            {updatedEventData?.start?.map((item, index) => (
              <input
                key={index}
                type="datetime-local"
                value={item.dateTime}
                onChange={(e) => handleArrayChange(e, index, "start")}
                className="mt-1 bg-white p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium">End DateTime</label>
            {updatedEventData?.end?.map((item, index) => (
              <input
                key={index}
                type="datetime-local"
                value={item.dateTime}
                onChange={(e) => handleArrayChange(e, index, "end")}
                className="mt-1 bg-white p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onRequestClose} className="mr-2">
            Cancel
          </Button>
          <Button
            onClick={() => updatedEventData && onConfirm(updatedEventData)}
            className="bg-blue-500 text-white"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarEventDialog;
