/* jshint esversion: 6 */

// Solve the following prompts using recursion.

// 1. Calculate the factorial of a number. The factorial of a non-negative integer n,
// denoted by n!, is the product of all positive integers less than or equal to n.
// Example: 5! = 5 x 4 x 3 x 2 x 1 = 120
// factorial(5); // 120
var factorial = function(n) {
  //escape case for negative numbers, they dont have factorials
  if (n < 0) {
    return null;
  }
  //base case - n is zero either at call or by end of recursion
  if (n === 0) {
    return 1; //this is just "the math" - the factorial of 0 is 1
  }
  //recursive case
  //number is greater than 0, pass a smaller version into factorial,
  //causing the process to repeat until number reaches 0 - base case
  return (n * factorial(n - 1)); //in our example, n is 5, this calls 5 * factorial(4) which will call 4 * factorial(3) til 0
  //when 0 is called it returns 1, which backflows down the previous call until the math becomes 5*4*3*2*1 and the original function returns 120
};

// 2. Compute the sum of an array of integers.
// sum([1,2,3,4,5,6]); // 21
var sum = function(array) {
  //escape case for empty
  if (array.length === 0) {
    return 0;
  }
  //base case
  //array only has one value - either called with only one value or reduced via recursion
  if (array.length === 1) {
    return array[0];
  }
  //recursion case
  //we know there are at least two values left in the array, we know [0] and [1] have values.
  //create a copy of the array (to avoid mutation of original array) and add [1] to [0] then remove [1]
  //resulting array will have the sum of first two numbers stored in [0] and remaining numbers in [1] - [x]
  var arrayCopy = [];
  for (i = 0; i < array.length; i++) {
    arrayCopy[i] = array[i];
  }
  arrayCopy[0] = arrayCopy[0] + arrayCopy[1];
  arrayCopy.splice(1, 1);
  //call for sum again this time on the copy we made. will continue until a copy is made with only one value stored
  return sum(arrayCopy);
};

// 3. Sum all numbers in an array containing nested arrays.
// arraySum([1,[2,3],[[4]],5]); // 15
var arraySum = function(array) {
  //need to add checks if [0] or [1] are arrays themselves
  //anytime we find an array, we wil solve that first before going back
  //escape case for empty array
  if (array.length === 0) {
    return 0;
  }
  //Make our copy of the array now, so we can use it when checking for nested arrays
  //this is only a shallow copy - we will need to check for nested arrays in original array
  var arrayCopy = [];
  for (i = 0; i < array.length; i++) {
    arrayCopy[i] = array[i];
  }
  //do we have an array in the first key?
  if (Array.isArray(array[0])) {
    //note about shallow copy - we must check against original array because copy is shallow, and wont copy arrays properly
    //if there IS an array at array[0] there will NOT be a matching array at arrayCopy[0] due to lack of depth
    ////////////////////////////////////--+*//we can safely ignore this problem here because we are replacing the value with a number via recursion anyway*-----/*
    arrayCopy[0] = arraySum(array[0]); //if first key is an array, sum it up until it isnt
  }
  if (array.length === 1) { //base case - if only one value that isnt an array remains, return it
    return arrayCopy[0];
  }
  if (Array.isArray(array[1])) { //if second key is an array, sum it all up until it isnt
    arrayCopy[1] = arraySum(array[1]);
  }
  arrayCopy[0] = arrayCopy[0] + arrayCopy[1]; //if key 0 an 1 are both not arrays, add them together and remove key 1
  arrayCopy.splice(1, 1);
  //call for sum again this time on the copy we made. will continue until a copy is made with only one value stored
  return arraySum(arrayCopy);
};

