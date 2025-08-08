import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h2>404 - Page Not Found 🕵️‍♂️</h2>
      <p>We couldn't find the page you're looking for.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default NotFound;