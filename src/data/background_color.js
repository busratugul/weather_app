/* Bu fonksyion weather iconunun numeric değerine göre tüm app backgroundunun rengini optimize eder  */

export default function bgColorIconNumber(icon) {
  let color
  switch (icon) {
    case '11d':
      color = 'bg-gradient-to-b from-blue-950 to-gray-700' //thunderstorm
      break
    case '09d':
      color = 'bg-gradient-to-b from-slate-800 to-slate-500' //drizzle, shower rain
      break
    case '10d':
      color = 'bg-gradient-to-b from-gray-800 to-gray-700' //rain
      break
    case '13d':
      color = 'bg-gradient-to-b from-slate-900 to-slate-500' //freezing rain, snow etc.
      break
    case '50d': //mist
      color = 'bg-gradient-to-b from-zinc-800 to-slate-600'
      break
    case '01d':
      color = 'bg-gradient-to-b from-sky-500 to-slate-100' //clearday
      break
    case '01n':
      color = 'bg-gradient-to-b from-slate-950 to-slate-500' //clearnight
      break
    case '02d': //clouds 11/25%
      color = 'bg-gradient-to-b from-sky-800 to-slate-700'
      break
    case '02n':
      color = 'bg-gradient-to-b from-gray-950 to-slate-700'
      break
    case '03d':
      color = 'bg-gradient-to-b from-sky-900 to-slate-800'
      break
    case '03n':
      color = 'bg-gradient-to-b from-gray-950 to-slate-500'
      break
    case '04d':
      color = 'bg-gradient-to-b from-sky-950 to-slate-700'
      break
    case '04n':
      color = 'bg-gradient-to-b from-gray-950 to-slate-600'
      break

    default:
      color = 'bg-gradient-to-b from-slate-700 to-slate-300'
  }
  return color
}
