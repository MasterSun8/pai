class Matrix{
    constructor(row, col=null, a=198, b=99){
        this.max = 100
        this.min = 1

        this.col = col == null   ? row : col
        this.row = row >= this.min    ? row : null
        this.col = this.col >= this.min    ? this.col : null
        this.row = this.row <= this.max    ? this.row : null
        this.col = this.col <= this.max    ? this.col : null
        this.sq = this.row==this.col
    
        if(this.row == null || this.col == null){
            console.log("Incorrect input")
            return
        }
        this.mat = Array.from({length: this.row}, () => 
            Array.from({length: this.col}, () => 
                Math.floor(Math.random() * a - b)
            )
        )
        this.det = this.determinant()
    }

    determinant(prec=false, mat=null){
        mat = mat == null ? this.mat : mat
        console.log(mat)
        let row = mat.length
        let col = mat[0].length
        let sq = row==col
        if(sq){
            if(row<3){
                return mat[0][0]*mat[1][1] - mat[0][1]*mat[1][0]
            }
            if(!prec){
                let det = 1
                for(let i = 0; i < row; i++){
                    let pivot = mat[i][i]
                    if(pivot == 0){
                        let found = false
                        for(let j = i+1; j < row; j++){
                            if(mat[j][i] != 0){
                                found = true
                                let temp = mat[i]
                                mat[i] = mat[j]
                                mat[j] = temp
                                pivot = mat[i][i]
                                det *= -1
                                break
                            }
                        }
                        if(!found){
                            return 0
                        }
                    }
                    for(let j = i+1; j < row; j++){
                        let factor = mat[j][i] / pivot
                        for(let k = i+1; k < col; k++){
                            mat[j][k] -= factor * mat[i][k]
                        }
                    }
                    det *= pivot
                }
                console.log(mat)

                return det
            }else{
                let result = 0
                for(let i = 0; i<col; i++){
                    let sign = (i % 2 == 0) ? 1 : -1
                    let temp = new Array()
                    for(let j = 1; j < row; j++){
                        let t = new Array()
                        for(let k = 0; k < col; k++){
                            if(k == i){
                                continue
                            }
                            t.push(mat[j][k])
                        }
                    temp.push(t)
                    }
                    result += sign * mat[0][i] * this.determinant(true, temp)
                }
                return result
            }
        }else{
            console.log("The matrix isnt square")
            return false
        }
    }
}

function determinant(matrix, sq=false, prec=false){
    console.log(matrix)
    isMatrix(matrix)
    let row = matrix.length
    let col = matrix[0].length
    sq = sq ? sq : row==col
    if(sq){
        if(!prec){
            let det = 1
            for(let i = 0; i < row; i++){
                let pivot = matrix[i][i]
                if(pivot == 0){
                    let found = false
                    for(let j = i+1; j < row; j++){
                        if(matrix[j][i] != 0){
                            found = true
                            let temp = matrix[i]
                            matrix[i] = matrix[j]
                            matrix[j] = temp
                            pivot = matrix[i][i]
                            det *= -1
                            break
                        }
                    }
                    if(!found){
                        return 0
                    }
                }
                for(let j = i+1; j < row; j++){
                    let factor = matrix[j][i] / pivot
                    for(let k = i+1; k < col; k++){
                        matrix[j][k] -= factor * matrix[i][k]
                    }
                }
                det *= pivot
            }
            console.log(matrix)
    
            return det
        }else{
            let result = 0

            for(let i = 0; i<col; i++){
                let sign = (i % 2 == 0) ? 1 : -1
                let temp = new Array
                for(let j = 1; j < row; j++){
                    let t = new Array
                        for(let k = 0; k < col; k++){
                            if(k == i){
                                continue
                            }
                            t.push(matrix[j][k])
                    }
                    temp.push(t)
                }
                result += sign * matrix[0][i] * this.determinant(temp, true, true)
            }
            return result    
        }
    }else{
        console.log("The matrix isnt square")
        return false
    }
}

function multiplication(matrixA, matrixB){  //multiplication([[1, 2], [3, 4]], [[5, 6], [7, 8]]) expected: [[19, 22], [43, 50]]
    let num = 0
    let mat
    if(!Number.isInteger(matrixA)){
        isMatrix(matrixA)
    }else{
        num = 1
    }
    if(!Number.isInteger(matrixB)){
        mB = isMatrix(matrixB)
    }else{
        num = 2
    }

    if(num == 1){
        matrixB.forEach((el, index) => {
            el.forEach((e, i) => {
                matrixB[index][i] *= matrixA
            }) 
        })
        return matrixB
    }else if(num == 2){
        matrixA.forEach((el, index) => {
            el.forEach((e, i) => {
                matrixA[index][i] *= matrixB
            }) 
        })
        return matrixA
    }
    
    let rowA = matrixA.length
    let colA = matrixA[0].length
    let rowB = matrixB.length
    let colB = matrixB[0].length

    if(colA != rowB){
        throw new Error("The passed matrices can't be multiplied by each other")
    }
    
    mat = matrix(rowA, colB, 0, 0)

    let x, y, z

    for(x = 0; x < rowA; x++){
        for(y = 0; y < colB; y++){
            for(z = 0; z < rowA; z++){
                mat[x][y] += matrixA[x][z] * matrixB[z][y]
            }
        }
    }

    return mat
}

function addition(matrixA, matrixB){
    isMatrix(matrixA)
    isMatrix(matrixB)
    
    let rowA = matrixA.length
    let colA = matrixA[0].length
    let rowB = matrixB.length
    let colB = matrixB[0].length

    if(rowA != rowB || colA != colB){
        throw new Error("You can't add matrices of different dimensions")
    }

    matrixA.forEach((e, i) => {
        e.forEach((el, index) => {
            matrixB[i][index] += el
        })
    })
    return matrixB
}

function transpose(matr){
    isMatrix(matr)
    
    console.table(matr)
    
    let row = matr.length
    let col = matr[0].length

    let mat = matrix(col, row)

    matr.forEach((el, index) => {
        el.forEach((e, i) => {
            mat[i][index] = e
        }) 
    })

    return mat
}

function drawMatrix(matrix){
    if(isMatrix(matrix)){
        console.log("Incorrect input")
        throw new Error("The passed data isn't a matrix")
    }

    let string = ''
    let temp = '|'
    matrix.forEach(e => {
        temp = '|'
        e.forEach(el => {
            spaces = el.toString().length
            spaces = 4-spaces
            temp = temp.concat(' '.repeat(spaces), el)
        })
        temp += '  |'
        string += temp + '\n'
    })
    console.log(string)

}

function isMatrix(matrix){
    if(!Array.isArray(matrix) || !Array.isArray(matrix[0]) || Array.isArray(matrix[0][0])){
        throw new Error("The passed data isn't a matrix")
    }
    return true
}