export function getCurrentDate() {
  const today = new Date();
  return today.toLocaleDateString('sr-RS', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
