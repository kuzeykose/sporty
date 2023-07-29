import { Box } from 'ui';
import { Event } from '~/types/event';

type EventPreviewer = {
  description?: string;
  events: Event;
};

const EventPreviewer = ({ description, events }: EventPreviewer) => {
  return (
    <div className="space-y-2">
      <div className="overflow-auto space-y-2">
        {description && <p className="font-semibold text-gray-700">{events.name}</p>}
        <div className="sm:flex sm:gap-4 sm:justify-between ">{<p>{events.description}</p>}</div>
      </div>
    </div>
  );
};

export default EventPreviewer;
