void function(root) {
    function definitionFunction() {
        'use strict';
        function _makeSerialExecution(func1, func2) {
            return function(param) {
                func1(func2, param);
            };
        }
        
        function _makeParallelExecution(funcList) {
            var toGo = funcList.length;
            var checkEndPoint = function(callback) {
                toGo--;
                if(!toGo) {
                    callback();
                }
            }
            return function(callback, param) {
                for(var i = 0 ; i < funcList.length ; i++) {
                    funcList[i](function() {checkEndPoint(callback)}, param);
                }
            };
        }

        function _parse(program) {
            var result = null;
            switch(_programToType(program)) {
                case 'Array':
                    result = _parse(program[program.length - 1]);
                    for(var i = program.length - 2; i >= 0 ; i--) {
                        result = _makeSerialExecution(_parse(program[i]), result);
                    }
                    break;
                case 'Function':
                    result = program;
                    break;
                case 'Object':
                    var params = [];
                    for(var index in program) {
                        params.push(_parse(program[index]));
                    }
                    result = _makeParallelExecution(params);
                    break;
            }
            return result;
        }

        function _programToType(program) {
            if(program instanceof Array) {
                return 'Array';
            }
            if(program instanceof Function) {
                return 'Function';
            }
            if(program instanceof Object) {
                return 'Object';
            }
        }

        function run(program, param) {
            return _parse(program)(param);
        }

        function prepend(program, callback) {
            switch(_programToType(program)) {
                case 'Array':
                    for(var i = 0 ; i < program.length ; i++) {
                        program[i] = prepend(program[i], callback);
                    }
                    break;
                case 'Function':
                case 'Object':
                    return [callback, program];
            }
        }
        function postpend(program, callback) {
            switch(_programToType(program)) {
                case 'Array':
                    for(var i = 0 ; i < program.length ; i++) {
                        program[i] = postpend(program[i], callback);
                    }
                    break;
                case 'Function':
                case 'Object':
                    return [program, callback];
            }
        }

        return {
            run: run,
            prepend: prepend,
            postpend: postpend
        };
    }
     
    if ( typeof define === 'function' && define.amd ) {
        console.log('define')
        define(definitionFunction);
    }
    else if ( typeof module === 'object' && module.exports ) {
        console.log('module')
        module.exports = definitionFunction();
    }
    /*else if(typeof process !== "undefined") {
        console.log('process')
        exports.run = definitionFunction();
    }*/
    else {
        console.log('root')
        root.yajefa = definitionFunction();
    }
} (this);

/*
if(typeof define !== 'undefined') {
    define(definitionFunction);
}
else if(typeof process !== "undefined") {
    exports.run = definitionFunction();
}
else {
    run = definitionFunction();
}*/