
// a function that compares the next correct node to 
// the user's current selection
// if the guess is correct, increment the next guess
// index. check if all nodes have been selected.
// if so, congradulate the player and go to the next 
// level. if the guess is wrong, punish the player
// and restart the level, maybe slower so they 
// understand
export default function select(
  event, 
  setUserSelection, 
  correctSelection, 
  setCorrectSelection) {
  let userSelection
  if (event && event.target) {
    userSelection = parseInt(event.target.id, 10)
  }
  setUserSelection(userSelection)

  // check if user guess is correct
  if (userSelection === correctSelection) {
    // set the next node as the correct guess
    setCorrectSelection(correctSelection + 1)
  } 
  // setUserSelection(parseInt(event.target.id, 10))
}