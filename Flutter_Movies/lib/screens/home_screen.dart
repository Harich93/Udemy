import 'package:flutter/material.dart';
import 'package:peliculas/providers/movies_provider.dart';
import 'package:peliculas/search/search_delegate.dart';
import 'package:peliculas/widgets/widgets.dart';
import 'package:provider/provider.dart';


class HomeScreens extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    final moviesProvider = Provider.of<MoviesProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Peliculas en cine'),
        actions: [
          IconButton(
            onPressed: () => showSearch(context: context, delegate: MovieSearchDelegate() ), 
            icon: Icon(Icons.search_outlined)
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            
            // Tarjetas principales
            CardSwiper( movies: moviesProvider.onDisplayMovies ),
      
            // Slider de peliculas
            MovieSlider( 
              movies: moviesProvider.popularMovies, 
              title: 'Populares', 
              onNextPage: () => moviesProvider.getPopularMovies() ,  
            ),

            SizedBox( height: 20 ),

            MovieSlider(
              movies: moviesProvider.upcomingMovies, 
              title: 'Próximamente',
              onNextPage: () => moviesProvider.getUpcomingMovies(),
            ),
          ],
        ),
      ),
    );
  }
}