export function requiredMessage(value: any): string | null {
  if (!value) {
    return 'Required';
  }

  return null;
}

export function isValid(validation: { [k: string]: string | null }): boolean {
  return Object.values(validation).every((v) => v == null);
}
