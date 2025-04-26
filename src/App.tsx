import './styles/App.scss';
import { Suspense } from 'react';
import Navbar from './components/navbar/Navbar';
import Loader from './components/loader/Loader';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <AnimatedRoutes />
      </Suspense>
    </>
  );
}

export default App;
