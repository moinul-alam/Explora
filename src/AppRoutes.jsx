import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import SkeletonLoader from '@src/components/Common/SkeletonLoader';

const HomePage = lazy(() => import('@src/pages/HomePage'));
import NotFound from '@src/pages/NotFound';
import MediaDiscoveryPage from '@src/pages/MediaDiscoveryPage';
import GenreListPage from '@src/pages/GenreListPage';
import GenreDetailsPage from '@src/pages/GenreDetailsPage';
import MediaCategoryPage from '@src/pages/MediaCategoryPage';
import MediaDetailsPage from '@src/pages/MediaDetailsPage';
import PersonDetailsPage from '@src/pages/PersonDetailsPage';
import ProfilePage from '@src/pages/ProfilePage';
import AboutPage from '@src/pages/AboutPage';
import SimilarMediaPage from '@src/pages/SimilarMediaPage';
import SimilarMediaFromTMDB from '@src/pages/SimilarMediaFromTMDB';
import DiscoverSimilarMediaPage from './pages/DiscoverSimilarMediaPage';

const AppRoutes = () => (
  <Routes>
    <Route
      path='/'
      element={
        <Suspense fallback={<SkeletonLoader width="100%" height="50rem" count={3}/>}>
          <HomePage />
        </Suspense>
      }
    />
    <Route path='/explore/discover' element={<DiscoverSimilarMediaPage />} />
    <Route path='/explore/genre/:mediaType/list' element={<GenreListPage />} />
    <Route path='/explore/:genreName/:mediaType/' element={<GenreDetailsPage />} />
    <Route path='/category/:mediaType/:mediaCategory' element={<MediaCategoryPage />} />
    <Route path='/details/:mediaType/:mediaId' element={<MediaDetailsPage />} />
    <Route path='/person/:personId' element={<PersonDetailsPage />} />
    <Route path='/profile' element={<ProfilePage />} />
    <Route path='/about' element={<AboutPage />} />
    <Route path='/explore/similar' element={<SimilarMediaPage />} />
    <Route path='/explore/similar_from_tmdb' element={<SimilarMediaFromTMDB />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
