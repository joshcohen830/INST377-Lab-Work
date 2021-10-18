// async function windowFunctions() {
//   const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

//   const request = await fetch(endpoint);

//   const establishments = await request.json();

//   const mymap = L.map('mapid').setView([38.989, -76.93], 12);

//   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
// eslint-disable-next-line max-len
//     accessToken: 'pk.eyJ1IjoiamNvaGVuNDMiLCJhIjoiY2t1dHprZWk5MXJkbzJvcGczb3VweXNqaCJ9.7W2odTXexHrjDFEatguIag'
//   }).addTo(mymap);

//   function findMatches(WordToMatch, establishments) {
//     return establishments.filter((place) => {
//       const regex = new RegExp(WordToMatch, 'gi');
//       return place.category.match(regex) || place.zip.match(regex);
//     });
//   }

//   function displayMatches(event) {
//     const matchArray = findMatches(event.target.value, establishments);
//     const html = matchArray.map((place) => `
//         <li>
//             <span class='namezip'>${place.name}</span></br>
//             <span class='category'>${place.category}</span></br>
//             <span class='category'><em>${place.address_line_1}</em></span></br>
//             <span class='category'><em>${place.city}</em></span></br>
//             <span class='namezip'><em>${place.zip}</em></span></br>
//         </li>
//         </br>
//         `).join('');
//     suggestions.innerHTML = html;
//   }

//   const searchInput = document.querySelector('.input');
//   const suggestions = document.querySelector('.suggestions');

//   searchInput.addEventListener('change', displayMatches);
//   searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
// }

// window.onload = windowFunctions();

function toggleSpanVisibility(evt) {
  const button = evt.target;
  const target = document.querySelector('#clear');
  console.log(target.classList);
  if (target.classList.value.includes('visible')) {
    console.log('found item');
    target.classList.remove('visible');
    target.classList.add('hidden');
  } else {
    target.classList.remove('hidden');
    target.classList.add('visible');
  }
}

async function fetchRequest(url) {
  try {
    const request = await fetch(url);
    const json = await request.json();
    return json;
  } catch (err) {
    console.error(err);
    return err;
  }
}

// function filterFunction(event, data, list, mymap) {
//   list.innerHTML = '';
//   console.log(event.target.value);
//   const filteredList = data.filter((item, index) => {
//     const zipcode = event.target.value;
//     return item.zip === zipcode;
//   });
//   console.table(filteredList);

//   const limitedList = filteredList.slice(0, 5);

//   limitedList.forEach((item, index) => {
//     const point = item.geocoded_column_1;
//     if (!point || !point.coordinates) { return; }
//     const latLong = point.coordinates;
//     const marker = latLong.reverse();

//     list.innerHTML += `<span class="resto-name box">${item.name}</span><br>
//     <span class="resto-name">${item.address_line_1}</span><br>`;
//     console.log(marker);
//     L.marker(marker).addTo(mymap);
//   });
// }

async function mainThread() {
  let markers = [];
  console.log('loaded main script');
  const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const inputBox = document.querySelector('#zipcode');
  const visibleListOfFilteredItems = document.querySelector('.append-box');

  const mymap = L.map('mapid').setView([38.989, -76.93], 12);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamNvaGVuNDMiLCJhIjoiY2t1dHprZWk5MXJkbzJvcGczb3VweXNqaCJ9.7W2odTXexHrjDFEatguIag'
  }).addTo(mymap);

  const targetElement = document.querySelector('#zipcode');
  targetElement.addEventListener('input', (event) => toggleSpanVisibility(event));

  const data = await fetchRequest(url);
  console.log('external dataset', data);

  inputBox.addEventListener('input', (event) => {
    console.log(event.target.value);
    visibleListOfFilteredItems.innerHTML = '';
    const filteredList = data.filter((item, index) => {
      const zipcode = event.target.value;
      return item.zip === zipcode;
    });
    console.table(filteredList);
    const limitedList = filteredList.slice(0, 5);

    console.log(markers);
    markers.forEach((mark) => {
      mark.remove();
    });

    limitedList.forEach((item, index) => {
      console.log(markers);
      const point = item.geocoded_column_1;
      if (!point || !point.coordinates) { return; }
      const latLong = point.coordinates;
      const marker = latLong.reverse();

      visibleListOfFilteredItems.innerHTML += `<span class="resto-name box result"><b>${item.name}</b> <br> <em>${item.address_line_1}</em></span>`;

      console.log(latLong);

      console.log(point);

      console.log(marker);

      markers.push(L.marker(marker).addTo(mymap));
    });
  });
}

window.onload = mainThread;