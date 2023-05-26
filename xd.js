/*

|  1 2 3  |
|  4 5 6  |
|  7 8 10 |



|  1  2  3  |
|  -3 2  -2  |

|  2  -4 -9  |

6 - 9

-3

5 * 10          50
+ 2 * 6 * 7     84      230
+ 3 * 4 * 8     96
- 3 * 5 * 7     105
- 2 * 4 * 10    80      227
- 6 * 7         42

*/

function laplace(matrix, row=null, col=null){
    row = row==null ? matrix.length : row
    col = col==null ? matrix[0].length : col
    let f = 0
    for(let i = row-1; i > 0; i--){
        matrix[i-1] = det(matrix, i, col-1)
        console.log(matrix[i-1])
    }
    matrix[0].forEach((element, index) => {
        let sign = index % 2 ? -1 : 1
        f += element*sign
    })
    return f
}

function det(matrix, row, col){
    let arr = new Array
    let temp = 0
    for(let i = 1; i<=col; i++){
        temp = matrix[row-1][i-1]*matrix[row][i]
        if(row!=1){
            temp -= matrix[row][i-1]*matrix[row-1][i]
        }
        arr.push(temp)
    }
    temp = matrix[row-1][0]*matrix[row][col]-matrix[row][0]*matrix[row-1][col]
    if(row==1){
        temp = matrix[row-1][col]*matrix[row][0]
    }
    arr.push(temp)
    return arr
}