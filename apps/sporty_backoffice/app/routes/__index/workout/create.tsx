import { useEffect, useState } from 'react';
import { Box, ButtonVariants, Form, Select, Combobox } from 'ui';
import { Button, Card, Input } from 'ui';
import { MinusCircleIcon } from '@heroicons/react/24/solid';
import { ActionArgs } from '@remix-run/server-runtime';
import { movements } from 'movements';
import clsx from 'clsx';

type Movement = {
  movement: string;
  type: string;
  value: string;
  key: number;
};

type Section = {
  settings: { sectionName: string; sectionNote: string; type: string };
  movements: Movement[];
  key: number;
};

type ChildrenOfSettings = 'sectionName' | 'sectionNote' | 'type';
type ChildrenOfMovement = 'movement' | 'type' | 'value';

type Workout = {
  workoutName: string;
  sections: Section[];
  key: number;
};

type Level = {
  Beginner: Workout[];
  Intermediate: Workout[];
  Advanced: Workout[];
};

export const action = async ({ request }: ActionArgs) => {
  const text = await request.text();
  console.log(text);
  return text;
};

export default function createWorkout() {
  const [workouts, setWorkouts] = useState<Level>({ Beginner: [], Advanced: [], Intermediate: [] });
  const [currentLevelTab, setCurrentLevelTab] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const tabs = [{ name: 'Beginner' }, { name: 'Intermediate' }, { name: 'Advanced' }];

  useEffect(() => {
    console.log(workouts);
  }, [workouts]);

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
    console.log(workouts);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="mx-3">
        <Input label="Daily Note" />
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

      <Form method="post">
        <div className="mx-3 grid grid-cols-4 gap-4">
          {workouts[currentLevelTab] && (
            <>
              <Box className="col-span-3 flex flex-col space-y-2">
                {workouts[currentLevelTab]?.map((workout: Workout, parentIndex: number) => (
                  <Card className="flex flex-col space-y-2 border" key={workout.key}>
                    <div className="flex justify-end">
                      <Button onClick={() => handleRemoveWorkout(parentIndex)}>x</Button>
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
                    <hr />
                    {workout?.sections.map((section: Section, index: number) => (
                      <Box key={section.key} className="flex min-w-[400px] gap-6">
                        <div className="flex justify-end">
                          <Button onClick={() => handleRemoveSection(parentIndex, index)}>x</Button>
                        </div>
                        <Box className="text-xl space-y-2 w-[30%] ">
                          <h2>Settings</h2>
                          <Input
                            name={`sectionName`}
                            onChange={(event) => {
                              handleSectionSettingsChange(event, parentIndex, index);
                            }}
                            value={section.settings.sectionName}
                            label="Section Name"
                            required
                          />
                          <Input
                            name={`sectionNote`}
                            onChange={(event) => {
                              handleSectionSettingsChange(event, parentIndex, index);
                            }}
                            value={section.settings.sectionNote}
                            label="Section Note"
                            required
                          />
                          <Combobox
                            name="type"
                            label="Type"
                            value={{ name: section.settings.type }}
                            onChange={(e) => {
                              handleSectionTypeComboboxChange(e, parentIndex, index);
                            }}
                            list={[
                              { id: 'forTime', name: 'FOR TIME', value: 'forTime' },
                              { id: 'amrap', name: 'AMRAP', value: 'amrap' },
                              { id: 'emom', name: 'EMOM', value: 'emom' },
                              { id: 'notForTime', name: 'NOT FOR TIME', value: 'notForTime' },
                            ]}
                          />
                        </Box>

                        <div className="text-xl space-y-2 w-[70%]">
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
                                  value={movement.value}
                                  label="Duration"
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
                      </Box>
                    ))}
                    <div>
                      <Button onClick={() => handleAddSection(parentIndex)}>+ Generate Section</Button>
                    </div>
                  </Card>
                ))}
                <Button onClick={handleAddWorkout}>+ Generate Workout</Button>
              </Box>
            </>
          )}

          {/* Preview */}
          <div className="col-span-1">
            <div className="sticky top-8 space-y-2">
              <Card>
                <h1 className="text-xl">Preview</h1>
              </Card>
              <Card className="overflow-auto max-h-[600px] space-y-2">
                {workouts[currentLevelTab].map((workout, workoutIndex: number) => (
                  <Box>
                    <h3 className="text-lg">{workout.workoutName}</h3>
                    {workout.sections.map((section) => (
                      <Box>
                        <p className="text-xs text-yellow-500">{section.settings?.sectionName}</p>
                        <p className="text-sm">
                          {section.settings?.sectionNote && <span className="text-orange-500">Coach Note: </span>}
                          {section.settings?.sectionNote}
                        </p>
                        <div className="px-4 py-2">
                          <p className=""> {section?.settings?.type}</p>
                          <ul className="list-disc flex flex-col">
                            {section?.movements.map((movement) => (
                              <li>
                                {movement.value} {movement.movement}{' '}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Box>
                    ))}
                    <hr />
                  </Box>
                ))}
              </Card>
              <Button className="w-full" type="submit">
                Save
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
