enum CustomerStatus {
  REGISTERING = 'REGISTERING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export type Customer = {
  id: string;
  status: CustomerStatus;
  createdAt: string;
  email: string;
  personalDetails?: {
    firstName: string;
    lastName: string;
    legalName: string;
    gender: Gender;
    dob: Date;
    nationality: string;
  };
  phoneDetails?: {
    countryCode: number;
    number: number;
  };
};

enum GoalStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export type Goal = {
  goalId: string;
  customerId: string;
  createdAt: string;
  name: string;
  targetStockRatio: string;
  status: GoalStatus;
  plans?: Plan[];
};

type CCY = 'SGD' | 'USD';

enum InvestmentInterval {
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMIANNUALLY = 'SEMIANNUALLY',
  ANNUALLY = 'ANNUALLY'
}

export type Plan = {
  customerId: string;
  goalId: string;
  planId: string;
  createdAt: string;
  planCcy: CCY;
  initialInvestmentAmount: number;
  recurringInvestmentSchedule?: {
    interval: InvestmentInterval;
    startingFrom: string;
    amount: number;
  };
  modelPortfolioName: string;
};
