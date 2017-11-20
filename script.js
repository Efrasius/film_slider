var films = {}
var httpRequest = new XMLHttpRequest()

httpRequest.open('GET', 'https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe', true)

httpRequest.onreadystatechange = function () {
  if (httpRequest.readyState == 4 && httpRequest.status == 200){
    films = JSON.parse(httpRequest.responseText)

	//Création de la div avec contenus

	for (var i = 0; i < 5; i++){
		var img = films.results[i].backdrop_path
		var lnk = 'https://image.tmdb.org/t/p/w500' + img

		var div = $('.tab')
		var title = $('<div class="list">' + films.results[i].title + '<br/></div>')
		var image = $('<img src="' + lnk + '"/>')
		var resum = $('<p>' + films.results[i].overview + '</p>')

		//Arrondir la note pour les étoiles
		var note = Math.round(films.results[i].vote_average)
		
		title.append(image)
		title.append(resum)
		
		//Mettre le bon nombre d'étoiles
		for (j = 1; j < note; j++) {
			title.append('<img src="star.png"/>')
		}
		div.append(title)

	}

	//Animation fadein fadeout au changement de film
	
	var tab = $('.tab .list')
	$(tab[0]).addClass('active')
	i = 0;
	
	$('.suivant').click(function(e){
		$(tab[i]).fadeOut(500, function(){
			if (i < 4) {
				i++
			}
			else {
				i = 0
			}	
		$(tab[i]).fadeIn(500)
		})
	})
	
	$('.precedent').click(function(e){
		$(tab[i]).fadeOut(500, function(){
			if (i > 0) {
				i--
			}
			else {
				i = 4
			}
		$(tab[i]).fadeIn(500)
		})
	})

  }
}
httpRequest.send(null)