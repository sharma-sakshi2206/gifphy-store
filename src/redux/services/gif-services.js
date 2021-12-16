export const gifServices = {
    getTrendingGif,
    searchGif,
};

function getTrendingGif(offset) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`https://api.giphy.com/v1/gifs/trending?${new URLSearchParams({
        "api_key": "z5lV0kce631bjSEhYoWSGXK5Fb5tVAPt",
        "limit": 20,
        "offset": offset
      })}`, requestOptions).then(handleResponse);
}

function searchGif(searchKey, offset) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`https://api.giphy.com/v1/gifs/search?${new URLSearchParams({
        "api_key": "z5lV0kce631bjSEhYoWSGXK5Fb5tVAPt",
        "limit": 20,
        "q": searchKey,
        "offset": offset,
      })}`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}