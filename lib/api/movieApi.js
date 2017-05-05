'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovie = exports.getMovies = undefined;

var _HttpProvider = require('./HttpProvider');

var getMovies = exports.getMovies = function getMovies(title) {
  var url = 'http://www.omdbapi.com/?s=' + title;
  return _HttpProvider.HttpProvider.get(url);
};

var getMovie = exports.getMovie = function getMovie(title) {
  var url = 'http://www.omdbapi.com/?t=' + title;
  return _HttpProvider.HttpProvider.get(url);
};