// 4. Check if a number is even.
var isEven = function(n) {
  //can't use modulo per the rules - easiest method would be to reduce the number to either 0 or 1 by subrtracting 2
  //will need to create checks for 0 and negative numbers
  //check if it is negative. if it is, flip it to a positive so we can work with it
  if (n < 0) {
    n *= -1;
  }
  //check if it is 0. if it is, the number is (or was) even - base case for even
  if (n === 0) {
    return true;
  }
  //check if it is 1. if it is, the number is (or was) odd - base case for odd
  if (n === 1) {
    return false;
  }
  //recursive case - pass n-2 and repeat. for example 3 would check 1 and get false, 4 would check 2, then check 0 and get true
  return isEven(n-2);
};

// 5. Sum all integers below a given integer.
// sumBelow(10); // 45 (9+8+7+6+5+4+3+2+1)
// sumBelow(7); // 21
var sumBelow = function(n) {
  //so we want to take the number we are given, subtract 1, and add it to the next number via recursive function
  //escape case if 0 is passed in
  if (n === 0){
    return 0;
  }
  //base case - once we see n has reached 1 we can stop adding values (1 was added in the call of this iteration)
  if (n === 1){
    return 0;
  }
  //recursive case - keep subtracting until we get to 1
  if (n > 0) {
    return ((n-1)+sumBelow((n-1)));
  }
  //recursive case - same as above but for negative values
  if (n < 0) {
    return ((n+1)+sumBelow((n+1)));
  }
};

// 6. Get the integers within a range (x, y).
// range(2,9); // [3,4,5,6,7,8]
var range = function(x, y) {
  //base case, if numbers match do not add to the array
  if (y - x === 0) {
    return []; //this empty array will be the base we push any future values to
  } else {
    if (x < y) {//x less than y version
      var array = range(x, y - 1); //this will get us an empty array from base case, or begin recursion
      if((y-1) !== x){ //special case if this is the last loop, don't include it
        array.push(y-1); //stitches each recursive loop to the array
      }
    } else { //x greater than y version
      var array = range(x, y + 1); //this will get us an empty array from base case, or begin recursion
      if((y+1) !== x){ //special case if this is the last loop, don't include it
        array.push(y+1); //stitches each recursive loop to the array
      }
    }
    return array; //return the final array
  }
};

// 7. Compute the exponent of a number.
// The exponent of a number says how many times the base number is used as a factor.
// 8^2 = 8 x 8 = 64. Here, 8 is the base and 2 is the exponent.
// exponent(4,3); // 64
// https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/computing-powers-of-a-number
var exponent = function(base, exp) {
  //escape case for 0 exponent
  //check for even numbers first per optimization request
  if (exp > 0) {
    return (base * exponent(base, (exp - 1))); //recursive case - will multiply base * itself * Itself * itself until a 1 is returned by base case
  } else if (exp === 0) { //base case - once we have run as many recursive loops as required, return a 1 - the 1 won't effect math just gets us out of loop
      return 1;
    } else { //if it isnt positive or 0 it must be negative, do the negative loop until 0
    return (exponent(base, (exp + 1)) / base); //recursive case - exponent math for negative numbers
  }
};

// 8. Determine if a number is a power of two.
// powerOfTwo(1); // true
// powerOfTwo(16); // true
// powerOfTwo(10); // false
var powerOfTwo = function(n) {
  //16/2=8/2=4/2=2/2=1 1 is always true because 0 power is always 1.
  //use 1 as base case, divide by 2 until we get to 1 or under 1.
  //base case
  if (n === 1){
    return true;
  } else if (n > 1) { //recursive case, divide by 2 until we get base case
    return powerOfTwo((n / 2));
  } else { //(n < 1)
    return false; //alternate base case, if number falls below 1 it isnt a power of 2
  }
};

// 9. Write a function that reverses a string.
var reverse = function(string) {
  //we want to cut letters off and return them one at a time using recursion
  //recursion works backwards, last called function will finish first:
  //meaning the last letter cut should be the letter we want first, for hello cut o last
  //google to find .substr() which will grab "whats left" of the string
  //.charAt which will grab the specific letter we are cutting out
  //by working backwards with recursion we can always cut the character at [0]:
  //meaning I don't need to worry about the length of the string at all

  //base case
  if (string === "") {
    return ""; //if the string is empty end the loop and add nothing to the result
  } else {
    return (reverse(string.substr(1)) + string.charAt(0)); //grab the first letter, recursive call with remaining letters (if any)
  }
};

