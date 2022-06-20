import 'package:flutter/material.dart';
import 'package:peliculas/models/models.dart';
import 'package:peliculas/widgets/widgets.dart';

class DetailScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    final Movie movie = ModalRoute.of(context)?.settings.arguments as Movie;
    
    return Scaffold(
      body: CustomScrollView(
        slivers: [

          _CustomAppBar(
            title: movie.title,
            poster: movie.fullBackdropPath,
          ),


          SliverList(
            delegate: SliverChildListDelegate([

              _PosterAndTitle( movie ),

              _Overview( movie.overview ),

              CastingCards( movie.id ),

            ]),
          ),
        ],
      ),
    );
  }
}

class _CustomAppBar extends StatelessWidget {

  final String title, poster;

  const _CustomAppBar({
    required this.title,
    required this.poster
  });

  @override
  Widget build(BuildContext context) {
    return SliverAppBar(
      backgroundColor: Colors.green,
      expandedHeight: 200,
      floating: false,
      pinned: true,
      flexibleSpace: FlexibleSpaceBar(
        // centerTitle: true,
        // titlePadding: EdgeInsets.all(0),
        // title: Container(
        //   padding: EdgeInsets.only( bottom: 10 ),
        //   width: double.infinity,
        //   alignment: Alignment.bottomCenter,
        //   color: Colors.black12,
        //   child: Text(
        //     title,
        //     style: TextStyle( fontSize: 16),
        //     textAlign: TextAlign.center,  
        //   )
        // ),
        background: FadeInImage(
          placeholder: AssetImage('assets/loading.gif'), 
          image: NetworkImage( poster ),
          fit: BoxFit.cover,
        ),
      ),

    );
  }
}

class _PosterAndTitle extends StatelessWidget {

  final Movie movie;

  const _PosterAndTitle( this.movie );

  @override
  Widget build(BuildContext context) {
  
    final TextTheme textTheme = Theme.of(context).textTheme;

    return Container(
      margin: EdgeInsets.only( top: 20),
      padding:  EdgeInsets.symmetric( horizontal: 20),
      child: Row(
        children: [
          Hero(
            tag: movie.heroId!,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(20),
              child: FadeInImage(
                placeholder: AssetImage('assets/no-image.jpg'), 
                image: NetworkImage( movie.fullPosterImg ),
                height: 150,
              ),
            ),
          ),

          SizedBox( width: 20 ),

          ConstrainedBox(
            constraints: BoxConstraints( maxWidth: 230 ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                  Text( 
                      movie.title, 
                      maxLines: 2, 
                      overflow: TextOverflow.ellipsis, 
                      style: textTheme.headline5, 
                  ),

                  Text( 
                    movie.originalTitle, 
                    style: textTheme.subtitle1, 
                    overflow: TextOverflow.ellipsis, 
                    maxLines: 2, 
                  ),

                  Row(
                    children: [
                      Icon(Icons.star_outline, size: 15, color: Colors.grey ),
                      SizedBox( width: 5 ),
                      Text( '${movie.voteAverage}', style: textTheme.caption ), 
                    ],
                  )

              ],

            )
          )
        ],
      ),      
    );
  }
}

class _Overview extends StatelessWidget {

  final String overview;

  const _Overview( this.overview );

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric( horizontal: 20, vertical: 20),
      child: Text( overview, style: TextStyle( fontSize: 16 ) )   
    );
  }
}