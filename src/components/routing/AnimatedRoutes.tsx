import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Homepage = lazy(() => import('../../pages/home/'));
const Photopage = lazy(() => import('../../pages/gallery/'));
const Weatherpage = lazy(() => import('../../pages/weather/'));
const Newspage = lazy(() => import('../../pages/news/'));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Homepage />
            </motion.div>
          }
        />
        <Route
          path="/gallery"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Photopage />
            </motion.div>
          }
        />
        <Route
          path="/weather"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Weatherpage />
            </motion.div>
          }
        />
        <Route
          path="/news"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Newspage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
