/**
 * Tworzy tabliczkę mnożenia z wybranego zakresu. Przy błędnych parametrach zwraca null.
 * @author ScarletSun
 * @param  {Number} startX Wartość startowa x.  Jeśli wartość końcowa jest mniejsza niż startowa to nastąpi zamiana tych wartości.
 * @param  {Number} startY Wartość startowa y.  Jeśli wartość końcowa jest mniejsza niż startowa to nastąpi zamiana tych wartości.
 * @param  {Number} endX Wartość końcowa x.     Jeśli wartość końcowa jest mniejsza niż startowa to nastąpi zamiana tych wartości.
 * @param  {Number} endY Wartość końcowa y.     Jeśli wartość końcowa jest mniejsza niż startowa to nastąpi zamiana tych wartości.
 * @return {Null} Zwraca null jeśli tablica przekracza limit bądź dostanie niepoprawny parametr.
 * @version 0.01a
*/

function tabliczka(startX=0, startY=0, endX=10, endY=10){
    const limit = 100
    if(endX<startX){
        [endX, startX] = [startX, endX]
    }
    if(endY<startY){
        [endY, startY] = [startY, endY]
    }
    let sizeX = startX-endX
    let sizeY = startY-endY
    console.log(sizeX)
    console.log(sizeY)
    if(sizeX>limit || sizeY>limit || isNaN(sizeX) || isNaN(sizeY)){
        alert("Zła wartość")
        return null
    }
    const body = document.body
    body.innerHTML = ''
    const tbl = document.createElement('table')

    let tr = tbl.insertRow()
    let td = tr.insertCell()
    td.appendChild(document.createTextNode(''))
    for (let j = startY; j <= endY; j++) {
        let td = tr.insertCell()
        td.appendChild(document.createTextNode(j))
        td.style.border = '5px solid #c2233b'
    }

    for (let i = startX; i <= endX; i++) {
        let tr = tbl.insertRow()
        let td = tr.insertCell()
        td.appendChild(document.createTextNode(i))
        td.style.border = '5px solid #c2233b'
        for (let j = startY; j <= endY; j++) {
            let td = tr.insertCell()
            td.appendChild(document.createTextNode(i*j))
            td.style.border = '1px solid black'
        }
        td = tr.insertCell()
        td.appendChild(document.createTextNode(i))
        td.style.border = '5px solid #c2233b'
    }
    tr = tbl.insertRow()
    td = tr.insertCell()
    td.appendChild(document.createTextNode(''))
    for (let j = startY; j <= endY; j++) {
        let td = tr.insertCell()
        td.appendChild(document.createTextNode(j))
        td.style.border = '5px solid #c2233b'
    }

    body.appendChild(tbl)
}

tabliczka()