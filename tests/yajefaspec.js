describe('run()', function() {
    var yajefa = require('../yajefa');
    var a, b, c, d;

    beforeEach(function() {
        a = b = c = d = 0;
    });

    it('should execute an array of functions sequentially', function() {
        var spiedStuff = {
                testEndCallback: function() {
                    console.log('*** eee');
                }
            };
        spyOn(spiedStuff, 'testEndCallback');
        yajefa.run([
            function(callback) {a += 1; callback();},
            function(callback) {a += 1; callback();},
            function(callback) {a += 1; callback();},
            function(callback) {a += 1; callback();},
            function(callback) {a += 1; callback();},
            function(callback) {expect(a).toBe(5);callback()}
        ], null, spiedStuff.testEndCallback);
        expect(spiedStuff.testEndCallback).toHaveBeenCalled();
    });

    it('should wait for all parallel functions to finish before calling another function in sequence', function() {
        yajefa.run([
            {
                func1: function(callback) {a += 1; callback();},
                func2: function(callback) {b += 1; callback();},
                func3: function(callback) {c += 1; callback();},
                func4: function(callback) {d += 1; callback();},
            },
            function(callback) {
                expect(a + b + c + d).toBe(4);
                callback();
            },
            {
                func1: function(callback) {a -= 2; callback();},
                func2: function(callback) {b -= 2; callback();},
                func3: function(callback) {c -= 2; callback();},
                func4: function(callback) {d -= 2; callback();},
            },
            function() {
                expect(a + b + c + d).toBe(-4);
            }]
        );
    });
});


describe('parse()', function() {
    // TODO
});


describe('prepend()', function() {
    var yajefa = require('../yajefa'),
        a,
        called = false;

    beforeEach(function() {
        a = 1;
    });

    it('should add a function before every element in a list', function() {
        var program = [
                function(callback) {a *= 5;callback();}
            ],
            spiedStuff = {
                testEndCallback: function() {
                    expect(a).toBe(0);
                }
            };
        spyOn(spiedStuff, 'testEndCallback');
        yajefa.prepend(program, function(callback) {a = 0;callback();});
        yajefa.run(
            program,
            null,
            spiedStuff.testEndCallback
            );
        expect(spiedStuff.testEndCallback).toHaveBeenCalled();
    });

    it('should add a function before every element in an object', function() {
        // TODO
    });
});
