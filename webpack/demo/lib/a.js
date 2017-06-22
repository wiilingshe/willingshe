"use strict";

var a = function a(msg) {
  return function () {
    return msg;
  };
};

var bobo = {
  _name: "BoBo",
  _friends: [],
  printFriends: function printFriends() {
    var _this = this;

    this._friends.forEach(function (f) {
      return console.log(_this._name + " knows " + f);
    });
  }
};