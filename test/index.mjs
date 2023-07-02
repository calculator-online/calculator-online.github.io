import antlr4 from 'antlr4';
import ExpressionLexer from '../out/ExpressionLexer.js';
import ExpressionParser from '../out/ExpressionParser.js';
// import ExpressionListener from '../out/ExpressionListener.js';

const input = '3+4*5';
const chars = new antlr4.InputStream(input);
const lexer = new ExpressionLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new ExpressionParser(tokens);
parser.buildParseTrees = true;
const tree = parser.start();
console.log(tree.toStringTree(parser.ruleNames));
