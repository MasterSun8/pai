var place = document.createElement('button')

let weights = new Array()

let bombs = new Array()

let line = new Array()

let colors = new Array()

const unid = (id) => {
    let par = id.split("")
    let locx = par[0]=='0' ? par[1] : par[0].concat(par[1] + '')
    let locy = par[2]=='0' ? par[3] : par[2].concat(par[3] + '')
    return [parseInt(locx), parseInt(locy)]
}

const idify = (id) => {
    let i = id[0]<10 ? '0'.concat(id[0] + '') : ''.concat(id[0] + '')
    let d = id[1]<10 ? '0'.concat(id[1] + '') : ''.concat(id[1] + '')
    return i.concat(d)
}

{
colors.push("#f00")
colors.push("#f50")
colors.push("#fa0")
colors.push("#af0")
colors.push("#5f0")
colors.push("#0fa")
colors.push("#0af")
colors.push("#05f")
colors.push("#00f")
}

function makeMap(){
    bombs = new Array()
    let xx = 20
    let yy = 50
    let bomb = xx*yy/5
    

    let r = document.querySelector(':root')
    r.style.setProperty('--width', ((100/yy))+'vw')
    r.style.setProperty('--height', ((100/xx))+'vh')

    for(let i=0; i<xx; i++){
        for(let j=0; j<yy; j++){
            let tf = new Array()
            if(Math.random()>0.999 && bomb != 0 && (i<xx-1 || j<yy-1) && (i>0 || j>0)){
                bomb--
                tf = ['B', 'H']
            }else{
                tf = ['0', 'H']
            }
            line.push(tf)
        }
        bombs.push(line)
        line = new Array()
    }
    
    while(bomb > 1){
        bombs.forEach((e, x)=>{
            e.forEach((i, y)=>{
                if(i!='B' && (x<xx-1 || y<yy-1) && (x>0 || y>0)){
                    if(Math.random() > 0.99){
                        bombs[x][y][0] = 'B'
                        bomb--
                    }
                }
            })
        })
    }

    evalBombs()
}

function evalBombs(){
    bombs.forEach((e, x)=>{
        e.forEach((i, y)=>{
            let o = 0
            if(i[0]==='B'){
                o = i[0]
            }else{
                for(let z = Math.max(0, x-1); z<x+2; z++){
                    for(let t = Math.max(0, y-1); t<y+2; t++){
                        if(z>bombs.length-1 || t>e.length-1){
                            continue
                        }else if(bombs[z][t][0]==='B'){
                            o++
                        }
                    }
                }
            }
            bombs[x][y] = [o, 'H']
        })
    })

    bombs.forEach((e, q)=>{
        e.forEach((i, y)=>{
            let id = idify([q, y])
            
            let p = i[1]==='H' ? 'h' :  i[0]==='B' ? 'mine' : 'gut'
            if(p=='gut'){
                place.style.color = colors[i[0]]
            }
            place.classList.add(p)
            place.setAttribute("id", id)
            place.onclick = function(){unhide(this)}
            place.oncontextmenu = function(){unhide(this, true); return false;}
            let text = document.createTextNode(i[0])
            place.appendChild(text)
            document.body.appendChild(place)
            place = document.createElement('button')
        })
    })    
}

/*  get 8 surrounding blocks
for(let z = Math.max(0, x-1); z<x+2; z++){
    for(let t = Math.max(0, y-1); t<y+2; t++){
        if(z<bombs.length && t<e.length && !(x==z&&y==t)){

        }
    }
}
*/
/*  change element background color in array
let id = ''
let xd = ''
if(z<10){
    xd = '0'.concat(z + '')
}else{
    xd = ''.concat(z + '')
}

id = xd

if(t<10){   
    xd = '0'.concat(t + '')
}else{
    xd = ''.concat(t + '')
}
id += xd

let x = document.getElementById(id)
x.style.backgroundColor
*/
/*  iterate bombs
bombs.forEach((e, x)=>{
    e.forEach((i, y)=>{

    })
})
*/

function evalWeights(){
    weights = new Array()
    let wei = new Array()
    bombs.forEach((e, x)=>{
        e.forEach((i, y)=>{
            wei.push(0)
        })
        weights.push(wei)
        wei = new Array()
    })

    bombs.forEach((e, x)=>{
        e.forEach((i, y)=>{
            let h = 0
            let u = 0
            let val = i[0]
            if(val!='B' && i[1]=='U'){
                for(let t = Math.max(0, x-1); t<x+2; t++){
                    for(let z = Math.max(0, y-1); z<y+2; z++){
                        if(t<bombs.length && z<e.length && !(y==z&&x==t)){
                            if(bombs[t][z][1]=='U'){
                                if(bombs[t][z][0]=='B'){
                                    val--
                                }
                            }else if(bombs[t][z][1]=='F'){
                                val--
                            }else{
                                h++
                            }
                        }
                    }
                }
                
                let temp = 0
                if(h!=0){
                    temp = val/h
                    weights[x][y] = temp
                }
            }
        })
    })
    
    applyWeights()
}

function revealSurr(loc){
    for(let z = Math.max(0, loc[0]-1); z<loc[0]+2; z++){
        for(let t = Math.max(0, loc[1]-1); t<loc[1]+2; t++){
            if(z<bombs.length && t<bombs[0].length){
                let i = bombs[z][t]
                let id = idify([z, t])
                let elem = document.getElementById(id)
                unhide(elem)
            }
        }
    }
}

function unhide(elem, f=false){
    let id = elem.id

    let loc = unid(id)
    let locx = loc[0]
    let locy = loc[1]
    
    let i = bombs[locx][locy]
    if(i[1] != 'U'){
        if(f){
            elem.classList.toggle('f')
            elem.classList.toggle('h')
            if(i[1] == 'F'){
                bombs[locx][locy][1] = 'H'
            }else{
                bombs[locx][locy][1] = 'F'
            }
            evalWeights()
            return
        }
        if(i[1] != 'F'){
            elem.classList.remove('h')
            bombs[locx][locy][1] = 'U'
            if(i[0]=='B'){
                elem.classList.add('mine')
                alert("łijo łijo debil")
                document.body.innerHTML = ''
                makeMap()
            }else{
                elem.classList.add('gut')
                elem.style.color = colors[i[0]]
                if(i[0]==0){
                    revealSurr([locx, locy])
                }
            }
        }
    }
    evalWeights()
}

function applyWeights(){
    bombs.forEach((e, q)=>{
        e.forEach((i, y)=>{
            if(i[0] == 'B'){

            }else{
                let id = idify([q, y])

                elem = document.getElementById(id)

                elem.innerHTML = Math.round(weights[q][y] * 100)
            }
        })
    })

}

function testWeights(){
    
    bombs.forEach((e, x)=>{
        e.forEach((i, y)=>{
            if(weights){}
        })
    })
}

makeMap()
/*
for(let x = 0; x<5; x++){
    for(let y = 0; y<5; y++){
        bombs[x][y][0] = 0
    }
}
*/
evalWeights()

testWeights()