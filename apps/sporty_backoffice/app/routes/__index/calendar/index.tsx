import { Calendar } from 'ui';

export default function Index() {
  const events = [
    {
      date: '2023-04-03',
      events: [
        { id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
        { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
        { id: 3, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
        { id: 4, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
        { id: 5, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
        { id: 6, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
      ],
    },
    {
      date: '2023-04-30',
      events: [
        { id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
        { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
        { id: 3, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
        { id: 4, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
        { id: 5, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
        { id: 6, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
      ],
    },
  ];

  const dateCellRender = (day: any) => {
    const dayEvents = events.find((item) => item.date === day.date);
    return (
      <Calendar.EventList>
        {dayEvents?.events.slice(0, 2).map((event) => (
          <Calendar.ListElement key={event.datetime}>
            <Calendar.EventContent
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Calendar.EventParagraph>{event.name}</Calendar.EventParagraph>
              <Calendar.EventTime dateTime={event?.datetime}>{event.time}</Calendar.EventTime>
            </Calendar.EventContent>
          </Calendar.ListElement>
        ))}
        {dayEvents && dayEvents?.events.length > 2 && (
          <li className="text-gray-500">+ {dayEvents?.events.length - 2} more</li>
        )}
      </Calendar.EventList>
    );
  };

  return (
    <div>
      <Calendar
        dateCellRender={dateCellRender}
        onSelect={(day: any) => {
          console.log(day);
        }}
      />
    </div>
  );
}
