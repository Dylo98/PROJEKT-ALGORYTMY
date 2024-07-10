function isPrime(numbers) {
  if (numbers < 2) {
    return false;
  }

  let max = Math.sqrt(numbers);
  for (let i = 2; i <= max; i++) {
    if (numbers % i === 0) {
      return false;
    }
  }

  return true;
}

function findNumbers(min, max) {
  let result = [];

  for (let i = min; i <= max; i++) {
    if (isPrime(i) && isPrime(i + 2) && isPrime(i + 6) && isPrime(i + 8)) {
      result.push(`${i}, ${i + 2}, ${i + 6}, ${i + 8}`);
    }
  }

  return result;
}

function onSubmit(event) {
  event.preventDefault();
  let min = parseInt(document.getElementById('min').value);
  let max = parseInt(document.getElementById('max').value);
  let result = findNumbers(min, max);
  document.getElementById('result').innerHTML = result.join('<br>');
}
