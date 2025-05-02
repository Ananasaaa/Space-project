import { formatNotification } from './formatNotification';

describe('formatNotification', () => {
  it('should extract summary and notes from full message', () => {
    const input = 'Summary: This is the summary ## Notes: These are the notes';
    const result = formatNotification(input);
    expect(result.summary).toBe('This is the summary');
    expect(result.notes).toBe('These are the notes');
  });

  it('should extract summary even without notes', () => {
    const input = 'Summary: Just a summary without notes';
    const result = formatNotification(input);
    expect(result.summary).toBe('Just a summary without notes');
    expect(result.notes).toBe('');
  });

  it('should return fallback summary when not found', () => {
    const input = 'No summary or notes here';
    const result = formatNotification(input);
    expect(result.summary).toBe('No summary available');
    expect(result.notes).toBe('');
  });

  it('should extract only notes if summary missing', () => {
    const input = 'Notes: Only notes exist here';
    const result = formatNotification(input);
    expect(result.summary).toBe('No summary available');
    expect(result.notes).toBe('Only notes exist here');
  });
});
