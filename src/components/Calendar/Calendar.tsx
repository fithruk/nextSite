"use client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useMemo, useState } from "react";
import calendarStyles from "./calendarStyles.module.css";
import { Calendar, momentLocalizer, SlotInfo, View } from "react-big-calendar";
import "moment/locale/uk";
moment.locale("uk");

export type WorkoutEvent = {
  title: string;
  start: Date;
  end: Date;
  isSelected?: boolean;
};

const allowedViews: Exclude<View, "day" | "agenda">[] = ["month", "week"];

type CalendarProps = {
  events: WorkoutEvent[];
  selectedEvent: WorkoutEvent | null;
  onSelectEvent?: (event: WorkoutEvent) => void;
  selectable?: boolean;

  onSelectSlot?: (slotInfo: SlotInfo) => void;
};

const CalendarComponent = ({
  events,
  selectedEvent,
  onSelectEvent,
  selectable,
  onSelectSlot,
}: CalendarProps) => {
  const localizer = useMemo(() => momentLocalizer(moment), []);

  const [view, setView] = useState<Exclude<View, "day" | "agenda">>("month");
  const [date, setDate] = useState(new Date());

  const handleViewChange = (newView: View) => {
    if (allowedViews.includes(newView as Exclude<View, "day" | "agenda">)) {
      setView(newView as Exclude<View, "day" | "agenda">);
    }
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      selected={selectedEvent}
      selectable={selectable}
      onSelectSlot={onSelectSlot}
      onSelectEvent={onSelectEvent}
      view={view}
      date={date}
      onView={handleViewChange}
      onNavigate={setDate}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      className={calendarStyles["rbc-calendar"]}
      eventPropGetter={(event, start, end, isSelected) => {
        return {
          style: {
            backgroundColor: isSelected ? "var(--yellow)" : "var(--blue)",
            color: "white",
            borderRadius: "5px",
            border: "none",
            padding: "4px",
          },
        };
      }}
      views={{ month: true, week: true }}
      messages={{
        today: "Сьогодні",
        previous: "Назад",
        next: "Вперед",
        month: "Місяць",
        week: "Тиждень",
        day: "День",
        agenda: "Список",
        date: "Дата",
        time: "Час",
        event: "Подія",
        noEventsInRange: "Немає подій за вибраний період",
      }}
    />
  );
};
export default CalendarComponent;
