!function(e){function n(){var e={CLICK:{name:"click",value:1,title:"点击"},SHAKE:{name:"shake",value:2,title:"摇一摇"}},n={SHOW:{name:"show",value:1},HIDE:{name:"hide",value:2},RANDOMEVENT:{name:"randomEvent",value:3}};this.getSendType=function(n){if(void 0===n)return e;for(var i in e)if(n===e[i].value)return e[i];return null},this.getHandleType=function(e){if(void 0===e)return n;for(var i in n)if(e===n[i].value)return n[i];return null}}e.utilTrigger=new n}(window);