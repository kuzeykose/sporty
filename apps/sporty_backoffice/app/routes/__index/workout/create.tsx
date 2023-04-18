import { useState } from 'react';
import { Button, Card, Input, Box, ButtonVariants, Form, Select, Combobox } from 'ui';
import { MinusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { ActionArgs } from '@remix-run/server-runtime';
import { movements } from 'movements'; // we need to remove this, call api and get movements
import { useActionData, useSubmit } from '@remix-run/react';
import { WorkoutPreviewer } from 'components';
import clsx from 'clsx';
import qs from 'qs';

type Movement = {
  movement: string;
  type: string;
  value: string;
  key: number;
};

type Section = {
  settings: { sectionName: string; sectionNote: string; type: string; every?: string; totalTime?: string };
  movements: Movement[];
  key: number;
};

type ChildrenOfSettings = 'sectionName' | 'sectionNote' | 'type' | 'every' | 'totalTime';
type ChildrenOfMovement = 'movement' | 'type' | 'value';

type Workout = {
  workoutName: string;
  sections: Section[];
  key: number;
};

type Level = {
  dailyNote: string;
  Beginner: Workout[];
  Intermediate: Workout[];
  Advanced: Workout[];
};

export const action = async ({ request }: ActionArgs) => {
  const reqTest = await request.text();
  const parseReqTest = qs.parse(reqTest);
  const form = JSON.parse(parseReqTest.form as string);
  console.log(form);

  return 'success';
};

export default function createWorkout() {
  const data = useActionData<typeof action>();
  const [workouts, setWorkouts] = useState<Level>({ dailyNote: '', Beginner: [], Advanced: [], Intermediate: [] });
  const [currentLevelTab, setCurrentLevelTab] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const tabs = [{ name: 'Beginner' }, { name: 'Intermediate' }, { name: 'Advanced' }];
  const submit = useSubmit();

  const handleAddMovement = (parentIndex: number, index: number) => {
    const movement = { movement: '', type: '', value: '', key: 0 };
    setWorkouts((prevState: Level) => {
      const state = { ...prevState };
      const length = state[currentLevelTab][parentIndex].sections[index].movements.length;
      if (length) {
        movement.key = state[currentLevelTab][parentIndex].sections[index].movements[length - 1]?.key + 1;
      }
      state[currentLevelTab][parentIndex].sections[index].movements.push(movement);
      return state;
    });
  };

  const handleAddSection = (parentIndex: number) => {
    const section = { settings: { sectionName: '', sectionNote: '', type: '' }, movements: [], key: 0 };
    setWorkouts((prevState: Level) => {
      const state = { ...prevState };
      const length = state[currentLevelTab][parentIndex].sections.length;
      if (length) {
        section.key = state[currentLevelTab][parentIndex].sections[length - 1]?.key + 1;
      }
      state[currentLevelTab][parentIndex].sections.push(section);
      return state;
    });
  };

  const handleAddWorkout = () => {
    const workout = { workoutName: '', sections: [], key: 0 };
    setWorkouts((prevState: Level) => {
      const state = { ...prevState };
      if (state[currentLevelTab][state[currentLevelTab].length - 1]) {
        workout.key = state[currentLevelTab][state[currentLevelTab].length - 1]?.key + 1;
      }
      state[currentLevelTab]?.push(workout);
      return state;
    });
  };

  const handleRemoveWorkout = (index: number) => {
    setWorkouts((prevState: Level) => {
      const state = { ...prevState };
      state[currentLevelTab].splice(index, 1);
      return state;
    });
  };

  const handleRemoveSection = (parentIndex: number, index: number) => {
    setWorkouts((prevState: Level) => {
      const state = { ...prevState };
      state[currentLevelTab][parentIndex].sections.splice(index, 1);
      return state;
    });
  };

  const handleRemoveMovement = (parentIndex: number, index: number, movementIndex: number) => {
    setWorkouts((prevState: Level) => {
      const state = { ...prevState };
      state[currentLevelTab][parentIndex].sections[index].movements.splice(movementIndex, 1);
      return state;
    });
  };

  const handleWorkoutChange = (e: React.ChangeEvent<HTMLInputElement>, parentIndex: number) => {
    const value = e.target.value;
    setWorkouts((prevState: Level) => {
      const state = { ...prevState };
      state[currentLevelTab][parentIndex].workoutName = value;
      return state;
    });
  };

  const handleDailyNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWorkouts((prevState: Level) => {
      const state = { ...prevState };
      state.dailyNote = value;
      return state;
    });
  };

  const handleSectionSettingsChange = (e: React.ChangeEvent<HTMLInputElement>, parentIndex: number, index: number) => {
    const { name, value } = e.target;
    setWorkouts((prevState: Level) => {
      const state = { ...prevState };
      state[currentLevelTab][parentIndex].sections[index].settings[name as ChildrenOfSettings] = value;
      return state;
    });
  };

  const handleSectionTypeComboboxChange = (
    target: { value: { name: string; id: string }; name: string },
    parentIndex: number,
    index: number
  ) => {
    const { name, value } = target;
    setWorkouts((prevState: Level) => {
      const state = { ...prevState };
      state[currentLevelTab][parentIndex].sections[index].settings[name as ChildrenOfSettings] = value.name;
      return state;
    });
  };

  const handleSectionMovementChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    parentIndex: number,
    index: number,
    movementIndex: number
  ) => {
    const { name, value } = e.target;
    console.log('aa', name, value);

    setWorkouts((prevState: Level) => {
      const state = { ...prevState };
      state[currentLevelTab][parentIndex].sections[index].movements[movementIndex][name as ChildrenOfMovement] = value;
      return state;
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const str = JSON.stringify(workouts);
    submit({ form: str }, { method: 'post' });
  };

  return (
    <Form
      method="post"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="flex flex-col space-y-4">
        <div className="mx-3">
          <Input
            onChange={(e) => {
              handleDailyNoteChange(e);
            }}
            value={workouts.dailyNote}
            label="Daily Note"
            name="daılyNote"
          />
        </div>

        <header className="flex mx-3">
          <>
            <div className="block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabs?.map((tab: any) => (
                  <a
                    onClick={() => setCurrentLevelTab(tab.name)}
                    key={tab.name}
                    className={clsx(
                      tab.name === currentLevelTab
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-500 hover:text-gray-700',
                      'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab?.name}
                  </a>
                ))}
              </nav>
            </div>
          </>
        </header>

        <div className="mx-3 grid grid-cols-4 gap-4">
          {workouts[currentLevelTab] && (
            <>
              <Box className="col-span-3 flex flex-col space-y-2">
                {workouts[currentLevelTab]?.map((workout: Workout, parentIndex: number) => (
                  <Card className="flex flex-col space-y-4 border" key={workout.key}>
                    <div>
                      <div className="flex justify-end">
                        <TrashIcon
                          className="h-5 w-5 text-red-600 cursor-pointer"
                          onClick={() => handleRemoveWorkout(parentIndex)}
                        />
                      </div>
                      <Input
                        onChange={(e) => {
                          handleWorkoutChange(e, parentIndex);
                        }}
                        value={workout.workoutName}
                        name={`workout[${0}][workoutName]`}
                        label="Workout Name"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-6">
                      {workout?.sections.map((section: Section, index: number) => (
                        <Box key={section.key} className="min-w-[400px] flex flex-col gap-6">
                          <Box className="text-xl space-y-2">
                            <div className="flex justify-between">
                              <h2>Settings</h2>
                              <Button
                                className="text-red-500 hover:bg-red-100"
                                variant={ButtonVariants.Text}
                                onClick={() => handleRemoveSection(parentIndex, index)}
                              >
                                Remove Section
                              </Button>
                            </div>
                            <div className="flex gap-4">
                              <div className="w-1/3">
                                <Input
                                  name={`sectionName`}
                                  onChange={(event) => {
                                    handleSectionSettingsChange(event, parentIndex, index);
                                  }}
                                  value={section.settings.sectionName}
                                  label="Section Name"
                                  required
                                />
                              </div>
                              <div className="w-1/3">
                                <Input
                                  name={`sectionNote`}
                                  onChange={(event) => {
                                    handleSectionSettingsChange(event, parentIndex, index);
                                  }}
                                  value={section.settings.sectionNote}
                                  label="Section Note"
                                  required
                                />
                              </div>
                              <div className="w-1/3">
                                <Combobox
                                  name="type"
                                  label="Type"
                                  value={{ name: section.settings.type }}
                                  onChange={(e) => {
                                    handleSectionTypeComboboxChange(e, parentIndex, index);
                                    handleSectionSettingsChange(
                                      { target: { name: 'totalTime', value: '' } } as any,
                                      parentIndex,
                                      index
                                    );
                                    handleSectionSettingsChange(
                                      { target: { name: 'every', value: '' } } as any,
                                      parentIndex,
                                      index
                                    );
                                  }}
                                  list={[
                                    { id: 'forTime', name: 'FOR TIME', value: 'forTime' },
                                    { id: 'amrap', name: 'AMRAP', value: 'amrap' },
                                    { id: 'emom', name: 'EMOM', value: 'emom' },
                                    { id: 'notForTime', name: 'NOT FOR TIME', value: 'notForTime' },
                                  ]}
                                />
                              </div>

                              {section.settings.type === 'EMOM' && (
                                <div className="flex gap-2 w-1/3">
                                  <Input
                                    name="every"
                                    onChange={(event) => {
                                      handleSectionSettingsChange(event, parentIndex, index);
                                    }}
                                    value={section.settings.every}
                                    label="Every"
                                    required
                                  />
                                  <Input
                                    name="totalTime"
                                    onChange={(event) => {
                                      handleSectionSettingsChange(event, parentIndex, index);
                                    }}
                                    value={section.settings.totalTime}
                                    label="Time"
                                    required
                                  />
                                </div>
                              )}
                              {['AMRAP', 'FOR TIME'].includes(section.settings.type) && (
                                <div className="w-1/3">
                                  <Input
                                    name="totalTime"
                                    onChange={(event) => {
                                      handleSectionSettingsChange(event, parentIndex, index);
                                    }}
                                    value={section.settings.totalTime}
                                    label="Time"
                                    required
                                  />
                                </div>
                              )}
                            </div>
                          </Box>

                          <div className="text-xl space-y-2">
                            <h2>Movements</h2>
                            {section?.movements?.map((movement: Movement, movementIndex: number) => (
                              <div key={movement.key} className="flex gap-2">
                                <div className="w-[50%]">
                                  <Combobox
                                    name="movement"
                                    label="Movement"
                                    value={{ name: movement.movement }}
                                    onChange={(e) => {
                                      const t = { target: { name: 'movement', value: e.value.name } };
                                      handleSectionMovementChange(t as any, parentIndex, index, movementIndex);
                                    }}
                                    list={movements?.map((movement: any) => ({
                                      id: movement.id,
                                      value: movement.snippet.title,
                                      name: movement.snippet.title,
                                    }))}
                                  />
                                </div>
                                <div className="w-[25%]">
                                  <Select
                                    name={`type`}
                                    onChange={(event) => {
                                      handleSectionMovementChange(event as any, parentIndex, index, movementIndex);
                                    }}
                                    value={movement.type}
                                    label="Type"
                                    required
                                  >
                                    <Select.Option value="" disabled>
                                      Type
                                    </Select.Option>
                                    <Select.Option value="rep">Rep</Select.Option>
                                    <Select.Option value="duration">Duration</Select.Option>
                                  </Select>
                                </div>

                                <div className="w-[25%]">
                                  <Input
                                    type="number"
                                    name={`value`}
                                    onChange={(event) => {
                                      handleSectionMovementChange(event, parentIndex, index, movementIndex);
                                    }}
                                    min="0"
                                    value={movement.value}
                                    label="Value"
                                    required
                                  />
                                </div>

                                <div className="flex items-center mt-6">
                                  <MinusCircleIcon
                                    onClick={() => handleRemoveMovement(parentIndex, index, movementIndex)}
                                    className="h-5 w-5 text-red-600"
                                  />
                                </div>
                              </div>
                            ))}
                            <Button onClick={() => handleAddMovement(parentIndex, index)} variant={ButtonVariants.Soft}>
                              + Add Movement
                            </Button>
                          </div>
                          <hr />
                        </Box>
                      ))}
                    </div>
                    <Button
                      className="mt-6"
                      variant={ButtonVariants.Secondary}
                      onClick={() => handleAddSection(parentIndex)}
                    >
                      + Generate Section
                    </Button>
                  </Card>
                ))}
                <Button onClick={handleAddWorkout}>+ Generate Workout</Button>
              </Box>
            </>
          )}

          <div className="col-span-1">
            <div className="sticky top-8 space-y-2">
              <WorkoutPreviewer workouts={workouts[currentLevelTab]} dailyNote={workouts.dailyNote} />
              <Button className="w-full" type="submit">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
