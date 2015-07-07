import taser from 'taser';

let taserArray = taser(['array']);

let bubbleSort = (arr) => {

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

  return arr;

};

export default bubbleSort;