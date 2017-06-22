var a = (msg) => () => msg;
 
var bobo = {
  _name: "BoBo",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
};