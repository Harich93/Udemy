
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:peliculas/helpers/debouncer.dart';
import 'package:peliculas/models/models.dart';
import 'package:peliculas/models/popular_response.dart';
import 'package:peliculas/models/search_movie_response.dart';
import 'package:peliculas/models/upcoming_response.dart';

class MoviesProvider extends ChangeNotifier {

  String _apiKey   = '48850b823f47e823c190a7f32e7f45de';
  String _baseUrl  = 'api.themoviedb.org';
  String _language = 'es-ES';

  List<Movie> onDisplayMovies = [];
  List<Movie> popularMovies = [];
  List<Movie> upcomingMovies = [];


  Map<int, List<Cast>> moviesCast = {};

  int _popularPage = 0;
  int _upcomingPage = 0;

  final debounce = Debouncer(
    duration: Duration( milliseconds: 500 ),
  );

  final StreamController<List<Movie>> _suggestionsStreamController = new StreamController.broadcast();
  Stream<List<Movie>> get suggestionStream => this._suggestionsStreamController.stream;

  MoviesProvider(){
    this.getOnDisplayMovies();
    this.getPopularMovies();
    this.getUpcomingMovies();
  }

  Future<String> _getJsonData( String endpoint, [int? page = 1]) async{
    final url = Uri.https( _baseUrl, endpoint, {
      'api_key'   : _apiKey,
      'language' : _language,
      'page'     : '$page'
    });

    final response = await http.get(url);
    return response.body;
  }

  getOnDisplayMovies() async{

    final jsonData = await _getJsonData('3/movie/now_playing');
    final nowPlayingResponse = NowPlayingResponse.fromJson( jsonData );

    onDisplayMovies = nowPlayingResponse.results;
    notifyListeners();
  }

  getPopularMovies() async{

    _popularPage++;

    final jsonData = await _getJsonData('3/movie/popular', _popularPage );
    final popularResponse = PopularResponse.fromJson( jsonData );

    popularMovies = [ ...popularMovies, ...popularResponse.results];
    notifyListeners();
  }

  getUpcomingMovies() async{

    _upcomingPage++;

    final jsonData = await _getJsonData('3/movie/upcoming', _upcomingPage );
    final upcomingResponse = UpcomingResponse.fromJson( jsonData );

    upcomingMovies = [ ...upcomingMovies, ...upcomingResponse.results];
    notifyListeners();
  }

  Future<List<Cast>> getMoviesCast( int movieId ) async{

    if ( moviesCast.containsKey(movieId) ) return moviesCast[movieId]!;

    final jsonData = await this._getJsonData('3/movie/$movieId/credits');
    final creditsResponse = CreditsResponse.fromJson( jsonData );

    moviesCast[movieId] = creditsResponse.cast;

    return creditsResponse.cast;

  }

  Future<List<Movie>> searchMovie( String query ) async{

    final url = Uri.https( _baseUrl, '3/search/movie', {
      'api_key'   : _apiKey,
      'language' : _language,
      'query'     : '$query'
    });

    final response = await http.get(url);
    final searchResponse = SearchResponse.fromJson(response.body);

    return searchResponse.results;
  }

  void getSuggestionsByQuery( String searchTerm ){
    
    debounce.value = '';
    debounce.onValue = ( value ) async{
      final results = await this.searchMovie((value));
      this._suggestionsStreamController.add( results );
    };

    final timer = Timer.periodic( Duration( milliseconds: 300), (_) {
      debounce.value = searchTerm;
    }); 
  
    Future.delayed( Duration(milliseconds: 301) ).then( ( _ ) => timer.cancel() );
  }


}