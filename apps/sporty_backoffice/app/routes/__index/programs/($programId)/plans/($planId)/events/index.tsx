import { useState } from 'react';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import { ActionArgs } from '@remix-run/server-runtime';
import { Modal } from 'ui';
import { Event } from '~/types/event';
import { getEvents } from '~/utils/event.server';
import EventPreviewer from 'components/EventPreviewer';

interface EventList extends Event {
  name: string;
  date: string;
  description: string;
  createdBy: string;
  programId: string;
  planId: string;
  eventId: string;
}

export const loader = async ({ request, params }: ActionArgs) => {
  const { programId, planId } = params;
  if (programId && planId) {
    const events = await getEvents(request, programId, planId);
    return events;
  } else {
    throw '';
  }
};

export default function Example() {
  const params = useParams();
  const events = useLoaderData<typeof loader>();
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const [eventPreview, setEventPreview] = useState<Event>({} as Event);

  console.log('events:', events);
  console.log('eventPreview:', eventPreview);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Events</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all the events according to your plan.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link to={`/programs/${params.programId}/plans/${params.planId}/events/new`}>
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Event
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Event Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Created By
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events?.map((event: EventList) => (
                  <tr key={event.date}>
                    <td
                      className="cursor-pointer whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 hover:text-indigo-600"
                      onClick={() => {
                        setEventPreview(event);
                        setPreviewModal(true);
                      }}
                    >
                      {event.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.date}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.description}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.createdBy}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a className="text-indigo-600 hover:text-indigo-900">
                        <Link
                          to={`/programs/${event.programId}/plans/${event.planId}/events/new?event=${event.eventId}&date=${event.date}`}
                        >
                          Edit
                        </Link>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <Modal panelClassName="sm:max-w-4xl sm:pt-6" open={previewModal} setOpen={setPreviewModal}>
                <Modal.Title>{eventPreview.date}</Modal.Title>
                <p className="font-medium mt-4">
                  <span className="text-gray-600">Event Name: </span> {eventPreview.name}
                </p>
                <p className="font-medium">
                  <span className="text-gray-600">Description: </span> {eventPreview.description}
                </p>
                <div className="mt-6">
                  <EventPreviewer events={eventPreview as Event} />
                </div>
              </Modal>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
