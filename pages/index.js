import PropTypes from 'prop-types';
import Head from 'next/head';
import withLayout from '../lib/withLayout';

const Index = ({ user }) => (
  <div style={{ padding: '10px 45px' }}>
    <Head>
      <title>Index Page</title>
      <meta name="description" content="This is the description of the Index page" />
    </Head>
    <p>Index page content</p>
    <p>{user.email}</p>
  </div>
);

Index.getInitialProps = async ({ query }) => ({ user: query.user });

Index.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

Index.defaultProps = {
  user: null,
};

export default withLayout(Index);
