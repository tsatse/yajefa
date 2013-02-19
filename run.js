'use strict';
define(
    function() {
        function makeSerialExecution(func1, func2) {
            return function(param) {
                func1(func2, param);
            };
        }
        
        function makeParallelExecution(funcList) {
            return function(param) {
                for(var i = 0 ; i < funcList.length ; i++) {
                    funcList[i](param);
                }
            };
        }

        function parse(program) {
            var result = null;
            if(program instanceof Array && program.length > 0) {
                result = parse(program[program.length - 1]);
                for(var i = program.length - 2; i >= 0 ; i--) {
                    result = makeSerialExecution(parse(program[i]), result);
                }
            }
            else if(program instanceof Function) {
                result = program;
            }
            else if(program instanceof Object) {
                var params = [];
                for(var index in program) {
                    params.push(parse(program[index]));
                }
                result = makeParallelExecution(params);
            }
            return result;
        }

        function run(program, param) {
            return parse(program)(param);
        }

        return run;
    }
);