// 10. Write a function that determines if a string is a palindrome.
var palindrome = function(string) {
  //palindrome is the same thing forward and back - racecar
  //cant just check to see if it matches the reverse.
  //ignore capitals and spaces
  //first, "deformat" - remove capitals and spaces
  string = string.split(" ").join(""); //removes the spaces
  string = string.toLowerCase();//makes it all lower case
  //base case 0 or 1 letter left
  if (string.length <= 1) {
    return true; //"" is a palindrome, "a" is a palindrome
  } else if (string.charAt(0) === string.charAt((string.length - 1))) { //if first and last letter match we MAY have a palindrome
    return palindrome(string.substring(1, (string.length-1))); //recursive case, send string with first and last letter removed. (racecar becomes aceca cec e true)
  } else {
    return false; //if at any time a check fails it is no longer possible to be a palindrome
  }
};

// 11. Write a function that returns the remainder of x divided by y without using the
// modulo (%) operator.
// modulo(5,2) // 1
// modulo(17,5) // 2
// modulo(22,6) // 4
var modulo = function(x, y) {
};

// 12. Write a function that multiplies two numbers without using the * operator or
// Math methods.
var multiply = function(x, y) {
};

// 13. Write a function that divides two numbers without using the / operator or
// Math methods to arrive at an approximate quotient (ignore decimal endings).
var divide = function(x, y) {
};

// 14. Find the greatest common divisor (gcd) of two positive numbers. The GCD of two
// integers is the greatest integer that divides both x and y with no remainder.
// gcd(4,36); // 4
// http://www.cse.wustl.edu/~kjg/cse131/Notes/Recursion/recursion.html
// https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
var gcd = function(x, y) {
};

// 15. Write a function that compares each character of two strings and returns true if
// both are identical.
// compareStr('house', 'houses') // false
// compareStr('tomato', 'tomato') // true
var compareStr = function(str1, str2) {
};

// 16. Write a function that accepts a string and creates an array where each letter
// occupies an index of the array.
var createArray = function(str) {
};

// 17. Reverse the order of an array
var reverseArr = function(array) {
};

// 18. Create a new array with a given value and length.
// buildList(0,5) // [0,0,0,0,0]
// buildList(7,3) // [7,7,7]
var buildList = function(value, length) {
};

// 19. Implement FizzBuzz. Given integer n, return an array of the string representations of 1 to n.
// For multiples of three, output 'Fizz' instead of the number.
// For multiples of five, output 'Buzz' instead of the number.
// For numbers which are multiples of both three and five, output “FizzBuzz” instead of the number.
// fizzBuzz(5) // ['1','2','Fizz','4','Buzz']
var fizzBuzz = function(n) {
};

// 20. Count the occurrence of a value in a list.
// countOccurrence([2,7,4,4,1,4], 4) // 3
// countOccurrence([2,'banana',4,4,1,'banana'], 'banana') // 2
var countOccurrence = function(array, value) {
};

// 21. Write a recursive version of map.
// rMap([1,2,3], timesTwo); // [2,4,6]
var rMap = function(array, callback) {
};

// 22. Write a function that counts the number of times a key occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countKeysInObj(obj, 'r') // 1
// countKeysInObj(obj, 'e') // 2
var countKeysInObj = function(obj, key) {
};

// 23. Write a function that counts the number of times a value occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countValuesInObj(obj, 'r') // 2
// countValuesInObj(obj, 'e') // 1
var countValuesInObj = function(obj, value) {
};

// 24. Find all keys in an object (and nested objects) by a provided name and rename
// them to a provided new name while preserving the value stored at that key.
var replaceKeysInObj = function(obj, oldKey, newKey) {
};

