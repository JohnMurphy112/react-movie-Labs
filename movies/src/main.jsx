import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import UpcomingPage from "./pages/upcomingPage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import PopularMoviesPage from "./pages/PopularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMovies";
import MoviesPlayingNowPage from "./pages/moviesNowPlaying";
import ActorsAndMovies from "./pages/actorMovies";
import PlaylistPage from "./pages/Playlist";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: { main: "#1e3a8a" },       
    secondary: { main: "#7c3aed" },     
    background: {
      default: "#f4f6f8",               
      paper: "#ffffff",                
    },
  },
  typography: {
   fontFamily: '"Inter", sans-serif', 
  h1: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: "0.05em" },
  h2: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: "0.05em" },
  h3: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: "0.05em" },
  h4: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: "0.05em" },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
     <ThemeProvider theme={theme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/upcoming" element={<UpcomingPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/movies/popular" element={<PopularMoviesPage />} />
            <Route path="/movies/top_rated" element={<TopRatedMoviesPage />} />
            <Route path="/movies/now_playing" element={<MoviesPlayingNowPage />} />
            <Route path="/actors/:id" element={<ActorsAndMovies />} />
            <Route path="/movies/playlist" element={<PlaylistPage />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </ThemeProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
