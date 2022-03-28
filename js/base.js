(function() {

const base_url = "http://localhost:8000/api/v1/titles/?"

const category_1 = "Action"
const category_2 = "Adventure"
const category_3 = "Comedy"
const category_list = [category_1, category_2, category_3]

const max_movies_by_category = 7
const max_visible_by_category = 4

const modal = document.getElementById("myModal");
var close = document.getElementsByClassName("close")[0];


function append_movie_node(parent, key, index) {
	const movie_element = document.createElement("li");
	movie_element.setAttribute("class", "slide");
	if (index < max_visible_by_category) {
		movie_element.classList.add('visible')
	}

	const movie_link = document.createElement("a");
	movie_link.setAttribute("data_url", key.url);
	movie_link.setAttribute("class", "btn");

	const movie_img = document.createElement("img");
	movie_img.setAttribute("src", key.image_url);
	movie_img.setAttribute("alt", key.title);

	movie_link.appendChild(movie_img);
	movie_element.appendChild(movie_link);
	parent.appendChild(movie_element);

	movie_link.addEventListener('click', function() {
		display_modal(key.url)
	})
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

// hide modal when user clicks the close button
close.onclick = function() {
  modal.style.display = "none";
}

// Hide modal when user clicks the close button anywhere outside of the modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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


})()
