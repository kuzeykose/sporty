import { ActionArgs } from '@remix-run/server-runtime';
import { Button, ButtonVariants, DatePicker, Form, Input, Modal, Textarea } from 'ui';
import { createEvent, getEvent, updateEvent } from '~/utils/event.server';
import { useState } from 'react';
import { useLoaderData, useSearchParams, useSubmit } from '@remix-run/react';
import { Event } from '~/types/event';

import qs from 'qs';
import dayjs from 'dayjs';
import EventPreviewer from 'components/EventPreviewer';

export const action = async ({ request, params }: ActionArgs) => {
  const url = new URL(request.url);
  const eventId = url.searchParams.get('event');
  const date = url.searchParams.get('date');

  const reqTest = await request.text();
  const parseReqTest = qs.parse(reqTest);
  const form = JSON.parse(parseReqTest.form as string);

  console.log(params);

  if (eventId && date && params.programId && params.planId) {
    const { date, name, description } = form;
    updateEvent(request, params.programId, params.planId, eventId, date, name, description);
  } else if (params.programId && params.planId) {
    const { date, name, description } = form;
    createEvent(request, params.programId, params.planId, date, name, description);
  }

  return 'success';
};

export const loader = async ({ request, params }: ActionArgs) => {
  const url = new URL(request.url);
  const eventId = url.searchParams.get('event');
  const date = url.searchParams.get('date');
  const { programId, planId } = params;

  if (programId && planId && eventId && date) {
    const workout = await getEvent(request, programId, planId, eventId, date);
    return workout;
  } else {
    return null;
  }
};

export default function CreateEvent() {
  const event = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const date = searchParams?.get('date') || dayjs().format('YYYY-MM-DD');

  const [events, setEvents] = useState<Event>(
    event
      ? event
      : {
          date: date,
          description: '',
          name: '',
        }
  );

  const [modal, setModal] = useState<boolean>(false);
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const submit = useSubmit();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEvents((prevState: Event) => {
      const state = { ...prevState };
      state.name = value;
      return state;
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEvents((prevState: Event) => {
      const state = { ...prevState };
      state.description = value;
      return state;
    });
  };

  const handleSubmit = () => {
    const str = JSON.stringify(events);
    submit({ form: str }, { method: 'post' });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Create Sections</h1>
          <p className="mt-2 text-sm text-gray-700">Create your event!</p>
        </div>
      </div>

      <Form method="post">
        <div className="flex flex-col space-y-4">
          <div>
            <Input
              onChange={(e) => {
                handleNameChange(e);
              }}
              value={events.name}
              label="Event Name"
              name="name"
            />
          </div>
          <div>
            <DatePicker
              value={events.date}
              label="Date"
              onSelect={(e: any) => {
                setEvents({ ...events, date: e.date });
              }}
            />
          </div>
          <div>
            <Textarea
              onChange={(e) => {
                handleDescriptionChange(e);
              }}
              value={events.description}
              label="Description"
              name="description"
              className="h-24"
            />
          </div>

          <div>
            <Modal panelClassName="sm:max-w-4xl sm:pt-12" open={previewModal} setOpen={setPreviewModal}>
              <EventPreviewer events={events} description={events.description} />

              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => setPreviewModal(false)}
                  variant={ButtonVariants.Secondary}
                  className="px-6 w-full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleSubmit();
                    setPreviewModal(false);
                  }}
                  className="px-6 w-full"
                >
                  Save
                </Button>
              </div>
            </Modal>
          </div>

          <div>
            <Button
              className="px-6"
              onClick={() => {
                setPreviewModal(true);
              }}
            >
              Preview & Save
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
