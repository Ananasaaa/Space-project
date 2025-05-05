export const formatNotification = (body: string) => {
  const withoutLinks = body.replace(/https?:\/\/\S+/g, '');

  const lines = withoutLinks
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const summary = lines[0] || 'No summary available';

  const notes = lines.slice(1).join(' ').trim();

  return {
    summary,
    notes,
  };
};
