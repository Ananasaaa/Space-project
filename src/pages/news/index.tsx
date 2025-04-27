import { useGetNasaNotificationsQuery } from '../../redux/apiSlice';
import '../news/newspage.scss';
import Loader from '../../components/loader/Loader';
import { formatNotification } from '../../utils/formatNotification';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_newspage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'right center',
  backgroundRepeat: 'no-repeat',
};

const Newspage = () => {
  const { data, isLoading, isError } = useGetNasaNotificationsQuery({
    startDate: '2024-04-01',
    endDate: '2024-04-25',
  });

  if (isLoading) return <Loader />;
  if (isError || !data) return <p>Error loading notifications</p>;

  return (
    <div className="notifications-page" style={backgroundStyle}>
      <h1 className="page-title">NASA Notifications</h1>
      <div className="notifications-list">
        {data.slice(0, 10).map((notification: any) => {
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
  );
};

export default Newspage;
