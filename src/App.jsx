import React, { useState } from 'react';
import './App.css';


function App() {
  const [newarray, setNewArray] = useState(() => {
    const tempArray = new Array(10).fill(0).map(() => Math.floor(Math.random() * 100));
    return tempArray;
  });

  const [algorithm, setAlgorithm] = useState('BubbleSort');
  const [isSorting, setIsSorting] = useState(false); // Track if sorting is in progress

  const handleSort = (e) => {
    e.preventDefault();
    console.log("Sorting using: ", algorithm);
    if (!isSorting) {
      arraySolver(); // Start sorting only if not already sorting
    }
  };

  // Introduce a delay between each step of the sort
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Function to sort the array step by step
  const arraySolver = async () => {
    setIsSorting(true); // Set sorting in progress

    if (algorithm === 'BubbleSort') {
      const arr = [...newarray]; // Copy the current array
      for (let j = 0; j < arr.length; j++) {
        for (let i = 0; i < arr.length - j - 1; i++) {
          if (arr[i] > arr[i + 1]) {
            // Swap the values
            let temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;

            setNewArray([...arr]); // Update the state after every swap

            await delay(400); // Wait for 300ms before the next step
          }
        }
      }
    }

    else if (algorithm === 'MergeSort') {
      const array = [...newarray];
      let p = 0;
      let r = array.length - 1;

      // No need for a separate 'merge' array
      const Merge = async (array, p, q, r) => {
        let n1 = q - p + 1;
        let n2 = r - q;

        const left = new Array(n1);
        const right = new Array(n2);

        // Fill the left and right arrays
        for (let i = 0; i < n1; i++) {
          left[i] = array[p + i];
        }

        for (let j = 0; j < n2; j++) {
          right[j] = array[q + 1 + j];
        }

        let i = 0, j = 0;

        // Merge the two halves back into the array
        for (let k = p; k <= r; k++) {
          if (i < n1 && (j >= n2 || left[i] <= right[j])) {
            array[k] = left[i];  // Directly modify the array
            i++;

          } else {
            array[k] = right[j];
            j++;


          }
          setNewArray([...array])


        }
        await delay(400)




      };

      const MergeSort = (array, p, r) => {
        if (p < r) {
          let q = Math.floor((p + r) / 2); // Use Math.floor for the middle index
          MergeSort(array, p, q);
          MergeSort(array, q + 1, r);

          Merge(array, p, q, r);


        }

      };

      MergeSort(array, p, r); // Begin sorting the array



      // Set the sorted array after sorting is complete
      setIsSorting(false); // Sorting complete
    }

    else if (algorithm === 'SelectionSort') {
      const arr = [...newarray];
      for (let i = 0; i < arr.length; i++) {
        let min_indx = i;
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[j] < arr[min_indx]) {
            min_indx = j;
          }
        }
        let temp = arr[i];
        arr[i] = arr[min_indx];
        arr[min_indx] = temp;

        setNewArray([...arr])
        await delay(400)

      }
      setIsSorting(false)


    }


    else if (algorithm === 'QuickSort') {
      const arr = [...newarray];
      let p = 0;
      let r = arr.length - 1; // Correcting r to be the last index
    
      const partition = async (arr, p, r) => {
        let pivot = arr[r];
        let i = p - 1;
        
        for (let j = p; j <= r - 1; j++) {  // Fix loop to go till r - 1
          if (arr[j] <= pivot) {
            i++;
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            
            setNewArray([...arr]); // Properly spread the array to trigger state update
            await delay(400); // Assuming delay function is defined
          }
        }
        
        // Final swap to place pivot in the correct position
        let temp = arr[i + 1];
        arr[i + 1] = arr[r];
        arr[r] = temp;
        
        // Delay for visual effect
        setNewArray([...arr]);
        await delay(200)
        return i + 1;
       
      };
    
      const quicksort = async (arr, p, r) => {
        if (p < r) {
          let q = await partition(arr, p, r); // Await partition to ensure it's done before moving on
          await quicksort(arr, p, q - 1); // Recursively sort left part
          await quicksort(arr, q + 1, r); // Recursively sort right part
        }
      };
    
      quicksort(arr, p, r); 
      
      setIsSorting(false)// Start the quicksort process
    }
    else if (algorithm === 'HeapSort') {
      const arr = [...newarray];
    
      // Function to heapify a subtree rooted at index `i`
      const maxheapify = async (arr, n, i) => {
        let largest = i; // Initialize largest as root
        let l = 2 * i + 1; // Left child
        let r = 2 * i + 2; // Right child
    
        // Check if left child exists and is greater than root
        if (l < n && arr[l] > arr[largest]) {
          largest = l;
        }
    
        // Check if right child exists and is greater than the largest so far
        if (r < n && arr[r] > arr[largest]) {
          largest = r;
        }
    
        // If largest is not root
        if (largest !== i) {
          let temp = arr[i];
          arr[i] = arr[largest];
          arr[largest] = temp;
    
          setNewArray([...arr]); // Update state
          await delay(400); // Delay for visualization
    
          // Recursively heapify the affected subtree
          await maxheapify(arr, n, largest);
        }
      };
    
      // Function to build a max heap
      const buildmaxheap = async (arr, n) => {
        // Start from the last non-leaf node and heapify each node
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
          await maxheapify(arr, n, i);
        }
      };
    
      // Function to perform heap sort
      const heapsort = async (arr) => {
        let n = arr.length;
    
        // Build the initial max heap
        await buildmaxheap(arr, n);
    
        // Extract elements one by one from the heap
        for (let i = n - 1; i > 0; i--) {
          // Move the current root (largest element) to the end
          let temp = arr[0];
          arr[0] = arr[i];
          arr[i] = temp;
    
          setNewArray([...arr]); // Update state
          await delay(400); // Delay for visualization
    
          // Heapify the reduced heap
          await maxheapify(arr, i, 0);
        }
      };
    
      // Start heap sort
      heapsort(arr);


      setIsSorting(false)
    }
    
    
  }



  return (
    <>
      <div className='container'>
        <h1>SORTING-ALGO-ANALYSIER</h1>
        <form onSubmit={handleSort}>
          <span>Choose an Algo:</span>
          <select onChange={(e) => { setAlgorithm(e.target.value) }} disabled={isSorting}>
            <option value="BubbleSort">BubbleSort (By Default)</option>
            <option value="MergeSort">MergeSort</option>
            <option value="SelectionSort">Selection sort</option>
            <option value="QuickSort">Quick sort</option>
            <option value="HeapSort">Heap sort</option>
            <option value="RadixSort">Radix sort</option>
            <option value="ShellSort">Shell sort</option>
          </select>
          <button type="submit" disabled={isSorting}>
            {isSorting ? 'Sorting...' : 'Sort the array'}
          </button>
        </form>

        <div className="sort-container">
          {newarray.map((value, index) => (
            <div
              key={index}
              className="bar"
              style={{
                width: 50,
                height: `${value * 3}px`,  // Multiplied by 3 for better visualization
              }}
            >{value}</div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

