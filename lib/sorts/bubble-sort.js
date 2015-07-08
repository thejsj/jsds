// ********* TIME COMPLEXITY

//  Access  Search  Insertion Deletion
//  O(n)    O(n^2)    O(n^2)      O(1)

//  ********* SPACE COMPLEXITY

//  O(1)

import taser from 'taser';
import t from 'exectimer';

let Tick = t.Tick;
let tick = new Tick("bubbleSort");

let taserArray = taser(['array']);

let bubbleSort = (arr) => {

  tick.start();

  taserArray(arr);

  var swapped = true;

  while(swapped === true) {
    swapped = false;
    for(let i = 0; i < arr.length; i++){
      if(arr[i] > arr[i+1]){

        let temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;

        swapped = true;
      }
    }

  }

  tick.stop();

  return arr;

};

export { bubbleSort, t };