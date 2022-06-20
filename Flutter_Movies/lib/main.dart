import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:peliculas/providers/movies_provider.dart';
import 'package:provider/provider.dart';

import 'screens/screens.dart';

 
void main() => {
  runApp(AppState()),
  SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
    statusBarIconBrightness: Brightness.light,
    statusBarColor: Colors.transparent,
  )),
};


class AppState extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
       ChangeNotifierProvider(create: (_) => MoviesProvider(), lazy: false, ),
      ],
      child: MyApp(),
    );
  }
}
 
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Peliculas app',
      initialRoute: 'home',
      routes: {
        'home'    : ( _ ) => HomeScreens(),
        'details' : ( _ ) => DetailScreen(),
      },
      theme: ThemeData.light().copyWith(
        appBarTheme: AppBarTheme(
          color: Colors.indigoAccent,
          centerTitle: true,
          elevation: 0,
        )
      ),
    );
  }
}