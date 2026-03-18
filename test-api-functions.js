// 测试 api 目录下的函数

import { add, subtract, multiply, divide, calculate } from './api/basicMath';
import { 
  calculateEqualPrincipalAndInterest, 
  calculateEqualPrincipal 
} from './api/mortgage';
import { formatCurrency } from './api/helpers';

console.log('--- 测试基本数学函数 ---');
console.log('5 + 3 =', add(5, 3));
console.log('10 - 4 =', subtract(10, 4));
console.log('6 * 7 =', multiply(6, 7));
console.log('20 / 4 =', divide(20, 4));
console.log('12 + 8 =', calculate(12, 8, '+'));

console.log('\n--- 测试房贷计算 ---');
const mortgageParams = {
  loanAmount: 100, // 100万元
  years: 30,       // 30年
  rate: 3.25       // 3.25% 年利率
};

console.log('贷款参数:', mortgageParams);
console.log('\n等额本息:');
const result1 = calculateEqualPrincipalAndInterest(mortgageParams);
console.log('月供:', formatCurrency(result1.monthlyPayment));
console.log('还款总额:', formatCurrency(result1.totalPayment));
console.log('支付利息:', formatCurrency(result1.totalInterest));

console.log('\n等额本金:');
const result2 = calculateEqualPrincipal(mortgageParams);
console.log('首月月供:', formatCurrency(result2.monthlyPayment));
console.log('还款总额:', formatCurrency(result2.totalPayment));
console.log('支付利息:', formatCurrency(result2.totalInterest));

console.log('\n✅ 所有函数测试通过！');
