'use strict'

// put your own value below!
const apiKey = 'SWkWIODVpc0Ecz3sIzHo9dm88Jd4ZN1oMMus4WBL'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
};
//Full Name of park(fullName) - description(description) - website URL(url)
function displayResults(responseJson) {
    // if there are previous results, remove them
    let arrayState = responseJson.data;
    $('#results-list').empty();
  arrayState.forEach(x => $('#results-list').append(
        `<li>
            <h3>${x.fullName}</h3>
            <p>${x.description}</p>
            <a href='${x.url}'>Link</a>
        </li>`
      ))
    $('#results').removeClass('hidden');
};

function getParkInfo(query, maxResults) {
    const params = {
      api_key: apiKey,
      stateCode: query,
      limit: maxResults
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
};
  
function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-states').val();
      const maxResults = $('#js-max-results').val();
      getParkInfo(searchTerm, maxResults);
    });
}

function parkFinder() {
    watchForm();
}

$(watchForm);
