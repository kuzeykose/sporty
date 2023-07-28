import { useEffect, useState } from 'react';
import { Button, Card, Input, Box, ButtonVariants, Form, Modal, DropdownMenu, Calendar, DatePicker } from 'ui';
import { ActionArgs, LoaderArgs } from '@remix-run/server-runtime';
import { useActionData, useLoaderData, useSearchParams, useSubmit } from '@remix-run/react';
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid';
import { CreateWorkoutMovements, CreateWorkoutSections, WorkoutPreviewer } from 'components';
import clsx from 'clsx';
import qs from 'qs';
import { createWorkout, getWorkout, updateWorkout } from '~/utils/workout.server';
import dayjs from 'dayjs';
import { ChildrenOfMovement, ChildrenOfSettings, Movement, Section, Sections, Workout } from '~/types/workout';

export const action = async ({ request, params }: ActionArgs) => {
  const url = new URL(request.url);
  const workoutId = url.searchParams.get('workout');
  const date = url.searchParams.get('date');

  const reqTest = await request.text();
  const parseReqTest = qs.parse(reqTest);
  const form = JSON.parse(parseReqTest.form as string);

  if (workoutId && date && params.programId && params.planId) {
    updateWorkout(request, params.programId, params.planId, workoutId, date, form);
  } else if (params.programId && params.planId) {
    createWorkout(request, params.programId, params.planId, form);
  }

  return 'success';
};

export const loader = async ({ request, params }: ActionArgs) => {
  const url = new URL(request.url);
  const workoutId = url.searchParams.get('workout');
  const date = url.searchParams.get('date');
  const { programId, planId } = params;

  if (programId && planId && workoutId && date) {
    const workout = await getWorkout(request, programId, planId, workoutId, date);
    return workout;
  } else {
    return null;
  }
};

