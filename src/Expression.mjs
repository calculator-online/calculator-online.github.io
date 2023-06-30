// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0-or-later

/**
 * Represents a mathematical expression.
 */
export default class Expression {
  constructor(expression) {
    this.expression = expression;
  }

  /**
   * Evaluates the expression.
   */
  evaluate() {
    const rpn = this.toRPN();
    const stack = [];

    for (const token of rpn) {
      switch (token.type) {
        case 'NUMBER': {
          stack.push(Number(token.value));
          break;
        }
        case 'OPERATOR': {
          const right = stack.pop();
          const left = stack.pop();
          stack.push(
            this.constructor.OPERATORS[token.value].function(left, right)
          );
          break;
        }
        default: {
          throw new Error(`unknown token type: ${token.type}`);
        }
      }
    }

    return stack.pop();
  }

  /**
   * Converts the expression to RPN.  cf.
   * https://en.wikipedia.org/wiki/Shunting_yard_algorithm#The_algorithm_in_detail
   */
  toRPN() {
    // An output queue.
    const output = [];

    // An operator stack.
    const operators = [];

    for (const token of this.tokenize()) {
      switch (token.type) {
        case 'NUMBER': {
          output.push(token);
          break;
        }
        case 'OPERATOR': {
          let top;
          while ((top = operators.at(-1)) != null && top.value !== '(') {
            const operator1 = this.constructor.OPERATORS[token.value];
            const operator2 = this.constructor.OPERATORS[top.value];
            if (
              operator2.precedence > operator1.precedence
              || (
                operator1.precedence === operator2.precedence
                && operator1.associativity === 'left'
              )
            ) {
              output.push(operators.pop());
            } else {
              break;
            }
          }
          operators.push(token);
          break;
        }
        case 'LEFT_PARENTHESIS': {
          operators.push(token);
          break;
        }
        case 'RIGHT_PARENTHESIS': {
          let top;
          while ((top = operators.pop()).value !== '(') {
            output.push(top);
          }
          break;
        }
        default: {
          throw new Error(`unknown token type: ${token.type}`);
        }
      }
    }

    return [...output, ...operators.reverse()];
  }

  /**
   * FIXME: Tokenizes the expression.
   */
  tokenize() {
    const tokens = [];
    let expression = this.expression.replace(/\s+/g, '');
    while (expression !== '') {
      let match;
      const type = (
        Object
          .entries(this.constructor.TOKEN_TYPES)
          .find(([, regExp]) => (match = expression.match(regExp)))
      );
      if (type == null) {
        throw new Error(`unrecognized token: ${expression}`);
      }
      tokens.push({
        type: type[0],
        value: match[0],
      });
      expression = expression.slice(match[0].length);
    }
    return tokens;
  }
}

Expression.OPERATORS = {
  '**': {
    associativity: 'right',
    function: (x, y) => x ** y,
    precedence: 3,
  },
  '^': {
    associativity: 'right',
    function: (x, y) => x ** y,
    precedence: 3,
  },
  '*': {
    associativity: 'left',
    function: (x, y) => x * y,
    precedence: 2,
  },
  '/': {
    associativity: 'left',
    function: (x, y) => x / y,
    precedence: 2,
  },
  '+': {
    associativity: 'left',
    function: (x, y) => x + y,
    precedence: 1,
  },
  '-': {
    associativity: 'left',
    function: (x, y) => x - y,
    precedence: 1,
  },
};

Expression.TOKEN_TYPES = {
  LEFT_PARENTHESIS: /^\(/,
  RIGHT_PARENTHESIS: /^\)/,
  NUMBER: /^\d+(?:\.\d+)?(?:e[+-]?\d+)?/i, // FIXME
  OPERATOR: (
    new RegExp(
      `^(?:${
        Object
          .keys(Expression.OPERATORS)
          .map((x) => x.replace(/\W/g, '\\$&'))
          .join('|')
      })`
    )
  ),
};

// @license-end
