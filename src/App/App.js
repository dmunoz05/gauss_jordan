import React, { useState, useEffect } from 'react';
import './App.css';


function App() {

    const [show, setShow] = useState(false);
    const [clear, setClear] = useState(false);
    const [generated, setGenerated] = useState(false);
    const [table, setTable] = useState(false);
    const [rows, setRows] = useState(2);
    const [cols, setCols] = useState(2);
    const [newMatriz, setNewMatriz] = useState();
    const [matrix, setMatrix] = useState(
        Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))
    );

    function handleSubmit(event) {
        event.preventDefault();
        const newMatrix = [];
        for (let i = 0; i < matrix.length; i++) {
            const row = [];
            for (let j = 0; j < matrix[i].length; j++) {
                const inputValue = parseFloat(document.getElementById(`input-${i}-${j}`).value);
                row.push(inputValue);
            }
            newMatrix.push(row);
        }
        gaussJordan(newMatrix);
    }

    function handleRowsChange(event) {
        setShow(true);
        setRows(parseInt(event.target.value));
        const numRows = parseInt(event.target.value);
        const newMatrix = [];
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < matrix[0].length; j++) {
                row.push(0);
            }
            newMatrix.push(row);
        }
        setMatrix(newMatrix);
    }

    function handleColsChange(event) {
        setShow(true);
        setCols(parseInt(event.target.value));
        const numCols = parseInt(event.target.value);
        const newMatrix = [];
        for (let i = 0; i < matrix.length; i++) {
            const row = [];
            for (let j = 0; j < numCols; j++) {
                row.push(0);
            }
            newMatrix.push(row);
        }
        setMatrix(newMatrix);
    }


    function gaussJordan(matriz) {
        debugger;
        let n = matriz.length;
        let m = matriz[0].length;

        console.log(matrix);

        for (let i = 0; i < n; i++) {
            // Encuentra la fila con el valor absoluto más grande en la columna i
            let maxRow = i;
            for (let j = i + 1; j < n; j++) {
                if (Math.abs(matriz[j][i]) > Math.abs(matriz[maxRow][i])) {
                    maxRow = j;
                }
            }

            // Intercambia la fila con el valor absoluto más grande con la fila actual (i)
            let tmp = matriz[i];
            matriz[i] = matriz[maxRow];
            matriz[maxRow] = tmp;

            // Divide la fila actual (i) por el valor en la columna i
            let divisor = matriz[i][i];
            for (let j = i; j < m; j++) {
                matriz[i][j] /= divisor;
            }

            // Resta la fila actual (i) multiplicada por el valor en la columna i de cada otra fila
            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    let factor = matriz[j][i];
                    for (let k = i; k < m; k++) {
                        matriz[j][k] -= factor * matriz[i][k];
                    }
                }
            }
        }

        setNewMatriz(matriz);
        setTable(true);
        setGenerated(false)
    }


    // Función que se ejecuta cuando el usuario hace clic en "Generar"
    function handleGenerate() {
        let count = 1;

        // Genera las matrices y resuelve cada una con el método de Gauss-Jordan
        for (let i = 0; i < count; i++) {
            let matrix_new = [];
            for (let j = 0; j < rows; j++) {
                let row = [];
                for (let k = 0; k < cols; k++) {
                    row.push(Math.floor(Math.random() * 10)); // Genera un número aleatorio del 0 al 9
                }
                matrix_new.push(row);
            }
            // Actualiza el estado de las matrices y los resultados
            setMatrix(matrix_new);
            setGenerated(true);            
        }
    }

    function clearData() {
        let empty = [];
        setMatrix(Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0)));
        setNewMatriz(empty);
        setClear(false);
    }


    useEffect(() => {
        debugger;
        if(clear){
            clearData();
        }        
        if(generated){
            gaussJordan(matrix);
        }
    }, [generated, clear]);


    return (
        <div className='div-principal'>
            <div className='div-table'>
                <form onSubmit={handleSubmit}>
                    <section className='section-select'>

                        <label className='label-select' > Seleccione la cantidad de: </label>
                        &nbsp;
                        &nbsp;
                        <label className='label-select-f'>
                            Filas:
                            &nbsp;
                            <input className='select-columns' type="number" value={rows} onChange={handleRowsChange} />
                        </label>

                        &nbsp;
                        &nbsp;

                        <label className='label-select-c'>
                            Columnas:
                            &nbsp;
                            <input className='select-columns' type="number" value={cols} onChange={handleColsChange} />
                        </label>
                    </section>

                    <table className='gauss-jordan-table'>
                        <tbody className='tbody'>
                            {matrix.map((row, i) => (
                                <tr className='tr-input' key={i}>
                                    {row.map((cell, j) => (
                                        <td className='td-input' key={`${i}-${j}`}>
                                            <input id={`input-${i}-${j}`} className='input' type="number" name={`element-${i}-${j}`} defaultValue={cell} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {show && (
                        <div className='div-principal-btns'>

                            <div className='div-btn'>
                                <button className='btn-resolver' onClick={handleGenerate}>Generar</button>
                            </div>

                            <br />

                            <div className='div-btn'>
                                <button className='btn-resolver' onClick={handleSubmit}>Resolver</button>
                            </div>

                            <br />

                            <div className='div-btn'>
                                <button className='btn-resolver' onClick={() => setClear(true)}>Limpiar</button>
                            </div>
                        </div>
                    )}
                </form>

                {table && (
                    <div>
                        <br />
                        <br />
                        <hr />
                        <br />
                        <br />
                        <section className='section-select'>
                            <label className='label-select'> Solución </label>
                        </section>


                        <table className='gauss-jordan-table'>
                            <tbody className='tbody'>
                                {newMatriz.map((row, i) => (
                                    <tr className='tr-input' key={i}>
                                        {row.map((cell, j) => (
                                            <td className='td-input' key={`${i}-${j}`}>
                                                <input id={`input-${i}-${j}`} className='input' type="number" name={`element-${i}-${j}`} defaultValue={cell} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
}
export { App };
