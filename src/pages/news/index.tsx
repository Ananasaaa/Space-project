import { mockNews } from '../../mocks/mockNews';
import '../news/newspage.scss';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_newspage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Newspage = () => {
  return (
    <div className="" style={backgroundStyle}>
      <div className="notifications-page">
        <h1 className="page-title">NASA Notifications</h1>
        <div className="notifications-list">
          {mockNews.map((notification) => (
            <div key={notification.messageID} className="notification-card">
              <h2 className="message-type">{notification.messageType}</h2>
              <p className="message-time">
                Issued:{' '}
                {new Date(notification.messageIssueTime).toLocaleString()}
              </p>
              <p className="message-body">{notification.messageBody}</p>
              <a
                href={notification.messageURL}
                className="message-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newspage;
