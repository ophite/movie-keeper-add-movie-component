import { HttpProvider } from './HttpProvider';

export const getMovies = (title) => {
  const url = 'http://www.omdbapi.com/?s=' + title;
  return HttpProvider.get(url);
};

export const getMovie = (title) => {
  const url = 'http://www.omdbapi.com/?t=' + title;
  return HttpProvider.get(url);
};
