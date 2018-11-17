import Head from 'next/head';
import Button from '@material-ui/core/Button';
import withLayout from '../lib/withLayout';

const Index = () => (
  <div style={{ padding: '10px 45px' }}>
    <Head>
      <title>Index Page</title>
      <meta name="description" content="This is the description of the Index page" />
    </Head>
    <p>Index page content</p>
    <Button variant="contained" color="primary">
      MUI Button
    </Button>
  </div>
);

export default withLayout(Index);
