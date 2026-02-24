import Header from './pages/Header';
import MainPage from './pages/MainPage';
import Footer from './pages/Footer';

const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen px-3 py-4">
        <Header />
        <MainPage />
        <Footer />
      </div>
    </>
  );
};

export default App;
