var yajefa = require('../run');

describe("The run function", function() {
  it("should execute an array of functions sequentially", function() {
    var a = 0;
    yajefa.run([
        function(callback) {a+=1;callback();},
        function(callback) {a+=1;callback();},
        function(callback) {a+=1;callback();},
        function(callback) {a+=1;callback();},
        function(callback) {a+=1;callback();},
        function() {expect(a).toBe(5);}
    ]);
  });
});

