export function requiredMessage(value: any): string | null {
  if (!value) {
    return 'Required';
  }

  return null;
}
