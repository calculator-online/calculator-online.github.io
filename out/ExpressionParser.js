// Generated from Expression.g4 by ANTLR 4.13.0
// jshint ignore: start
import antlr4 from 'antlr4';
import ExpressionListener from './ExpressionListener.js';
const serializedATN = [4,1,10,37,2,0,7,0,2,1,7,1,1,0,5,0,6,8,0,10,0,12,0,
9,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,21,8,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,5,1,32,8,1,10,1,12,1,35,9,1,1,1,0,1,2,2,0,2,0,3,1,0,
5,6,1,0,3,4,1,0,7,8,40,0,7,1,0,0,0,2,20,1,0,0,0,4,6,3,2,1,0,5,4,1,0,0,0,
6,9,1,0,0,0,7,5,1,0,0,0,7,8,1,0,0,0,8,10,1,0,0,0,9,7,1,0,0,0,10,11,5,0,0,
1,11,1,1,0,0,0,12,13,6,1,-1,0,13,21,5,9,0,0,14,15,5,1,0,0,15,16,3,2,1,0,
16,17,5,2,0,0,17,21,1,0,0,0,18,19,7,0,0,0,19,21,3,2,1,3,20,12,1,0,0,0,20,
14,1,0,0,0,20,18,1,0,0,0,21,33,1,0,0,0,22,23,10,4,0,0,23,24,7,1,0,0,24,32,
3,2,1,4,25,26,10,2,0,0,26,27,7,2,0,0,27,32,3,2,1,3,28,29,10,1,0,0,29,30,
7,0,0,0,30,32,3,2,1,2,31,22,1,0,0,0,31,25,1,0,0,0,31,28,1,0,0,0,32,35,1,
0,0,0,33,31,1,0,0,0,33,34,1,0,0,0,34,3,1,0,0,0,35,33,1,0,0,0,4,7,20,31,33];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class ExpressionParser extends antlr4.Parser {

    static grammarFileName = "Expression.g4";
    static literalNames = [ null, "'('", "')'", "'^'", "'**'", "'+'", "'-'", 
                            "'*'", "'/'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, "NUMBER", "WHITESPACE" ];
    static ruleNames = [ "start", "expression" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = ExpressionParser.ruleNames;
        this.literalNames = ExpressionParser.literalNames;
        this.symbolicNames = ExpressionParser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 1:
    	    		return this.expression_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expression_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 4);
    		case 1:
    			return this.precpred(this._ctx, 2);
    		case 2:
    			return this.precpred(this._ctx, 1);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	start() {
	    let localctx = new StartContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, ExpressionParser.RULE_start);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 7;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 610) !== 0)) {
	            this.state = 4;
	            this.expression(0);
	            this.state = 9;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 10;
	        this.match(ExpressionParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	expression(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 2;
	    this.enterRecursionRule(localctx, 2, ExpressionParser.RULE_expression, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 20;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 9:
	            this.state = 13;
	            this.match(ExpressionParser.NUMBER);
	            break;
	        case 1:
	            this.state = 14;
	            this.match(ExpressionParser.T__0);
	            this.state = 15;
	            this.expression(0);
	            this.state = 16;
	            this.match(ExpressionParser.T__1);
	            break;
	        case 5:
	        case 6:
	            this.state = 18;
	            _la = this._input.LA(1);
	            if(!(_la===5 || _la===6)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 19;
	            this.expression(3);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 33;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 31;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ExpressionContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expression);
	                    this.state = 22;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 23;
	                    _la = this._input.LA(1);
	                    if(!(_la===3 || _la===4)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 24;
	                    this.expression(4);
	                    break;

	                case 2:
	                    localctx = new ExpressionContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expression);
	                    this.state = 25;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 26;
	                    _la = this._input.LA(1);
	                    if(!(_la===7 || _la===8)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 27;
	                    this.expression(3);
	                    break;

	                case 3:
	                    localctx = new ExpressionContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expression);
	                    this.state = 28;
	                    if (!( this.precpred(this._ctx, 1))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
	                    }
	                    this.state = 29;
	                    _la = this._input.LA(1);
	                    if(!(_la===5 || _la===6)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 30;
	                    this.expression(2);
	                    break;

	                } 
	            }
	            this.state = 35;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}


}

ExpressionParser.EOF = antlr4.Token.EOF;
ExpressionParser.T__0 = 1;
ExpressionParser.T__1 = 2;
ExpressionParser.T__2 = 3;
ExpressionParser.T__3 = 4;
ExpressionParser.T__4 = 5;
ExpressionParser.T__5 = 6;
ExpressionParser.T__6 = 7;
ExpressionParser.T__7 = 8;
ExpressionParser.NUMBER = 9;
ExpressionParser.WHITESPACE = 10;

ExpressionParser.RULE_start = 0;
ExpressionParser.RULE_expression = 1;

class StartContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_start;
    }

	EOF() {
	    return this.getToken(ExpressionParser.EOF, 0);
	};

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionListener ) {
	        listener.enterStart(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionListener ) {
	        listener.exitStart(this);
		}
	}


}



class ExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_expression;
    }

	NUMBER() {
	    return this.getToken(ExpressionParser.NUMBER, 0);
	};

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionListener ) {
	        listener.enterExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionListener ) {
	        listener.exitExpression(this);
		}
	}


}




ExpressionParser.StartContext = StartContext; 
ExpressionParser.ExpressionContext = ExpressionContext; 
