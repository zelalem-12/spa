import Meta from 'components/Meta';

const Home = () => {
  const pageTitle = 'Home';

  return (
    <div>
      <Meta title={pageTitle} />
      <h1 className="heading-1">Welcome</h1>
      <p>Use the menu to navigate to each required service.</p>
    </div>
  );
};

export default Home;
