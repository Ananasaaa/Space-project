export const formatNotification = (body: string) => {
  const summaryMatch = body.match(/Summary:\s*(.*?)\s*(##|Notes:|$)/s);
  const summary = summaryMatch
    ? summaryMatch[1].trim()
    : 'No summary available';

  const noteMatch = body.match(/Notes:\s*(.*?)\s*$/s);
  const notes = noteMatch ? noteMatch[1].trim() : '';

  return {
    summary,
    notes,
  };
};
