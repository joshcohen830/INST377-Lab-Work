async function windowFunctions() {
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    
    

    const request = await fetch(endpoint);

    const establishments = await request.json();

    function findMatches(WordToMatch, establishments) {
    return establishments.filter(place => {
        const regex = new RegExp(WordToMatch, 'gi');
        return place.category.match(regex) || place.zip.match(regex)
    });
    }

    function displayMatches(event) {
    const matchArray = findMatches(event.target.value, establishments);
    const html = matchArray.map(place => {
        return `
        <li>
            <span class='namezip'>${place.name}</span></br>
            <span class='category'>${place.category}</span></br>
            <span class='category'><em>${place.address_line_1}</em></span></br>
            <span class='category'><em>${place.city}</em></span></br>
            <span class='namezip'><em>${place.zip}</em></span></br>
        </li>
        </br>
        `;
    }).join('');
    suggestions.innerHTML = html;
    }

    const searchInput = document.querySelector('.input');
    const suggestions = document.querySelector('.suggestions');

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
}

window.onload = windowFunctions();

// CODE BEFORE CHANGES

// const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

// const establishments = [];

// fetch(endpoint)
//   .then(blob => blob.json())
//   .then(data => establishments.push(...data))

// function findMatches(WordToMatch, establishments) {
//   return establishments.filter(place => {
//     const regex = new RegExp(WordToMatch, 'gi');
//     return place.category.match(regex) || place.zip.match(regex)
//   });
// }

// function displayMatches() {
//   const matchArray = findMatches(this.value, establishments);
//   const html = matchArray.map(place => {
//     return `
//       <li>
//         <span class='namezip'>${place.name}</span></br>
//         <span class='category'>${place.category}</span></br>
//         <span class='category'><em>${place.address_line_1}</em></span></br>
//         <span class='category'><em>${place.city}</em></span></br>
//         <span class='namezip'><em>${place.zip}</em></span></br>
//       </li>
//       </br>
//     `;
//   }).join('');
//   suggestions.innerHTML = html;
// }

// const searchInput = document.querySelector('.input');
// const suggestions = document.querySelector('.suggestions');

// searchInput.addEventListener('change', displayMatches);
// searchInput.addEventListener('keyup', displayMatches);