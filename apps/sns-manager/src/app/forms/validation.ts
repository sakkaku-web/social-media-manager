export function requiredMessage(value: any): string | null {
  if (!value) {
    return 'Required';
  }

  return null;
}

export function eitherRequired(value1: any, value2: any): string | null {
  if (!value1 && !value2) {
    return 'One of this value is required';
  }

  return null;
}

export function isValid(validation: { [k: string]: string | null }): boolean {
  return Object.values(validation).every((v) => v == null);
}
