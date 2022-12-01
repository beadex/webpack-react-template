import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Home: FC = (): ReactElement => {
  return (
    <>
      <div>Home</div>
      <Link to="/create">Create</Link>
    </>
  );
};

export default Home;
