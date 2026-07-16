export const FIELD_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  DROPDOWN: 'dropdown',
  CHECKBOX: 'checkbox',
};

export const FIELD_TYPE_LABELS = {
  [FIELD_TYPES.TEXT]: 'Text',
  [FIELD_TYPES.NUMBER]: 'Number',
  [FIELD_TYPES.DROPDOWN]: 'Dropdown',
  [FIELD_TYPES.CHECKBOX]: 'Checkbox',
};

export const FIELD_TYPE_OPTIONS = Object.values(FIELD_TYPES).map((value) => ({
  value,
  label: FIELD_TYPE_LABELS[value],
}));

export const LOCAL_STORAGE_KEY = 'form-builder-schema'

