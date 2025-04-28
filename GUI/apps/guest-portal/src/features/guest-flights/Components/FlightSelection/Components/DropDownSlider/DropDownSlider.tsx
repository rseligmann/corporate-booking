import { 
  Combobox, 
  useCombobox, 
  InputBase, 
  Slider,
  Text, 
  Stack,
  Box,
  Space
} from '@mantine/core';
import classes from './DropDownSlider.module.scss'

interface DropDownSliderProps{
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    onChange?: (value: number)=> void;
    placeholder?: string;
}

export const DropdownSlider: React.FC<DropDownSliderProps> = ({ 
  label, 
  min = 0, 
  max = 100, 
  step = 1, 
  value,
  onChange,
  placeholder
}) => {
  
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
    }
  });

  const handleSliderChange = (newValue: number) => {
    //setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const renderInputContent = () => {
    // Check if value is undefined or null, not if it's falsy
    if (value === undefined || value === null) {
      return <span style={{ color: 'var(--mantine-color-placeholder)' }}>{placeholder}</span>;
    }

    if (value > max) {
        return `$${max}`;
    }
    // Otherwise show the value
    return `$${value}`;
  };

  return (
    <Box>
      {label && <Text size="sm" mb={6}>{label}</Text>}
      <Combobox 
        store={combobox}  
        width={200} 
        position="bottom"
        withArrow
        withinPortal={false} 
        classNames={{dropdown: classes.dropdown}}
    >
        <Combobox.Target>
          <InputBase
            className={classes.input}
            component="button"
            variant='filled'
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
          >
            {renderInputContent()}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown >
          <Stack p="md">
            <Text fw={500} size='sm'>Set Max Price</Text>
            <Space h='sm' />
            <Slider
                min={min}
                max={max}
                marks={[{value: min, label: `$${min}` },{value: max, label: `$${max}`}]}
                step={step}
                value={value ?? max}
                onChange={handleSliderChange}
                labelAlwaysOn
                mb={20}
                thumbSize={14}
                label={(value) => `$${value}`}
            />
          </Stack>
        </Combobox.Dropdown>
      </Combobox>
    </Box>
  );
}