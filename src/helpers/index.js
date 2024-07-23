export function formatedPopulation (population) {
  const suffixes = ['', 'K', 'M', 'B', 'T']
  const suffixNum = Math.floor(('' + population).length / 3)

  let shortValue = parseFloat((suffixNum !== 0 ? (population / Math.pow(1000, suffixNum)) : population).toPrecision(3))

  if (shortValue % 1 !== 0) {
    shortValue = shortValue.toFixed(1)
  }

  return shortValue + suffixes[suffixNum]
}
