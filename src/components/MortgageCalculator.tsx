"use client";

import { useState, useEffect } from "react";

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(100); // 万元
  const [loanTerm, setLoanTerm] = useState<number>(30); // 年
  const [interestRate, setInterestRate] = useState<number>(3.25); // 年利率 %
  const [paymentType, setPaymentType] = useState<"principal-interest" | "principal">("principal-interest");
  
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [monthlyDecrease, setMonthlyDecrease] = useState<number>(0); // 等额本金首月后递减金额

  useEffect(() => {
    calculate();
  }, [loanAmount, loanTerm, interestRate, paymentType]);

  const calculate = () => {
    const principal = loanAmount * 10000;
    const months = loanTerm * 12;
    const monthlyRate = interestRate / 100 / 12;

    if (principal <= 0 || months <= 0 || monthlyRate <= 0) {
      return;
    }

    if (paymentType === "principal-interest") {
      // 等额本息
      const x = Math.pow(1 + monthlyRate, months);
      const monthly = (principal * monthlyRate * x) / (x - 1);
      const total = monthly * months;
      
      setMonthlyPayment(monthly);
      setTotalPayment(total);
      setTotalInterest(total - principal);
      setMonthlyDecrease(0);
    } else {
      // 等额本金
      const monthlyPrincipal = principal / months;
      const firstMonthInterest = principal * monthlyRate;
      const firstMonthPayment = monthlyPrincipal + firstMonthInterest;
      
      // 每月递减金额 = 每月本金 * 月利率
      const decrease = monthlyPrincipal * monthlyRate;
      
      const totalInterestVal = (months + 1) * principal * monthlyRate / 2;
      const totalPaymentVal = principal + totalInterestVal;

      setMonthlyPayment(firstMonthPayment);
      setTotalPayment(totalPaymentVal);
      setTotalInterest(totalInterestVal);
      setMonthlyDecrease(decrease);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(val);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-black">
      <h2 className="text-xl font-bold mb-4 text-gray-800">房贷计算器</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">贷款金额 (万元)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">贷款期限 (年)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">年利率 (%)</label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">还款方式</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={paymentType === "principal-interest"}
                onChange={() => setPaymentType("principal-interest")}
                className="mr-2"
              />
              等额本息
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={paymentType === "principal"}
                onChange={() => setPaymentType("principal")}
                className="mr-2"
              />
              等额本金
            </label>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">{paymentType === "principal-interest" ? "每月月供" : "首月月供"}</span>
            <span className="font-bold text-blue-600 text-lg">{formatCurrency(monthlyPayment)}</span>
          </div>
          {paymentType === "principal" && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">每月递减</span>
              <span className="text-gray-700">{formatCurrency(monthlyDecrease)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-blue-100">
            <span className="text-gray-600">还款总额</span>
            <span className="font-semibold text-gray-800">{formatCurrency(totalPayment)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">支付利息</span>
            <span className="font-semibold text-gray-800">{formatCurrency(totalInterest)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
