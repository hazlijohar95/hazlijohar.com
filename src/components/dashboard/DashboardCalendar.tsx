
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const DashboardCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample event data - in a real app, this would come from the backend
  const events = [
    { 
      id: 1, 
      title: "Tax Return Deadline", 
      date: new Date(2025, 3, 15), 
      category: "tax" 
    },
    { 
      id: 2, 
      title: "Quarterly Review Meeting", 
      date: new Date(2025, 4, 10), 
      category: "meeting" 
    },
    { 
      id: 3, 
      title: "Document Submission Due", 
      date: new Date(2025, 4, 5), 
      category: "document" 
    },
  ];
  
  // Filter events for the selected date
  const selectedDateEvents = date 
    ? events.filter(event => 
        event.date.getDate() === date.getDate() && 
        event.date.getMonth() === date.getMonth() && 
        event.date.getFullYear() === date.getFullYear()
      )
    : [];

  // Get upcoming events (next 30 days)
  const today = new Date();
  const thirtyDaysLater = new Date();
  thirtyDaysLater.setDate(today.getDate() + 30);
  
  const upcomingEvents = events
    .filter(event => event.date >= today && event.date <= thirtyDaysLater)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div>
      <h2 className="text-2xl font-medium mb-6">Calendar</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar component */}
        <div className="lg:col-span-2 bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border border-[#333] p-3"
            classNames={{
              day_today: "bg-[#333] text-white",
              day_selected: "bg-white text-black hover:bg-white hover:text-black"
            }}
          />
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">
              {date ? format(date, "MMMM d, yyyy") : "No date selected"}
            </h3>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map(event => (
                  <div 
                    key={event.id}
                    className="bg-[#1A1A1A] border border-[#333] p-4 rounded-md"
                  >
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-[#999] mt-1">
                      {format(event.date, "h:mm a")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#999]">No events scheduled for this date.</p>
            )}
          </div>
        </div>
        
        {/* Upcoming events */}
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div 
                  key={event.id}
                  className="bg-[#1A1A1A] border border-[#333] p-4 rounded-md"
                >
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-[#999] mt-1">
                    {format(event.date, "MMMM d, yyyy")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#999]">No upcoming events in the next 30 days.</p>
          )}
          
          <button className="mt-6 w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition-colors">
            Create New Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCalendar;
