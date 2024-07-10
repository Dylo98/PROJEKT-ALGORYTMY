const funcStr = document.getElementById('function').value;
const a = parseFloat(document.getElementById('a').value);
const b = parseFloat(document.getElementById('b').value);
const n = parseInt(document.getElementById('n').value);

const f = new Function('x', 'return ' + funcStr);

const maxF = findMaxF(f, a, b, n);
const pointsUnderCurve = monteCarloIntegration(f, a, b, maxF, n);

function calculateMonteCarlo() {
  const integral = (pointsUnderCurve / n) * (b - a) * maxF;
  document.getElementById(
    'result'
  ).innerHTML = `Przybliżona wartość całki: ${integral}`;
}

function findMaxF(f, a, b, n) {
  let max = 0;
  for (let i = 0; i < n; i++) {
    const x = a + (b - a) * Math.random();
    const y = Math.abs(f(x));
    if (y > max) {
      max = y;
    }
  }
  return max;
}

function monteCarloIntegration(f, a, b, maxF, n) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    const x = a + (b - a) * Math.random();
    const y = maxF * Math.random();
    if (y < f(x)) {
      count++;
    }
  }
  return count;
}
