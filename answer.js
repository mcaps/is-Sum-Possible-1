function isSumPossible(a, n) {

/* brute force approach is viable on small arrays but has O(n^2) complexity. my idea to process this as fast as possible is:
* 1. order the array using a fast sorting algorithm (i.e heap sort)
* 2. split the array at N/2, this is because any two integers under N/2 cannot possibly add up to N. Any two integers over N/2 will be greater than N. 
* 3. run two for loops from the first split (numbers less than N/2) and test that against each number in the second quadrant (numbers greater than N/2).
* ***this will still work for negative numbers and numbers greater than N
* ***special cases of N/2 appearing twice in the list are tested as well  
*
* This approach worked for the first 3 questions but timed out on the last 3. I edited the loop to work from the inside out, because the numbers right below N/2 *would break the loop quicker (after adding to the right quadrant and becoming larger than N). This still did not fix the issue. But the last 3 questions still timed *out, because the sorting AND the analysis took too long. The solution to this was to switch to merge sort and add an analysis layer to it that would be called on *each step. This solved the last 3 questions.
*/
    
var finished = false;
    
function mergeSort(a)
{
    if (a.length < 2)
        return a;
 
    var middle = parseInt(a.length / 2);
    var left   = a.slice(0, middle);
    var right  = a.slice(middle, a.length);
 
    return merge(mergeSort(left), mergeSort(right));
}
 
function merge(left, right)
{
    var result = [];
 
    while (left.length && right.length) {
        if(left[0] + right[0] == n){
            console.log("merge break on " + left[0] + " + " + right[0]);
        	finished = true;
            break;
        }
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());
 
    return result;
}
 
a = mergeSort(a);
if(finished == true){
	return 1;
}
  
  // calculate half of N, this will be our split /  turning point (var turn). no two numbers below N/2 can possibly add up to N. if the exact number of N/2 appears twice in the list (33), then this is a special case tested for below
  var half = n / 2;
  console.log(half);
  
  var turnIndex = 0;
  for(var i = 0; i < a.length; i++){
      if(a[i] >= half){
      		turnIndex = i;
          break;
      }  
 	}; 
  
  console.log("turnIndex = " + turnIndex);
  
  // this is the special case talked about above, if there two or more instances of N/2, since the array is sorted, it will either be 1 above or 1 below turnIndex
  if(a[turnIndex] == n / 2){
  	if(a[turnIndex + 1] == a[turnIndex] || a[turnIndex - 1] == a[turnIndex] ){
    	return 1; 
    }
  }
  
  // work from the inside out so we can test more numbers quicker. 
  for(var i = turnIndex; i > 0; i--){
  
  	// here we are implementing a 2 point jump, to save time if we are really far off from the answer, hence j += 2
  	for(var j = turnIndex; j < a.length; j += 2){
    	//index we get too far and start indexing overboard
      if(j > a.length){
      	j = j - 1;
      }
      var answer = a[i] + a[j];
      if(answer == n){
      	return 1; // WE DID IT!!!!!
      }
      if(answer > n){
      	if(a[i] + a[j-1] == n){
        	return 1; // WE DID IT!!!
        }
        //if the number is greater than N, there is no point in computing the rest of the quadrant
        break;
      }
    }
  
  }
  
  console.log("nope...");
  return 0; // better luck next time
    
}
