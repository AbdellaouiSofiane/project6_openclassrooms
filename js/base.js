// Constants
const BASE_URL = "http://localhost:8000/api/v1/titles/?"
const FIRST_CATEGORY_NAME = "Action"
const SECOND_CATEGORY_NAME = "Adventure"
const THIRD_CATEGORY_NAME = "Comedy"
const CATEGORY_NAME_LIST = [
	FIRST_CATEGORY_NAME,
	SECOND_CATEGORY_NAME,
	THIRD_CATEGORY_NAME
]
const NB_MOVIES_BY_CATEGORY = 7
const NB_VISIBLE_BY_CATEGORY = 4


// create html list element with desired attribute
function get_movie_child_node(data) {
	const movie_element = document.createElement("li");
	const movie_link = document.createElement("a");
	const movie_img = document.createElement("img");

	movie_element.setAttribute("class", "slide");
	movie_img.setAttribute("src", data.image_url);
	movie_img.setAttribute("alt", data.title);
	movie_img.setAttribute("data-url", data.url);

	movie_link.appendChild(movie_img);
	movie_element.appendChild(movie_link);

	return movie_element
};


// populate modal with fetched data
function display_modal(url) {
	fetch(url)
		.then(response => response.json())
		.then(data => {
			document.getElementById('modal-img').setAttribute("src", data.image_url);
			document.getElementById('modal-title').innerHTML = data.title;
			document.getElementById('modal-description').innerHTML = data.long_description;;
			document.getElementById('modal-date-published').innerHTML = data.date_published;
			document.getElementById('modal-avg-vote').innerHTML = data.avg_vote;
			document.getElementById('modal-imdb').innerHTML = data.imdb_score;
			document.getElementById('modal-duration').innerHTML = data.duration;
			document.getElementById('modal-directors').innerHTML = data.directors.join(', ');
			document.getElementById('modal-countries').innerHTML = data.countries.join(', ');
			document.getElementById('modal-actors').innerHTML = data.actors.join(', ');
		});

	modal.style.display = "block";
}


// Append the required number of movies' elements to category div
function append_movies_to_category(get_param, parent_node, page=1, nb_fetched=0) {
	get_param.page = page
	fetch(BASE_URL + new URLSearchParams(get_param))
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error("Can't fetch data from server");
		})
		.then(data => {
			for (item of data.results) {
				if (nb_fetched < NB_MOVIES_BY_CATEGORY) {

					// get movie node
					var movie_node = get_movie_child_node(item, nb_fetched)

					// display modal on click
					movie_node.addEventListener('click', function(e) {
						var url = e.target.getAttribute('data-url')
						display_modal(url)
					})

					// apend movie node element
					parent_node.appendChild(movie_node)

					// set movie node visibility
					if (nb_fetched < NB_VISIBLE_BY_CATEGORY) {
						movie_node.classList.add('visible')
					}
					nb_fetched++
				} else {
					return
				}
			}
			page++
			append_movies_to_category(get_param, parent_node, page, nb_fetched)
		})
		.catch(error => {
			console.log(error)
		});
};
