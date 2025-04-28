import { 
    Combobox, 
    useCombobox, 
    InputBase, 
    RangeSlider,
    Text, 
    Stack,
    Box,
    Space
  } from '@mantine/core';
  import classes from '../DropDownSlider/DropDownSlider.module.scss'
  
  interface DropDownRangeSliderProps{
      min?: number;
      max?: number;
      step?: number;
      value?: [number, number];
      onChange?: (value: [number, number])=> void;
      placeholder?: string;
      minRange?: number;
  }
  
  export const DropdownRangeSlider: React.FC<DropDownRangeSliderProps> = ({ 
    min = 0, 
    max = 24, 
    step = 1, 
    value,
    onChange,
    placeholder,
    minRange
  }) => {
    
    const combobox = useCombobox({
      onDropdownClose: () => {
        combobox.resetSelectedOption();
      }
    });
  
    const handleSliderChange = (newValue: [number, number]) => {
      //setInternalValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    };

    const formatTime = (hour: number): string => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12 AM
        return `${hour12}:00 ${period}`;
      };

    // Format the range for display in the input
    const formatTimeRange = (range: [number, number]): string => {
        return `${formatTime(range[0])} - ${formatTime(range[1])}`;
    };
  
    const renderInputContent = () => {
      if (value === undefined || value === null) {
        return <span style={{ color: 'var(--mantine-color-placeholder)' }}>{placeholder}</span>;
      }
  
      // Otherwise show the value
      return formatTimeRange(value);
    };
  
    return (
      <Box>
        {/* {label && <Text size="sm" mb={6}>{label}</Text>} */}
        <Combobox 
          store={combobox}  
          width={250} 
          position="bottom"
          withArrow
          withinPortal={false} 
          classNames={{dropdown: classes.dropDownRange}}
      >
          <Combobox.Target>
            <InputBase
              className={classes.inputRange}
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
              <Text fw={500} size='sm'>Set Time Range</Text>
              <Space h='sm' />
              <RangeSlider
                    min={min}
                    max={max}
                    marks={
                        [{value: min, label: formatTime(min) },
                        {value: max, label: formatTime(max)}]
                    }
                  step={step}
                  value={value ?? [min, max]}
                  onChange={handleSliderChange}
                  labelAlwaysOn
                  mb={20}
                  thumbSize={14}
                  label={(value) => formatTime(value)}
                  minRange={minRange}
              />
            </Stack>
          </Combobox.Dropdown>
        </Combobox>
      </Box>
    );
  }