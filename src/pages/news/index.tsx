import { useGetNasaNotificationsQuery } from '../../redux/apiSlice';
import '../news/newspage.scss';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_newspage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Newspage = () => {
  const { data, isLoading, isError } = useGetNasaNotificationsQuery({
    startDate: '2024-04-01',
    endDate: '2024-04-25',
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading notifications</p>;

  const formatNotification = (body: string) => {
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
  return (
    <div className="" style={backgroundStyle}>
      <div className="notifications-page">
        <h1 className="page-title">NASA Notifications</h1>
        <div className="notifications-list">
          {data.map((notification: any) => {
            const { summary, notes } = formatNotification(
              notification.messageBody
            );

            return (
              <div
                key={notification.messageID}
                className="notification-card fade-in"
              >
                <h2 className="message-type">🛰️ {notification.messageType}</h2>
                <p className="message-time">
                  📅 {new Date(notification.messageIssueTime).toLocaleString()}
                </p>
                <p className="message-summary">📌 {summary}</p>
                {notes && <p className="message-notes">🗒️ {notes}</p>}
                <a
                  href={notification.messageURL}
                  className="message-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 View Full Message
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Newspage;
