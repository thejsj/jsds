// ********* TIME COMPLEXITY

//  Access  Search  Insertion Deletion
//  O(n)    O(n^2)    O(n^2)      O(1)

//  ********* SPACE COMPLEXITY

//  O(1)

import taser from 'taser';
import t from 'exectimer';

let Tick = t.Tick;
let tick = new Tick('insertionSort');

let taserArray = taser(['array']);

let insertionSort = (arr) => {

  tick.start();

  taserArray(arr);

  for(let i = 0; i < arr.length; i++){

    let temp = arr[i];
    for(var j = i - 1; j >= 0 && temp < arr[j]; j--){
      arr[j+1] = arr[j];
    }
    arr[j+1] = temp;
  }

  tick.stop();

  return arr;
}

export { insertionSort, t };
