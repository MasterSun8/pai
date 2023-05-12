/**
 * Zwraca czy liczba jest podzielna przez dzielnik. Przy błędnych parametrach zwraca null.
 * @author ScarletSun
 * @param  {Number} dzielna Liczba dzielona.
 * @param  {Number} dzielnik Liczba przez którą dzieli.
 * @return {Boolean|Null} Zwraca bool.
 * @version 0.01a
*/

function dzielenie(dzielna, dzielnik=2){
    if(dzielnik === 0){
        console.error("nie dzieli się przez 0")
        return null
    }

    if(dzielna > Number.MAX_SAFE_INTEGER || dzielnik > Number.MAX_SAFE_INTEGER){
        console.error("za duża wartość")
        return null
    }

    let t = dzielna % dzielnik

    if(t === 0){                        //a dzieli się przez b bez reszty
        return true
    }else if(isNaN(t)){                 //podane wartości są błędne
        console.error("to nie liczba")
        return null
    }else{                              //a dzieli się przez b z resztą
        return false
    }
}

function write(){
    let get = window.location.search.split("&")
    let dzielna     = (parseInt(get[0].split("=")[1]))
    let dzielnik    = (parseInt(get[1].split("=")[1]))
    let wynik   = dzielenie(dzielna, dzielnik)
    let sol = wynik ? "Podzielna" : wynik!==null ? "Niepodzielna" : "Podaj 2 liczby"
    console.log(sol)
}