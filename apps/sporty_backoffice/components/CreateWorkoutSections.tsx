import { Box, Button, ButtonVariants, Combobox, Input } from 'ui';
import { Section } from '~/types/workout';

type CreateWorkoutSections = {
  section: Section;
  handleRemoveSection: (index: number) => void;
  handleSectionSettingsChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  index: number;
};

const CreateWorkoutSections = ({
  section,
  handleRemoveSection,
  handleSectionSettingsChange,
  index,
}: CreateWorkoutSections) => {
  return (
    <Box className="text-xl space-y-2">
      <div className="flex justify-between">
        <h2>Settings</h2>
        <Button
          className="text-red-500 hover:bg-red-100"
          variant={ButtonVariants.Text}
          onClick={() => handleRemoveSection(index)}
        >
          Remove Section
        </Button>
      </div>
      <div className="flex gap-4">
        <div className="w-1/3">
          <Input
            name={`sectionName`}
            onChange={(event) => {
              handleSectionSettingsChange(event, index);
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
              handleSectionSettingsChange(event, index);
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
              const t = { target: { name: 'type', value: e.value.name } };
              handleSectionSettingsChange(t as any, index);
              handleSectionSettingsChange({ target: { name: 'totalTime', value: '' } } as any, index);
              handleSectionSettingsChange({ target: { name: 'every', value: '' } } as any, index);
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
                handleSectionSettingsChange(event, index);
              }}
              value={section.settings.every}
              label="Every"
              required
            />
            <Input
              name="totalTime"
              onChange={(event) => {
                handleSectionSettingsChange(event, index);
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
                handleSectionSettingsChange(event, index);
              }}
              value={section.settings.totalTime}
              label="Time"
              required
            />
          </div>
        )}
      </div>
    </Box>
  );
};

export default CreateWorkoutSections;
