function evaluatePolynomial(coefficients, x) {
  return coefficients.reduce(
    (accumulator, coefficient, index) =>
      accumulator + coefficient * Math.pow(x, coefficients.length - 1 - index),
    0
  );
}

function findRoots() {
  const coefficientA = parseFloat(document.getElementById('a').value);
  const coefficientB = parseFloat(document.getElementById('b').value);
  const coefficientC = parseFloat(document.getElementById('c').value);
  const coefficientD = parseFloat(document.getElementById('d').value);
  const coefficientE = parseFloat(document.getElementById('e').value);
  const coefficientF = parseFloat(document.getElementById('f').value);
  const tolerance = parseFloat(document.getElementById('tolerance').value);
  const intervalMin = parseFloat(document.getElementById('min').value);
  const intervalMax = parseFloat(document.getElementById('max').value);

  const coefficients = [
    coefficientA,
    coefficientB,
    coefficientC,
    coefficientD,
    coefficientE,
    coefficientF,
  ];
  const roots = bisectionMethod(
    coefficients,
    intervalMin,
    intervalMax,
    tolerance
  );
  document.getElementById('result').innerHTML = `Pierwiastki: ${roots}`;
}

function bisectionMethod(coefficients, intervalMin, intervalMax, tolerance) {
  let lowerBound = intervalMin;
  let upperBound = intervalMax;
  let roots = [];
  let lowerBoundValue = evaluatePolynomial(coefficients, lowerBound);
  let upperBoundValue = evaluatePolynomial(coefficients, upperBound);

  if (lowerBoundValue * upperBoundValue > 0) {
    return 'Nie znaleziono pierwiastków w podanym przedziale.';
  }

  while ((upperBound - lowerBound) / 2 > tolerance) {
    let midpoint = (lowerBound + upperBound) / 2;
    let midpointValue = evaluatePolynomial(coefficients, midpoint);

    if (midpointValue === 0) {
      return midpoint; // midpoint jest pierwiastkiem
    } else if (lowerBoundValue * midpointValue < 0) {
      upperBound = midpoint;
    } else {
      lowerBound = midpoint;
    }
  }
  roots.push((lowerBound + upperBound) / 2);
  return roots;
}
