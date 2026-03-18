export interface MortgageParams {
  loanAmount: number; // 贷款金额（万元）
  years: number; // 贷款年限
  rate: number; // 年利率（%）
}

export interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export function calculateEqualPrincipalAndInterest(params: MortgageParams): MortgageResult {
  const principal = params.loanAmount * 10000;
  const months = params.years * 12;
  const monthlyRate = params.rate / 100 / 12;

  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                         (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment,
    totalPayment,
    totalInterest
  };
}

export function calculateEqualPrincipal(params: MortgageParams): MortgageResult {
  const principal = params.loanAmount * 10000;
  const months = params.years * 12;
  const monthlyRate = params.rate / 100 / 12;

  const monthlyPrincipal = principal / months;
  let totalInterest = 0;

  for (let i = 0; i < months; i++) {
    const remainingPrincipal = principal - (monthlyPrincipal * i);
    totalInterest += remainingPrincipal * monthlyRate;
  }

  const totalPayment = principal + totalInterest;

  return {
    monthlyPayment: monthlyPrincipal + principal * monthlyRate,
    totalPayment,
    totalInterest
  };
}
