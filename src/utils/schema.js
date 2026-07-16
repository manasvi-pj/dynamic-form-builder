import { FIELD_TYPES } from './constants';

export function createField() {
  return {
    id: crypto.randomUUID(),
    label: '',
    type: FIELD_TYPES.TEXT,
    required: false,
    options: [],
  };
}
export function createOption() {
  return {
    id: crypto.randomUUID(),
    label: '',
  };
}

export const hasEmptyFieldLabel = (schema = []) =>
  schema.some((field) => !field?.label?.trim());

export const hasDuplicateFieldLabel = (schema = []) => {
  const normalized = schema
    .map((field) => field?.label?.trim().toLowerCase())
    .filter(Boolean);

  return new Set(normalized).size !== normalized.length;
};

export const getValidFields = (schema = []) => {
  const seen = new Set();

  return schema.filter((field) => {
    const label = field?.label?.trim();
    const key = label?.toLowerCase();

    if (!label || seen.has(key)) return false;

    if (field?.type === FIELD_TYPES.DROPDOWN) {
      const hasValidOptions = (field?.options ?? []).some(
        (option) => (option?.label ?? '').trim() !== '',
      );

      if (!hasValidOptions) return false;
    }

    seen.add(key);
    return true;
  });
};

export const getDefaultValues = (schema = []) => {
  const validFields = getValidFields(schema);

  return validFields.reduce((acc, field) => {
    const key = field?.label?.trim().replace(/\s+/g, '_').toLowerCase();

    if (!key) return acc;

    if (field?.type === FIELD_TYPES.DROPDOWN) {
      acc[key] = '';
    } else if (field?.type === FIELD_TYPES.CHECKBOX) {
      acc[key] = false;
    } else {
      acc[key] = '';
    }

    return acc;
  }, {});
};
