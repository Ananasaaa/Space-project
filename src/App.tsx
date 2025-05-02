import './styles/App.scss';
import { Suspense } from 'react';
import Navbar from './components/common/navbar/Navbar';
import Loader from './components/common/loader/Loader';
import AnimatedRoutes from './components/routing/AnimatedRoutes';

function App() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <Suspense fallback={<Loader />}>
          <AnimatedRoutes />
        </Suspense>
      </div>
    </>
  );
}

export default App;
