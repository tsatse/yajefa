void function(root) {
    function definitionFunction() {
        'use strict';
        function _makeSerialExecution(func1, func2) {
            return function(overallCallback, param) {
                func1(function(cb, p) {
                    func2(overallCallback, p);
                }, param);
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

        function parse(program) {
            var result = null,
                params = [],
                index;
            switch(_programToType(program)) {
                case 'Array':
                    result = parse(program[program.length - 1]);
                    for(var i = program.length - 2; i >= 0 ; i--) {
                        result = _makeSerialExecution(parse(program[i]), result);
                    }
                    break;
                case 'Function':
                    result = program;
                    break;
                case 'Object':
                    for(index in program) {
                        if(program.hasOwnProperty(index)) {
                            params.push(parse(program[index]));
                        }
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

        function run(program, param, callback) {
            return parse(program)(callback, param);
        }

        function prepend(program, callback) {
            var i,
                keys;
            switch(_programToType(program)) {
                case 'Array':
                    for(i = 0 ; i < program.length ; i++) {
                        program[i] = [callback, program[i]];
                    }
                    break;
                case 'Function':
                    return [callback, program];
                case 'Object':
                    keys = Object.keys(program);
                    for(i = 0 ; i < keys.length ; i++) {
                        program[keys[i]] = [callback, program[i]];
                    }
            }
            return program;
        }

        function postpend(program, callback) {
            var i,
                keys;
            switch(_programToType(program)) {
                case 'Array':
                    for(i = 0 ; i < program.length ; i++) {
                        program[i] = [program[i], callback];
                    }
                    break;
                case 'Function':
                    return [program, callback];
                case 'Object':
                    keys = Object.keys(program);
                    for(i = 0 ; i < keys.length ; i++) {
                        program[keys[i]] = [program[i], callback];
                    }
            }
            return program;
        }

        return {
            run: run,
            parse: parse,
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
