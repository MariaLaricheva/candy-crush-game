import {useEffect, useState} from "react";
import "./index.css"

import RedCandy from './images/red-candy.png';
import OrangeCandy from './images/orange-candy.png';
import YellowCandy from './images/yellow-candy.png';
import GreenCandy from './images/green-candy.png';
import BlueCandy from './images/blue-candy.png';
import PurpleCandy from './images/purple-candy.png';
import Blank from './images/blank.png';
import ScoreBoard from "./components/ScoreBoard.jsx";

const width = 8;
const candyColors = [
    RedCandy,
    OrangeCandy,
    YellowCandy,
    GreenCandy,
    BlueCandy,
    PurpleCandy,
]

const App = () => {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
    const [message, setMessage] = useState('');
    const [draggedCell, setDraggedCell] = useState(null);
    const [replacedCell, setReplacedCell] = useState(null);
    const [score, setScore] = useState(0);
    const [record, setRecord] = useState(0)


    const createRandomColor = () => {
        return candyColors[Math.floor(Math.random() *  candyColors.length)];
    }

    const deleteCell = (index) => {
        const newArrangement = currentColorArrangement;
        newArrangement[index] = Blank;
        setCurrentColorArrangement(newArrangement)
    }

    const swappable = (firstCell, secondCell) => {
        const possibleDivisions = [1,-1,width,-width]

        const isColumnMatching = checkForColumn(firstCell, secondCell);
        console.log(isColumnMatching);
        const isRowMatching = checkForRow(firstCell, secondCell);
        console.log(isRowMatching);


        if (isColumnMatching || isRowMatching) {
            console.log('something matches!')
        }


        if (possibleDivisions.includes(firstCell - secondCell)){
            if ((firstCell + secondCell) % width !== width - 1) {
                if ((isColumnMatching || isRowMatching)
                ) {
                    return true
                }
            }
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
            if (newArrangement[i] === Blank) {
                // console.log('my cell is empty', i)
                newArrangement[i] = newArrangement[i-width];
                newArrangement[i-width] = Blank;
                setCurrentColorArrangement(newArrangement)
            }
        }
    }

    const refillBoard = () => {
        const newArrangement = currentColorArrangement;

        for (let i = 0; i < width; i++) {
            if (newArrangement[i] === Blank) {
                newArrangement[i] = createRandomColor();
                setCurrentColorArrangement(newArrangement)
            }
        }
    }

    const checkForColumn = (firstCell, secondCell) => {
        const newArrangement = [...currentColorArrangement];

        [newArrangement[firstCell], newArrangement[secondCell]] = [newArrangement[secondCell], newArrangement[firstCell]];

        for (let i = 0; i < width*width - width*2; i++){
            const columnOfThree = [i, i+width, i+width*2];
            const decidedColor = newArrangement[i];

            if (columnOfThree.every(cell => newArrangement[cell] === decidedColor)) {
                return true
            }
        }
        return false;
    }

    const checkForRow = (firstCell, secondCell) => {
        const newArrangement = [...currentColorArrangement];

        [newArrangement[firstCell], newArrangement[secondCell]] = [newArrangement[secondCell], newArrangement[firstCell]];

        for (let i = 0; i < width*width; i++){
            const rowOfThree = [i, i+1, i+2];
            const decidedColor = newArrangement[i];

            if (i % width > (width-3)) {
                continue;
            }
            if (rowOfThree.every(cell => newArrangement[cell] === decidedColor)) {
                return true
            }
        }
        return false;
    }

    const checkForColumnOfThree = () => {
        for (let i = 0; i < width*width - width*2; i++){
            const columnOfThree = [i, i+width, i+width*2];
            const decidedColor = currentColorArrangement[i];

            if (columnOfThree.every(cell => currentColorArrangement[cell] === decidedColor)) {
                columnOfThree.forEach(cell => deleteCell(cell));
                if (decidedColor !== Blank) {
                    setScore((prev) => prev+3)
                }

            }
        }

    }

    const checkForColumnOfFour = () => {
        for (let i = 0; i < width*width - width*3; i++){
            const columnOfThree = [i, i+width, i+width*2, i+width*3];
            const decidedColor = currentColorArrangement[i];

            if (columnOfThree.every(cell => currentColorArrangement[cell] === decidedColor)) {
                columnOfThree.forEach(cell => deleteCell(cell));
                if (decidedColor !== Blank) {
                setScore((prev) => prev+4)
                }
            }
        }
    }

    const checkForColumnOfFive = () => {
        for (let i = 0; i < width*width - width*4; i++){
            const columnOfThree = [i, i+width, i+width*2, i+width*3, i+width*4];
            const decidedColor = currentColorArrangement[i];

            if (columnOfThree.every(cell => currentColorArrangement[cell] === decidedColor)) {
                columnOfThree.forEach(cell => deleteCell(cell))
                if (decidedColor !== Blank) {
                    setScore((prev) => prev+5)
                }

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
                if (decidedColor !== Blank) {
                    setScore((prev) => prev + 3)
                }
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
                rowOfFive.forEach(cell => deleteCell(cell));
                if (decidedColor !== Blank) {
                    setScore((prev) => prev + 4)
                }
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
                if (decidedColor !== Blank) {
                    setScore((prev) => prev + 5)
                }
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
        }, 200)
        //console.log('i check')
        return ( () => clearInterval(timer));
    },[checkForRowOfFive, checkForRowOfFour, checkForRowOfThree,
        checkForColumnOfFive, checkForColumnOfFour, checkForColumnOfThree,
        makeCellsFall, refillBoard, currentColorArrangement])

    useEffect( () => {
        if (score >= record) {
            setRecord(score);
            localStorage.setItem('CCrecord', record.toString());
        }
    }, [score, record])

    useEffect( () => {
        localStorage.setItem('CCrecord', record.toString());
    }, [record])

    useEffect( () => {
        if (localStorage.getItem("CCrecord")) {
            console.log("ура рекорд есть")
            console.log(localStorage.getItem("CCrecord"))
            // Достаём оттуда текущее значение рекорда
            setRecord(parseInt(localStorage.getItem('CCrecord')));

            // Иначе —
        } else {
            console.log("рекорда нет")
            // Делаем новую запись и кладём туда ноль — рекорда пока нет
            localStorage.setItem('CCrecord', record.toString());
        }
    }, [])

  return (
    <div className="app">
        <ScoreBoard score={score}/>
        <div className="game">
        { currentColorArrangement &&
            currentColorArrangement.map((color, index) => (
                <img className="cell"
                    src={color}
                    key={index}
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
