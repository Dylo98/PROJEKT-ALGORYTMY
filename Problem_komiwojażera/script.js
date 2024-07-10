function generateFields() {
  const numCities = parseInt(document.getElementById('numCities').value);
  const cityFields = document.getElementById('cityFields');
  const distanceFields = document.getElementById('distanceFields');

  cityFields.innerHTML = '';
  distanceFields.innerHTML = '';

  for (let i = 0; i < numCities; i++) {
    const cityLabel = document.createElement('label');
    cityLabel.textContent = `Miasto ${i + 1}: `;
    const cityInput = document.createElement('input');
    cityInput.type = 'text';
    cityInput.id = `city${i}`;
    cityInput.name = `city${i}`;
    cityInput.required = true;
    cityFields.appendChild(cityLabel);
    cityFields.appendChild(cityInput);
    cityFields.appendChild(document.createElement('br'));
  }

  for (let i = 0; i < numCities; i++) {
    for (let j = 0; j < numCities; j++) {
      const distanceLabel = document.createElement('label');
      distanceLabel.textContent = `Odległość ${i + 1}-${j + 1}: `;
      const distanceInput = document.createElement('input');
      distanceInput.type = 'number';
      distanceInput.id = `distance${i}-${j}`;
      distanceInput.name = `distance${i}-${j}`;
      distanceInput.required = true;
      distanceFields.appendChild(distanceLabel);
      distanceFields.appendChild(distanceInput);
      distanceFields.appendChild(document.createElement('br'));
    }
    distanceFields.appendChild(document.createElement('br'));
  }
}

function solveTSP() {
  const numCities = parseInt(document.getElementById('numCities').value);
  const cities = [];
  const distances = Array.from({ length: numCities }, () =>
    Array(numCities).fill(0)
  );

  for (let i = 0; i < numCities; i++) {
    cities.push(document.getElementById(`city${i}`).value);
  }

  for (let i = 0; i < numCities; i++) {
    for (let j = 0; j < numCities; j++) {
      distances[i][j] = parseFloat(
        document.getElementById(`distance${i}-${j}`).value
      );
    }
  }

  let bestRoute = null;
  let bestCost = Infinity;

  function calculateCost(route) {
    let cost = 0;
    for (let i = 0; i < route.length - 1; i++) {
      cost += distances[route[i]][route[i + 1]];
    }
    cost += distances[route[route.length - 1]][route[0]];
    return cost;
  }

  function* generatePermutations(array, n = array.length) {
    if (n <= 1) yield array.slice();
    else {
      for (let i = 0; i < n; i++) {
        yield* generatePermutations(array, n - 1);
        const j = n % 2 ? 0 : i;
        [array[n - 1], array[j]] = [array[j], array[n - 1]];
      }
    }
  }

  for (const perm of generatePermutations([...Array(numCities).keys()])) {
    const cost = calculateCost(perm);
    if (cost < bestCost) {
      bestCost = cost;
      bestRoute = perm;
    }
  }

  const optimalPath = bestRoute.map(i => cities[i]);
  document.getElementById(
    'result'
  ).innerHTML = `Najkrótsza droga: ${optimalPath.join(
    ' -> '
  )}, Koszt: ${bestCost}`;
}
