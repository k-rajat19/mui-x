'use client';
import {
  singleItemFieldValueManager,
  singleItemValueManager,
} from '../internals/utils/valueManagers';
import { useField } from '../internals/hooks/useField';
import { UseTimeFieldProps } from './TimeField.types';
import { validateTime } from '../validation';
import { useSplitFieldProps } from '../hooks';
import { PickerValidDate, FieldSection } from '../models';
import { useDefaultizedTimeField } from '../internals/hooks/defaultizedFieldProps';

export const useTimeField = <
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean,
  TAllProps extends UseTimeFieldProps<TDate, TEnableAccessibleFieldDOMStructure>,
>(
  inProps: TAllProps,
) => {
  const props = useDefaultizedTimeField<
    TDate,
    UseTimeFieldProps<TDate, TEnableAccessibleFieldDOMStructure>,
    TAllProps
  >(inProps);

  const { forwardedProps, internalProps } = useSplitFieldProps(props, 'time');

  return useField<
    TDate | null,
    TDate,
    FieldSection,
    TEnableAccessibleFieldDOMStructure,
    typeof forwardedProps,
    typeof internalProps
  >({
    forwardedProps,
    internalProps,
    valueManager: singleItemValueManager,
    fieldValueManager: singleItemFieldValueManager,
    validator: validateTime,
    valueType: 'time',
  });
};
