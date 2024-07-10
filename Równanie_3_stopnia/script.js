function solveCubicEquation(a, b, c, d) {
  const zero = 0.0000001;

  if (Math.abs(a) > zero) {
    b /= a;
    c /= a;
    d /= a;

    const p = c - (b * b) / 3;
    const q = (b * (2 * b * b - 9 * c)) / 27 + d;
    const w = -b / 3;
    let Delta = q * q + (4 * Math.pow(p, 3)) / 27;

    if (Delta > zero) {
      Delta = Math.sqrt(Delta);
      const u = Math.cbrt((-q + Delta) / 2);
      const v = Math.cbrt((-q - Delta) / 2);
      return [u + v + w];
    } else if (Delta < -zero) {
      const u = 2 * Math.sqrt(-p / 3);
      const v = Math.acos((-Math.sqrt(-27 / Math.pow(p, 3)) * q) / 2) / 3;
      return [
        u * Math.cos(v) + w,
        u * Math.cos(v + (2 * Math.PI) / 3) + w,
        u * Math.cos(v + (4 * Math.PI) / 3) + w,
      ];
    } else {
      const u = -Math.cbrt(q / 2);
      return [2 * u + w, -u + w];
    }
  } else {
    if (Math.abs(b) <= zero) {
      if (Math.abs(c) <= zero) {
        return [];
      } else {
        return [-d / c];
      }
    }

    const Delta = c * c - 4 * b * d;
    if (Delta > zero) {
      const sqrtDelta = Math.sqrt(Delta);
      return [(-c - sqrtDelta) / (2 * b), (-c + sqrtDelta) / (2 * b)];
    } else if (Delta < -zero) {
      return [];
    } else {
      return [-c / (2 * b)];
    }
  }
}

function solvePolynomialEquation() {
  const inputs = document.getElementsByClassName('polynomial-equation')[0];
  const args = [];

  for (const input of inputs.getElementsByTagName('input')) {
    if (input.type === 'number') {
      args.push(parseFloat(input.value));
    }
  }

  const result = solveCubicEquation(...args);

  const resultText = result
    .map((value, index) => `x<sub>${index + 1}</sub> = ${value}`)
    .join('<br>');

  document.getElementById('polynomial-solution').innerHTML = resultText;
}
