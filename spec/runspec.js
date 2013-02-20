describe('run()', function() {
    var yajefa = require('../run');
    
    it('should execute an array of functions sequentially', function() {
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

    it('should wait for all parallel functions to finish before calling another function in sequence', function() {
        var a = 0,
            b = 0,
            c = 0,
            d = 0;

        yajefa.run([
            {
                func1: function(callback) {a += 1;callback();},
                func2: function(callback) {b += 1;callback();},
                func3: function(callback) {c += 1;callback();},
                func4: function(callback) {d += 1;callback();},
            },
            function(callback) {
                expect(a+b+c+d).toBe(4);
                callback();
            },
            {
                func1: function(callback) {a -= 2;callback();},
                func2: function(callback) {b -= 2;callback();},
                func3: function(callback) {c -= 2;callback();},
                func4: function(callback) {d -= 2;callback();},
            },
            function() {
                expect(a+b+c+d).toBe(-4);
            }]
        );
    });
});

