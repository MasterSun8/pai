const delta = (a, b, c) => (b*b - (4*a*c))

/**
 * Zwraca pierwiastki równania kwadratowego.
 * @author ScarletSun
 * @param  {Number} a współczynnik kwadratowy
 * @param  {Number} b współczynnik liniowy
 * @param  {Number} c współczynnik stały
 * @param  {Boolean} json dla wartości true zmienia zwracaną tablicę w obiekt JSON. 
 * @return {Boolean|Array|JSON} Zwraca tablicę pierwiastków albo obiekt JSON. W przypadku niepoprawnych wartości zwraca false.
 * @version 0.01a
*/

function kwadratowe(a=0, b=0, c=0, json=false){
    let pierwiastki = {}
    if(json){
        pierwiastki = kwadratowe(a, b, c)
        
        pierwiastki = JSON.stringify(pierwiastki)
        pierwiastki = JSON.parse(pierwiastki)
        
        return pierwiastki
    }
    let d = delta(a, b, c)
    if(isNaN(d)){
        return false
    }
    if(!(d<0)){
        pierwiastki[0] = (-b - Math.sqrt(d)) / (2 * a)
        pierwiastki[1] = (-b + Math.sqrt(d)) / (2 * a)
    }else{
        return false
    }

    return pierwiastki
}