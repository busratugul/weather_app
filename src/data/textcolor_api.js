/* BU MODUL OLUŞTURULAN BACKGROUND TEMALARINA GÖRE OKUNURLUK DUZEYINI BAZ ALARAK TEXT COLOR ATAMASI YAPAR */

export default function setTextColor(icon) {
    let text_color
    if(icon === "01d"){
      text_color = "text-gray-700"
    }
    else if(icon === "02d"){
      text_color = "text-slate-100" 
    }
    return text_color
  }