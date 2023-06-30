// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0-or-later

/**
 * Represents a mathematical expression.
 */
export default class Expression {
  constructor(expression) {
    this.expression = expression;
  }

  /**
   * Evaluates the expression.  cf.
   * https://en.wikipedia.org/wiki/Shunting_yard_algorithm#The_algorithm_in_detail
   */
  evaluate() {
    // An output queue.
    const output = [];

    // An operator stack.
    const operators = [];

    for (const token of this.tokenize()) {
      switch (token.type) {
        case 'NUMBER': {
          output.push(token.value);
          break;
        }
        case 'OPERATOR': {
          let top;
          while ((top = operators.at(-1)) != null && top !== '(') {
            const operator1 = this.constructor.OPERATORS[token.value];
            const operator2 = this.constructor.OPERATORS[top];
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
          operators.push(token.value);
          break;
        }
        case 'LEFT_PARENTHESIS': {
          operators.push(token.value);
          break;
        }
        case 'RIGHT_PARENTHESIS': {
          let top;
          while ((top = stack.pop()) !== '(') {
            output.push(top);
          }
          break;
        }
      }
    }

    return [...output, ...operators.reverse()].join(' ');
  }

  /**
   * Tokenizes the expression.
   */
  tokenize() {
    // FIXME
    return this.expression.split(/\s+/).map((token) => ({
      type: (
        token === '(' ? 'LEFT_PARENTHESIS'
        : token === ')' ? 'RIGHT_PARENTHESIS'
        : this.constructor.OPERATOR_REGEXP.test(token) ? 'OPERATOR'
        : 'NUMBER'
      ),
      value: token,
    }));
  }
}

Expression.OPERATORS = {
  '^': {
    associativity: 'right',
    precedence: 3,
  },
  '*': {
    associativity: 'left',
    precedence: 2,
  },
  '/': {
    associativity: 'left',
    precedence: 2,
  },
  '+': {
    associativity: 'left',
    precedence: 1,
  },
  '-': {
    associativity: 'left',
    precedence: 1,
  },
};

Expression.OPERATOR_REGEXP = (
  new RegExp(
    `^[${
      Object
        .keys(Expression.OPERATORS)
        .join('')
        .replace(/\W/g, '\\$&')
    }]$`
  )
);

// console.log(new Expression("2 * 3 ^ 4").evaluate());

// @license-end
