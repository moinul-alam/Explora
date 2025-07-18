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
import RecommenderPage from '@src/pages/RecommenderPage';
import SearchAndRecommendationsPage from '@src/pages/SearchAndRecommendationsPage';
import SearchRateAndRecommendationsPage from '@src/pages/SearchRateAndRecommendations';
import WeightedHybridRecommender from '@src/pages/WeightedHybridRecommender';
import AdvancedHybridRecommender from '@src/pages/AdvancedHybridRecommender';

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

    <Route path='/explore/recommenders' element={<RecommenderPage />} />
    <Route path='/explore/similar' element={<SimilarMediaPage />} />
    <Route path='/explore/discover' element={<DiscoverSimilarMediaPage />} />
    <Route path='/explore/similar_from_tmdb' element={<SimilarMediaFromTMDB />} />
    <Route path='/explore/user_chat_recommender' element={<ExploraChat />} />
    <Route path='/explore/favorite_item_recommender' element={<SearchAndRecommendationsPage />} />
    <Route path='/explore/user_rating_recommender' element={<SearchRateAndRecommendationsPage />} />
    <Route path='/explore/weighted_hybrid_recommender' element={<WeightedHybridRecommender />} />
    <Route path='/explore/advanced_hybrid_recommender' element={<AdvancedHybridRecommender />} />
  </Routes>
);

export default AppRoutes;
