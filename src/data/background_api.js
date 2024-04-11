import axios from 'axios'
const API_KEY = 'pESBPK_7Cgo1Q7k4aCbw4mUqadQuRW0GCAS7B22qhtk'

export default async function gettingBackgroundImg(searchedCity) {
  try {
    const res = await axios.get(
      `https://api.unsplash.com/search/photos?query=${searchedCity}&client_id=${API_KEY}&q=70`
    )
    const { full } = res.data.results[0].urls
    console.log(res.data)
    return full
  } catch (error) {
    return { error: 'Aranan şehire ait bir fotoğraf bulunamadı' }
  }
}
