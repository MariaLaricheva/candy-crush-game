import {useEffect, useState} from "react";
import "./index.css"

const width = 8;
const candyColors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
]

const App = () => {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
    const [message, setMessage] = useState('')
    const [draggedCell, setDraggedCell] = useState(null)
    const [replacedCell, setReplacedCell] = useState(null)


    const createRandomColor = () => {
        return candyColors[Math.floor(Math.random() *  candyColors.length)];
    }

    const deleteCell = (index) => {
        const newArrangement = currentColorArrangement;
        newArrangement[index] = '';
        setCurrentColorArrangement(newArrangement)
    }

    const swappable = (firstCell, secondCell) => {
        const possibleDivisions = [1,-1,width,-width]

        if (possibleDivisions.includes(firstCell - secondCell)){
            return (firstCell + secondCell) % width !== width - 1;
        }

        return false
    }

    const swapCells = (firstCell, secondCell) => {
        const newArrangement = currentColorArrangement;

        [newArrangement[firstCell], newArrangement[secondCell]] = [newArrangement[secondCell], newArrangement[firstCell]];

        setCurrentColorArrangement(newArrangement)
    }

    const makeCellsFall = () => {
        const newArrangement = currentColorArrangement;
        for (let i = width; i < width*width; i++) {
            if (newArrangement[i] === '') {
                // console.log('my cell is empty', i)
                newArrangement[i] = newArrangement[i-width];
                newArrangement[i-width] = '';
                setCurrentColorArrangement(newArrangement)
            }
        }
    }

    const refillBoard = () => {
        const newArrangement = currentColorArrangement;

        for (let i = 0; i < width; i++) {
            if (newArrangement[i] === '') {
                newArrangement[i] = createRandomColor();
                setCurrentColorArrangement(newArrangement)
            }
        }
    }

    const checkForColumnOfThree = () => {
        for (let i = 0; i < width*width - width*2; i++){
            const columnOfThree = [i, i+width, i+width*2];
            const decidedColor = currentColorArrangement[i];

            if (columnOfThree.every(cell => currentColorArrangement[cell] === decidedColor)) {
                columnOfThree.forEach(cell => deleteCell(cell))

                setMessage('Column of three!')
            }
        }
    }

    const checkForColumnOfFour = () => {
        for (let i = 0; i < width*width - width*3; i++){
            const columnOfThree = [i, i+width, i+width*2, i+width*3];
            const decidedColor = currentColorArrangement[i];

            if (columnOfThree.every(cell => currentColorArrangement[cell] === decidedColor)) {
                columnOfThree.forEach(cell => deleteCell(cell))
                setMessage('Column of four!')
            }
        }
    }

    const checkForColumnOfFive = () => {
        for (let i = 0; i < width*width - width*4; i++){
            const columnOfThree = [i, i+width, i+width*2, i+width*3, i+width*4];
            const decidedColor = currentColorArrangement[i];

            if (columnOfThree.every(cell => currentColorArrangement[cell] === decidedColor)) {
                columnOfThree.forEach(cell => deleteCell(cell))
                setMessage('Column of five!')
            }
        }
    }

    const checkForRowOfThree = () => {
        for (let i = 0; i < width*width; i++){
            const rowOfThree = [i, i+1, i+2];
            const decidedColor = currentColorArrangement[i];

            if (i % width > (width-3)) {
                continue;
            }
            if (rowOfThree.every(cell => currentColorArrangement[cell] === decidedColor)) {
                rowOfThree.forEach(cell => deleteCell(cell))
            }
        }
    }

    const checkForRowOfFour = () => {
        for (let i = 0; i < width*width; i++){
            const rowOfFive = [i, i+1, i+2, i+3, i+4];
            const decidedColor = currentColorArrangement[i];

            if (i % width > (width-4)) {
                continue;
            }
            if (rowOfFive.every(cell => currentColorArrangement[cell] === decidedColor)) {
                rowOfFive.forEach(cell => deleteCell(cell))
            }
        }
    }

    const checkForRowOfFive = () => {
        for (let i = 0; i < width*width; i++){
            const rowOfFive = [i, i+1, i+2, i+3, i+4];
            const decidedColor = currentColorArrangement[i];

            if (i % width > (width-5)) {
                continue;
            }
            if (rowOfFive.every(cell => currentColorArrangement[cell] === decidedColor)) {
                rowOfFive.forEach(cell => deleteCell(cell))
            }
        }
    }

    const createBoard = () => {
        const arrangement = [];

        for (let i = 0; i < width*width; i++) {
            const randomColor = createRandomColor();
            arrangement.push(randomColor);
        }
        setCurrentColorArrangement(arrangement);
    };

    const dragStart = (e) => {
        console.log('start', e.target)
        setDraggedCell(e.target);
    }

    const dragDrop = (e) => {
        console.log('Drop')
        setReplacedCell(e.target);
    }

    const dragEnd = () => {
        console.log('End')

        const draggedCellId = parseInt(draggedCell.getAttribute('data-id'));
        const replacedCellId = parseInt(replacedCell.getAttribute('data-id'));


        if (swappable(draggedCellId, replacedCellId)){

            swapCells(draggedCellId, replacedCellId);
        }
    }

    useEffect(() => createBoard,[])
    useEffect(() => {
        const timer = setInterval(() => {
            checkForRowOfFive();
            checkForRowOfFour(),
            checkForRowOfThree();
            checkForColumnOfFive();
            checkForColumnOfFour();
            checkForColumnOfThree();
            makeCellsFall();
            refillBoard();
            setCurrentColorArrangement([...currentColorArrangement])
        }, 1700)
        //console.log('i check')
        return ( () => clearInterval(timer));
    },[checkForRowOfFive, checkForRowOfFour, checkForRowOfThree,
        checkForColumnOfFive, checkForColumnOfFour, checkForColumnOfThree,
        makeCellsFall, refillBoard, currentColorArrangement])

  return (
    <div className="app">
        <h1> {message}</h1>
        <div className="game">
        { currentColorArrangement &&
            currentColorArrangement.map((color, index) => (
                <img className="cell"
                    key={index}
                    style={{backgroundColor: color}}
                    alt={color}
                     data-id={index}
                     draggable={true}
                     onDragStart={dragStart}
                     onDragOver={(e) => e.preventDefault()}
                     onDragEnter={(e) => e.preventDefault()}
                     onDragLeave={(e) => e.preventDefault()}
                     onDrop={dragDrop}
                     onDragEnd={dragEnd}
                />
            ))
        }
        </div>
    </div>
  )
}

export default App
