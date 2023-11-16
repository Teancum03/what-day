import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from '@joaomoreno/unique-names-generator'

export function getDay() {
  return new Date()
    .toLocaleDateString('en-NZ', { weekday: 'long' })
    .toLowerCase()
}

export function getDayTomorrow() {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toLocaleDateString('en-NZ', { weekday: 'long' }).toLowerCase()
}

export function camelToTitle(string: string) {
  // Use regular expressions to split the string at uppercase letters
  const words = string.match(/[A-Z]?[a-z0-9]*/g)

  // Capitalize the first letter of each word and join them with spaces
  const title = words
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return title
}

export function getNewUser() {
  const customConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: ' ',
    length: 3,
    style: 'capital',
  }
  const longName = uniqueNamesGenerator(customConfig)

  return { name: getShortName(longName), longName }
}

export function getShortName(longName: string) {
  const names = longName.split(' ')
  return names[0].concat(' ', names[2])
}