// 25. Get the first n Fibonacci numbers. In the Fibonacci sequence, each subsequent
// number is the sum of the previous two.
// Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.....
// fibonacci(5); // [0,1,1,2,3,5]
// Note: The 0 is not counted.
var fibonacci = function(n) {
};

// 26. Return the Fibonacci number located at index n of the Fibonacci sequence.
// [0,1,1,2,3,5,8,13,21]
// nthFibo(5); // 5
// nthFibo(7); // 13
// nthFibo(3); // 2
var nthFibo = function(n) {
};

// 27. Given an array of words, return a new array containing each word capitalized.
// var words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
var capitalizeWords = function(array) {
};

// 28. Given an array of strings, capitalize the first letter of each index.
// capitalizeFirst(['car','poop','banana']); // ['Car','Poop','Banana']
var capitalizeFirst = function(array) {
};

// 29. Return the sum of all even numbers in an object containing nested objects.
// var obj1 = {
//   a: 2,
//   b: {b: 2, bb: {b: 3, bb: {b: 2}}},
//   c: {c: {c: 2}, cc: 'ball', ccc: 5},
//   d: 1,
//   e: {e: {e: 2}, ee: 'car'}
// };
// nestedEvenSum(obj1); // 10
var nestedEvenSum = function(obj) {
};

// 30. Flatten an array containing nested arrays.
// flatten([1,[2],[3,[[4]]],5]); // [1,2,3,4,5]
var flatten = function(array) {
};

// 31. Given a string, return an object containing tallies of each letter.
// letterTally('potato'); // {p:1, o:2, t:2, a:1}
var letterTally = function(str, obj) {
};

// 32. Eliminate consecutive duplicates in a list. If the list contains repeated
// elements they should be replaced with a single copy of the element. The order of the
// elements should not be changed.
// compress([1,2,2,3,4,4,5,5,5]) // [1,2,3,4,5]
// compress([1,2,2,3,4,4,2,5,5,5,4,4]) // [1,2,3,4,2,5,4]
var compress = function(list) {
};

// 33. Augment every element in a list with a new value where each element is an array
// itself.
// augmentElements([[],[3],[7]], 5); // [[5],[3,5],[7,5]]
var augmentElements = function(array, aug) {
};

// 34. Reduce a series of zeroes to a single 0.
// minimizeZeroes([2,0,0,0,1,4]) // [2,0,1,4]
// minimizeZeroes([2,0,0,0,1,0,0,4]) // [2,0,1,0,4]
var minimizeZeroes = function(array) {
};

// 35. Alternate the numbers in an array between positive and negative regardless of
// their original sign. The first number in the index always needs to be positive.
// alternateSign([2,7,8,3,1,4]) // [2,-7,8,-3,1,-4]
// alternateSign([-2,-7,8,3,-1,4]) // [2,-7,8,-3,1,-4]
var alternateSign = function(array) {
};

// 36. Given a string, return a string with digits converted to their word equivalent.
// Assume all numbers are single digits (less than 10).
// numToText("I have 5 dogs and 6 ponies"); // "I have five dogs and six ponies"
var numToText = function(str) {
};


// *** EXTRA CREDIT ***

// 37. Return the number of times a tag occurs in the DOM.
var tagCount = function(tag, node) {
};

// 38. Write a function for binary search.
// var array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// binarySearch(array, 5) // 5
// https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
var binarySearch = function(array, target, min, max) {
};

// 39. Write a merge sort function.
// mergeSort([34,7,23,32,5,62]) // [5,7,23,32,34,62]
// https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms
var mergeSort = function(array) {
};

// 40. Deeply clone objects and arrays.
// var obj1 = {a:1,b:{bb:{bbb:2}},c:3};
// var obj2 = clone(obj1);
// console.log(obj2); // {a:1,b:{bb:{bbb:2}},c:3}
// obj1 === obj2 // false
var clone = function(input) {
};
