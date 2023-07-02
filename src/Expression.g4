grammar Expression;

/**
 * Parser rules
 */
start
  : expression* EOF
  ;

expression
  : NUMBER
  | '(' expression ')'
  | <assoc=right> expression ('^' | '**') expression
  | ('+' | '-') expression
  | expression ('*' | '/') expression
  | expression ('+' | '-') expression
  ;

/**
 * Lexer rules
 */
NUMBER
  : SIGNIFICAND (('e' | 'E') EXPONENT)?
  ;

fragment SIGNIFICAND
  : [0-9]+ ('.' [0-9]*)?
  | '.' [0-9]+
  ;

fragment EXPONENT
  : ('+' | '-')? [0-9]+
  ;

WHITESPACE
  : [\t\n\r ]+ -> skip
  ;
