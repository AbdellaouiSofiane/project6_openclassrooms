const base_url = "http://localhost:8000/api/v1/titles/?"

const category_1 = "Action"
const category_2 = "Adventure"
const category_3 = "Comedy"
const category_list = [category_1, category_2, category_3]

const max_movies_by_category = 7

const max_visible_by_category = 4


function append_movie_node(parent, key, index) {
	const movie_element = document.createElement("li");
	const movie_link = document.createElement("a");
	const movie_img = document.createElement("img");

	movie_element.setAttribute("class", "slide");
	movie_link.setAttribute("href", key.imdb_url);
	movie_img.setAttribute("src", key.image_url);
	movie_img.setAttribute("alt", key.title);

	if (index < max_visible_by_category) {
		movie_element.classList.add('visible')
	}

	movie_link.appendChild(movie_img);
	movie_element.appendChild(movie_link);
	parent.appendChild(movie_element)


};


function custom_fetch(url, param, node, page=1, nb_element=0) {
	param.page = page
	fetch(url + new URLSearchParams(param))
		.then(response => response.json())
		.then(data => {
			for (key of data.results) {
				if (nb_element < max_movies_by_category) {
					append_movie_node(node, key, nb_element)
					nb_element++
				} else {
					break
				}
			}
			if (nb_element < max_movies_by_category) {
				page++
				custom_fetch(url, param, node, page, nb_element)
			}
		});
};

// highlight section
fetch(base_url + new URLSearchParams({
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

// top rated
top_rated = document.getElementById('top-rated-list')
custom_fetch(base_url, {sort_by: "-imdb_score"}, top_rated)

// categories 
var i = 1
for (category of category_list) {
	document.getElementById(`catagory-${i}-title`).innerHTML = category
	node_list = document.getElementById(`catagory-${i}-list`)
	custom_fetch(base_url, {genre: category, sort_by: "-imdb_score"}, node_list)
	i++
}
