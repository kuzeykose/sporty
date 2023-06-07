import { XMarkIcon } from '@heroicons/react/24/solid';
import { movements } from 'movements';
import { ChangeEvent } from 'react';
import { Combobox, Input, Select } from 'ui';
import { Movement } from '~/types/workout';

type CreateWorkoutMovements = {
  movement: Movement;
  handleSectionMovementChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, movementIndex: number) => void;
  handleRemoveMovement: (index: number, movementIndex: number) => void;
  index: number;
  movementIndex: number;
};

const CreateWorkoutMovements = ({
  movement,
  handleSectionMovementChange,
  handleRemoveMovement,
  index,
  movementIndex,
}: CreateWorkoutMovements) => {
  return (
    <div key={movement.key} className="flex items-center gap-2">
      <div className="w-[50%]">
        <Combobox
          name="movement"
          label="Movement"
          value={{ name: movement.movement }}
          onChange={(e) => {
            const t = { target: { name: 'movement', value: e.value.name } } as ChangeEvent<HTMLInputElement>;
            handleSectionMovementChange(t, index, movementIndex);
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
            handleSectionMovementChange(event as any, index, movementIndex);
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
            handleSectionMovementChange(event, index, movementIndex);
          }}
          min="0"
          value={movement.value}
          label="Value"
          required
        />
      </div>

      <XMarkIcon
        onClick={() => handleRemoveMovement(index, movementIndex)}
        className="h-5 w-5 mt-7 text-red-500 rounded cursor-pointer hover:bg-red-100"
      />
    </div>
  );
};

export default CreateWorkoutMovements;
