import { Routes, Route } from 'react-router-dom';
import SkeletonLoader from '@src/components/Common/SkeletonLoader';

import HomePage from '@src/pages/HomePage';
import AboutPage from '@src/pages/AboutPage';
import NotFound from '@src/pages/NotFound';

import MediaCategoryPage from '@src/pages/MediaCategoryPage';
import GenreListPage from '@src/pages/GenreListPage';
import GenreDetailsPage from '@src/pages/GenreDetailsPage';
import MediaDetailsPage from '@src/pages/MediaDetailsPage';
import PersonDetailsPage from '@src/pages/PersonDetailsPage';
import ProfilePage from '@src/pages/ProfilePage';

import SimilarMediaPage from '@src/pages/SimilarMediaPage';
import SimilarMediaFromTMDB from '@src/pages/SimilarMediaFromTMDB';
import DiscoverSimilarMediaPage from '@src/pages/DiscoverSimilarMediaPage';
import ExploraChat from '@src/pages/ExploraChat';
import RatingPage from '@src/pages/RatingPage';
import RecommenderPage from '@src/pages/RecommenderPage';
import SearchAndRecommendationsPage from '@src/pages/SearchAndRecommendationsPage';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/about' element={<AboutPage />} />
    <Route path='*' element={<NotFound />} />

    <Route path='/category/:mediaType/:mediaCategory' element={<MediaCategoryPage />} />
    <Route path='/explore/genre/:mediaType/list' element={<GenreListPage />} />
    <Route path='/explore/:genreName/:mediaType/' element={<GenreDetailsPage />} />
    <Route path='/details/:mediaType/:mediaId' element={<MediaDetailsPage />} />
    <Route path='/person/:personId' element={<PersonDetailsPage />} />
    <Route path='/profile' element={<ProfilePage />} />

    <Route path='/recommender' element={<RecommenderPage />} />
    <Route path='/explore/similar' element={<SimilarMediaPage />} />
    <Route path='/explore/discover' element={<DiscoverSimilarMediaPage />} />
    <Route path='/explore/similar_from_tmdb' element={<SimilarMediaFromTMDB />} />
    <Route path='/chat_recommender' element={<ExploraChat />} />
    <Route path='/rating_recommender' element={<RatingPage />} />
    <Route path='/search_recommender' element={<SearchAndRecommendationsPage />} />
  </Routes>
);

export default AppRoutes;
