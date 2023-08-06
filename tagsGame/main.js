var victoryPlayingFieldArr = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, "o"],
];

var playingFieldArr = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, "o", 11, 12],
  [13, 14, 15, 10],
];

var shuffled2dArray;
var rowArray;
var rowIndex;
var columnArray;
var columnIndex;
var clickedItem;
var emptyItemRowIndex;
var emptyItemColumnIndex;
var clickedItemRowIndex;
var clickedItemColumnIndex;
var clickcounter = 0;

document.addEventListener("click", function (event) {
  //находим клетку по клику
  clickedItem = event.target.dataset.item;
  startReset = event.target.dataset.start;

  if (startReset != undefined) {
    startGame();
  }

  if (clickedItem != undefined) {
    findIndexColumnAndRowArray();
    takeColumnArray(columnIndex);
    findIndexRowArray();

    emptyItemRowIndex = rowArray.indexOf("o");
    emptyItemColumnIndex = columnArray.indexOf("o");
    clickedItemRowIndex = rowArray.indexOf(+clickedItem);
    clickedItemColumnIndex = columnArray.indexOf(+clickedItem);

    comparisonIndexArray(
      columnArray,
      rowArray,
      columnIndex,
      emptyItemRowIndex,
      emptyItemColumnIndex
    ); //!!!! проверить актуальность переменных

    if (victoryPlayingFieldArr.toString() === playingFieldArr.toString()) {
      document.getElementById("winPopup").click();
    }
    render(playingFieldArr);
    // console.log(columnArray, "columnArray");
    // console.log(columnIndex, 'columnIndex');
    // console.log(rowArray, "rowArray");
    // console.log(rowIndex, "rowIndex");
    // console.log(emptyItemRowIndex, "emptyItemRowIndex");
    // console.log(emptyItemColumnIndex, "emptyItemColumnIndex");
    // console.log(clickedItemRowIndex, "clickedItemRowIndex");
    // console.log(clickedItemColumnIndex, "clickedItemColumnIndex");
  }
});

function userMovesCounter() {
  var user_moves = document.getElementById("user-moves"); //todo доработать с 16 по 17.07 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  user_moves.innerHTML = "Number of moves:" + " " + clickcounter;
  clickcounter++;
}

function takeColumnArray(columnNumber) {
  columnArray = playingFieldArr.map(function (currentValue) {
    //получаем столбец
    return currentValue[columnNumber];
  });
}

function findIndexColumnAndRowArray() {
  //получаем текущий индекс массива столбца и массив строки
  var currentIndex = [0];

  playingFieldArr.map(function (playingFieldRowArr) {
    currentIndex = playingFieldRowArr.findIndex(function (currentValue) {
      if (currentValue == +clickedItem) {
        //проверить валидность условия сравнения и преобразования в число
        rowArray = playingFieldRowArr;
        return currentIndex;
      }
    });

    if (currentIndex !== -1) {
      columnIndex = currentIndex;
    }
  });
}

function findIndexRowArray() {
  //получаем текущий индекс строки
  var currentIndex = [0];

  currentIndex = columnArray.findIndex(function (currentValue) {
    if (currentValue === +clickedItem) {
      return currentIndex;
    }
  });

  if (currentIndex !== -1) {
    rowIndex = currentIndex;
  }
}

function comparisonIndexArray(
  column,
  row,
  currColumnIndex,
  currRowIndexEmptyItem,
  currCollIndexEmptyItem
) {
  if (column[currCollIndexEmptyItem] === "o") {
    if (
      clickedItemColumnIndex + 1 === emptyItemColumnIndex ||
      clickedItemColumnIndex - 1 === emptyItemColumnIndex
    ) {
      moveTwoDimensionalArrayElements(
        playingFieldArr[currCollIndexEmptyItem],
        row,
        currColumnIndex,
        currColumnIndex
      );
      userMovesCounter();
    }
  }

  if (row[currRowIndexEmptyItem] === "o") {
    if (
      clickedItemRowIndex + 1 === emptyItemRowIndex ||
      clickedItemRowIndex - 1 === emptyItemRowIndex
    ) {
      if (clickedItemRowIndex != -1) {
        arrayMove(rowArray, clickedItemRowIndex, emptyItemRowIndex);
        userMovesCounter();
      }
    }
  }
  takeColumnArray(columnIndex);
}

function moveTwoDimensionalArrayElements(arr1, arr2, fromIndex, toIndex) {
  //работает для многомерного
  var element = arr1[fromIndex];
  var element2 = arr2[toIndex];

  arr1.splice(fromIndex, 1, element2);
  arr2.splice(toIndex, 1, element);
  render(playingFieldArr);
}

function arrayMove(arr, fromIndex, toIndex) {
  //работает для одномерного массива, модифицировать для многомерного.
  var element = arr[fromIndex];
  var element2 = arr[toIndex];

  arr.splice(fromIndex, 1, element2);
  arr.splice(toIndex, 1, element);
  render(playingFieldArr);
}

function makeToShufflArray(array) {
  //перемешиваем двумерный массив (функция зависима от переменной)
  var shuffled = array.flat();
  shuffled.forEach(function (v, i, a) {
    var j = Math.floor(Math.random() * (a.length - i)) + i;
    shuffled[i] = shuffled[j];
    shuffled[j] = v;
  });
  shuffled.reduce(function (rows, key, index) {
    return (shuffled2dArray =
      (index % array.length == 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows);
  }, []);
}

function startGame() {
  makeToShufflArray(playingFieldArr);
  playingFieldArr = shuffled2dArray;
  clickcounter = 0;
  userMovesCounter();
  render(playingFieldArr);
}

function render(data) {
  //отрисовка
  var outputContainer = document.getElementsByClassName("game-wrap-table")[0];
  var playingField = data;

  while (outputContainer.firstChild) {
    outputContainer.removeChild(outputContainer.lastChild);
  }

  playingField.map(function (playingFieldRowArr, i) {
    var tr = document.createElement("tr");

    tr.classList.add("row");
    tr.innerHTML = `<td class="item" data-item="${playingFieldRowArr[0]}">${playingFieldRowArr[0]}</td>
                    <td class="item" data-item="${playingFieldRowArr[1]}">${playingFieldRowArr[1]}</td>
                    <td class="item" data-item="${playingFieldRowArr[2]}">${playingFieldRowArr[2]}</td>
                    <td class="item" data-item="${playingFieldRowArr[3]}">${playingFieldRowArr[3]}</td>
                    `;
    outputContainer.appendChild(tr);
  });
}

findIndexColumnAndRowArray();
startGame();
