// Solve the issue in the following example:
​
var profile = {
  name: 'Alex',
  getName() {
    var innerGetName = function(){
      return this.name;
    }
    return innerGetName.call();
  }
};
​
console.log(profile.getName());