export default function CreateWorkout({ request }: LoaderArgs) {
  const workout = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const date = searchParams?.get('date') || dayjs().format('YYYY-MM-DD');

  const [workouts, setWorkouts] = useState<Workout>(
    workout
      ? workout
      : {
          date: date,
          dailyNote: '',
          Beginner: [],
          Advanced: [],
          Intermediate: [],
          name: '',
        }
  );

  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<number>();
  const [currentLevelTab, setCurrentLevelTab] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [modal, setModal] = useState<boolean>(false);
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const tabs: { name: 'Beginner' | 'Intermediate' | 'Advanced' }[] = [
    { name: 'Beginner' },
    { name: 'Intermediate' },
    { name: 'Advanced' },
  ];
  const submit = useSubmit();

  const handleAddMovement = (index: number) => {
    const movement = { movement: '', type: '', value: '', key: 0 };
    setSections((prevState: Section[]) => {
      const state = [...prevState];
      const length = state[index].movements.length;
      if (length) {
        movement.key = state[index].movements[length - 1]?.key + 1;
      }
      state[index].movements.push(movement);
      return state;
    });
  };

  const handleAddSection = () => {
    const section = { settings: { sectionName: '', sectionNote: '', type: '' }, movements: [], key: 0 };
    setSections((prevState: Section[]) => {
      const state = [...prevState];
      if (state.length) {
        section.key = state[length - 1]?.key + 1;
      }
      state.push(section);
      return state;
    });
  };

  const handleAddWorkout = () => {
    const workout = { workoutName: '', sections: [], key: 0 };
    setWorkouts((prevState: Workout) => {
      const state = { ...prevState };
      if (state[currentLevelTab][state[currentLevelTab].length - 1]) {
        workout.key = state[currentLevelTab][state[currentLevelTab].length - 1]?.key + 1;
      }
      state[currentLevelTab]?.push(workout);
      return state;
    });
  };

  const handleRemoveWorkout = (index: number) => {
    setWorkouts((prevState: Workout) => {
      const state = { ...prevState };
      state[currentLevelTab].splice(index, 1);
      return state;
    });
  };

  const handleRemoveSection = (index: number) => {
    setSections((prevState: Section[]) => {
      const state = [...prevState];
      state.splice(index, 1);
      return state;
    });
  };

  const handleRemoveMovement = (index: number, movementIndex: number) => {
    setSections((prevState: Section[]) => {
      const state = [...prevState];
      state[index].movements.splice(movementIndex, 1);
      return state;
    });
  };

  const handleWorkoutChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setWorkouts((prevState: Workout) => {
      const state = { ...prevState };
      state[currentLevelTab][index].workoutName = e.target.value;
      return state;
    });
  };

  const handleDailyNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWorkouts((prevState: Workout) => {
      const state = { ...prevState };
      state.dailyNote = value;
      return state;
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWorkouts((prevState: Workout) => {
      const state = { ...prevState };
      state.name = value;
      return state;
    });
  };

  const handleSectionSettingsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;

    setSections((prevState: Section[]) => {
      const state = [...prevState];
      state[index].settings[name as ChildrenOfSettings] = value;
      return state;
    });
  };

  const handleSectionMovementChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    movementIndex: number
  ) => {
    const { name, value } = e.target;
    setSections((prevState: Section[]) => {
      const state = [...prevState];
      state[index].movements[movementIndex][name as ChildrenOfMovement] = value;
      return state;
    });
  };

  const editWorkout = (sections: Section[], index: number) => {
    setSections(sections);
    setSelectedSection(index);
    setModal(true);
  };

  const handleSubmit = () => {
    const str = JSON.stringify(workouts);
    submit({ form: str }, { method: 'post' });
  };

  const pushSectionToMainState = (index: number) => {
    setWorkouts((prevState: Workout) => {
      const state = { ...prevState };
      state[currentLevelTab][index].sections = sections;
      return state;
    });

    setModal(false);
  };

  const copyFromAnotherLevel = (level: 'Beginner' | 'Intermediate' | 'Advanced') => {
    const state = { ...workouts };
    state[currentLevelTab] = JSON.parse(JSON.stringify(state[level]));
    setWorkouts({ ...state });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Create Sections</h1>
          <p className="mt-2 text-sm text-gray-700">Create your workout!</p>
        </div>
      </div>

      <Form method="post">
        <div className="flex flex-col space-y-4">
          <div>
            <Input
              onChange={(e) => {
                handleNameChange(e);
              }}
              value={workouts.name}
              label="Sections Name"
              name="name"
            />
          </div>
          <div>
            <DatePicker
              value={workouts.date}
              label="Date"
              onSelect={(e: any) => {
                setWorkouts({ ...workouts, date: e.date });
              }}
            />
          </div>
          <div>
            <Input
              onChange={(e) => {
                handleDailyNoteChange(e);
              }}
              value={workouts.dailyNote}
              label="Daily Note"
              name="dailyNote"
            />
          </div>

          <header className="flex justify-between">
            <div className="block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabs?.map((tab) => (
                  <a
                    onClick={() => setCurrentLevelTab(tab.name)}
                    key={tab.name}
                    className={clsx(
                      tab.name === currentLevelTab
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-500 hover:text-gray-700',
                      'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                    )}
                  >
                    {tab?.name}
                  </a>
                ))}
              </nav>
            </div>

            {((workouts.Beginner.length > 0 && currentLevelTab !== 'Beginner') ||
              (workouts.Intermediate.length > 0 && currentLevelTab !== 'Intermediate') ||
              (workouts.Advanced.length > 0 && currentLevelTab !== 'Advanced')) && (
              <div className="items-center flex">
                <DropdownMenu>
                  <DropdownMenu.Button>
                    <Button>Get Copy From</Button>
                  </DropdownMenu.Button>
                  <DropdownMenu.MenuItems>
                    {workouts.Beginner.length > 0 && currentLevelTab !== 'Beginner' && (
                      <DropdownMenu.MenuItem
                        onClick={() => {
                          copyFromAnotherLevel('Beginner');
                        }}
                      >
                        Beginner
                      </DropdownMenu.MenuItem>
                    )}
                    {workouts.Intermediate.length > 0 && currentLevelTab !== 'Intermediate' && (
                      <DropdownMenu.MenuItem
                        onClick={() => {
                          copyFromAnotherLevel('Intermediate');
                        }}
                      >
                        Intermediate
                      </DropdownMenu.MenuItem>
                    )}
                    {workouts.Advanced.length > 0 && currentLevelTab !== 'Advanced' && (
                      <DropdownMenu.MenuItem
                        onClick={() => {
                          copyFromAnotherLevel('Advanced');
                        }}
                      >
                        Advanced
                      </DropdownMenu.MenuItem>
                    )}
                  </DropdownMenu.MenuItems>
                </DropdownMenu>
              </div>
            )}
          </header>

          <div className="space-y-4">
            {workouts[currentLevelTab] && (
              <Box className="col-span-3 flex flex-col space-y-2">
                {workouts[currentLevelTab]?.map((childWorkout: Sections, index: number) => (
                  <Card className="space-y-2" key={childWorkout.key}>
                    <div>
                      <Input
                        onChange={(e) => handleWorkoutChange(e, index)}
                        value={childWorkout.workoutName}
                        name={`workoutName`}
                        label="Sections Name"
                        required
                      />
                    </div>
                    {childWorkout?.sections?.map((section) => (
                      <Box key={section.key + '_preview'}>
                        <p className="text-sm text-yellow-500">{section.settings?.sectionName}</p>
                        <p className="text-xs">
                          {section.settings?.sectionNote && <span className="text-orange-500">Coach Note: </span>}
                          {section.settings?.sectionNote}
                        </p>

                        <div className="px-4 py-2">
                          <p>
                            {section?.settings?.type}
                            {section?.settings?.totalTime && ` - ${section?.settings?.totalTime} minutes`}
                          </p>
                          {section?.settings?.every && (
                            <p className="text-xs text-gray-500">
                              {section?.settings?.every && `Every ${section?.settings?.every} minutes for `}
                              {section?.settings?.totalTime && `${section?.settings?.totalTime} minutes`}
                            </p>
                          )}

                          <ul className="list-disc flex flex-col mt-3">
                            {section?.movements.map((movement) => (
                              <li>
                                {movement.value} {movement.type === 'duration' && 'Sec.'} {movement.movement}{' '}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Box>
                    ))}
                    <Button
                      variant={ButtonVariants.Soft}
                      icon={
                        childWorkout.sections.length > 0 ? (
                          <PencilSquareIcon className="w-4 h-4" />
                        ) : (
                          <PlusIcon className="w-4 h-4" />
                        )
                      }
                      className="w-56"
                      onClick={() => {
                        editWorkout(childWorkout.sections, index);
                      }}
                    >
                      {childWorkout.sections.length > 0 ? 'Edit Sections' : 'Create Sections'}
                    </Button>
                  </Card>
                ))}

                <Button
                  variant={ButtonVariants.Soft}
                  icon={<PlusIcon className="w-4 h-4" />}
                  onClick={handleAddWorkout}
                >
                  Generate Sections
                </Button>
              </Box>
            )}

            <Modal panelClassName="sm:max-w-4xl sm:pt-12" open={modal} setOpen={setModal}>
              {sections && (
                <Card className="flex flex-col space-y-4 border">
                  <div className="flex flex-col gap-6">
                    {sections?.map((section2: Section, index: number) => (
                      <Box key={section2.key} className="min-w-[400px] flex flex-col gap-6">
                        <CreateWorkoutSections
                          key={section2.key}
                          section={section2}
                          handleRemoveSection={handleRemoveSection}
                          handleSectionSettingsChange={handleSectionSettingsChange}
                          index={index}
                        />

                        <div className="text-xl space-y-2">
                          <h2>Movements</h2>
                          {section2?.movements?.map((movement: Movement, movementIndex: number) => (
                            <CreateWorkoutMovements
                              key={movement.key}
                              movement={movement}
                              handleSectionMovementChange={handleSectionMovementChange}
                              handleRemoveMovement={handleRemoveMovement}
                              index={index}
                              movementIndex={movementIndex}
                            />
                          ))}
                          <Button
                            icon={<PlusIcon className="w-4 h-4" />}
                            onClick={() => handleAddMovement(index)}
                            variant={ButtonVariants.Soft}
                          >
                            Add Movement2
                          </Button>
                        </div>
                        <hr />
                      </Box>
                    ))}
                  </div>
                  <Button
                    icon={<PlusIcon className="w-4 h-4" />}
                    className="mt-6"
                    variant={ButtonVariants.Secondary}
                    onClick={handleAddSection}
                  >
                    Generate Section
                  </Button>
                </Card>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant={ButtonVariants.Secondary}
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={() => pushSectionToMainState(selectedSection as number)}>Save Sections</Button>
              </div>
            </Modal>

            <Modal panelClassName="sm:max-w-4xl sm:pt-12" open={previewModal} setOpen={setPreviewModal}>
              <WorkoutPreviewer workouts={workouts} dailyNote={workouts.dailyNote} />

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
