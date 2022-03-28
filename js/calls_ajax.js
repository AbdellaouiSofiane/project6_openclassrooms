(function(){
	// Highlight movie section
	fetch(BASE_URL + new URLSearchParams({
		sort_by: "-imdb_score"
	}))
		.then(response => response.json())
		.then(data => {
			document.getElementById('highlight-title-text').innerHTML = data.results[0].title;
			document.getElementById('highlight-img').setAttribute("src", data.results[0].image_url);
			fetch(data.results[0].url)
				.then(response => response.json())
				.then(data => {
					document.getElementById('highlight-description-text').innerHTML = data.long_description;
			});
		});

	// Top rated category
	top_rated = document.getElementById('top-rated-list')
	append_movies_to_category({sort_by: "-imdb_score"}, top_rated)

	// Other categories
	var i = 1
	for (category of CATEGORY_NAME_LIST) {
		document.getElementById(`catagory-${i}-title`).innerHTML = category
		node_list = document.getElementById(`catagory-${i}-list`)
		append_movies_to_category({genre: category, sort_by: "-imdb_score"}, node_list)
		i++
	}
})()
