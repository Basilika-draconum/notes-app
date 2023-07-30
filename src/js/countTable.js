export function countNotes(arr, str, category) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].status === str && arr[i].category === category) {
      count++;
    }
  }
  return count;
}
