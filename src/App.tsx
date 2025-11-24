import { useState, useMemo } from 'react';
import './App.css';
import ChartCard from './components/chartCard/ChartCard';
import PieChartCard from './components/pieChartCard/PieChartCard';
import BarChartCard from './components/barChartCard/BarChartCard';
import HeaderCard from './components/headerCard/HeaderCard';
import MonthCard from './components/monthCard/MonthCard';
import Table from './components/table/Table';
import ColorPicker from './components/colorPicker/ColorPicker';
import { useTheme } from './context/ThemeContext';
import type { IncomeEntry, BillEntry, ExpenseEntry, DebtEntry, SavingsEntry } from './types';

function App() {
  const { colors } = useTheme();
  
  // Initialize with one empty row for each table
  const [incomeData, setIncomeData] = useState<IncomeEntry[]>([
    { Name: '', Amount: 0 }
  ]);
  const [billData, setBillData] = useState<BillEntry[]>([
    { Name: '', Budget: 0, Amount: 0 }
  ]);
  const [expenseData, setExpenseData] = useState<ExpenseEntry[]>([
    { Name: '', Budget: 0, Amount: 0 }
  ]);
  const [debtData, setDebtData] = useState<DebtEntry[]>([
    { Name: '', Budget: 0, Amount: 0 }
  ]);
  const [savingsData, setSavingsData] = useState<SavingsEntry[]>([
    { Name: '', Budget: 0, Amount: 0 }
  ]);

  // Calculate totals dynamically
  const totalIncome = useMemo(() => {
    return incomeData.reduce((sum, entry) => sum + (entry.Amount || 0), 0);
  }, [incomeData]);

  const totalBills = useMemo(() => {
    return billData.reduce((sum, entry) => sum + (entry.Amount || 0), 0);
  }, [billData]);

  const totalExpenses = useMemo(() => {
    return expenseData.reduce((sum, entry) => sum + (entry.Amount || 0), 0);
  }, [expenseData]);

  const totalDebt = useMemo(() => {
    return debtData.reduce((sum, entry) => sum + (entry.Amount || 0), 0);
  }, [debtData]);

  const totalSavings = useMemo(() => {
    return savingsData.reduce((sum, entry) => sum + (entry.Amount || 0), 0);
  }, [savingsData]);

  const totalBudgetBills = useMemo(() => {
    return billData.reduce((sum, entry) => sum + (entry.Budget || 0), 0);
  }, [billData]);

  const totalBudgetExpenses = useMemo(() => {
    return expenseData.reduce((sum, entry) => sum + (entry.Budget || 0), 0);
  }, [expenseData]);

  const totalBudgetDebt = useMemo(() => {
    return debtData.reduce((sum, entry) => sum + (entry.Budget || 0), 0);
  }, [debtData]);

  const totalBudgetSavings = useMemo(() => {
    return savingsData.reduce((sum, entry) => sum + (entry.Budget || 0), 0);
  }, [savingsData]);

  // All actual spending
  const totalAllExpenses = useMemo(() => {
    return totalBills + totalExpenses + totalDebt;
  }, [totalBills, totalExpenses, totalDebt]);

  // Net Income = Income - All expenses (before savings)
  const netIncome = useMemo(() => {
    return totalIncome - totalAllExpenses;
  }, [totalIncome, totalAllExpenses]);

  // Disposable Income = Income - All expenses - Savings (discretionary funds)
  const disposableIncome = useMemo(() => {
    return totalIncome - totalAllExpenses - totalSavings;
  }, [totalIncome, totalAllExpenses, totalSavings]);

  // Dynamic header cards
  const headerCards = useMemo(() => [
    {
      name: 'Net Income',
      sold: netIncome,
    },
    {
      name: 'Total Expenses',
      sold: totalAllExpenses,
    },
    {
      name: 'Disposable Income',
      sold: disposableIncome,
    },
  ], [netIncome, totalAllExpenses, disposableIncome]);

  // Calculate monthly data for charts (last 6 months)
  const chartCards = useMemo(() => {
    // Income chart - show each income source as a separate line
    const incomeCategories = incomeData
      .filter(entry => entry.Name && entry.Amount > 0)
      .map(entry => ({
        name: entry.Name,
        data: [entry.Amount], // Single data point for now (can expand to monthly history later)
      }));

    return incomeCategories.length > 0 
      ? incomeCategories 
      : [{ name: 'No Income Data', data: [0] }];
  }, [incomeData]);

  // Balance Overview - Pie chart data
  const balanceOverviewData = useMemo(() => {
    const colorPalette = [
      colors.primary,
      colors.secondary,
      colors.accent,
      '#DDA0DD',
      '#EE82EE',
      '#FF00FF',
      '#8B008B',
      '#9932CC',
    ];

    const categories = [
      ...billData.filter(b => b.Name && b.Amount > 0).map((b, i) => ({ label: b.Name, value: b.Amount, color: colorPalette[i % colorPalette.length] })),
      ...expenseData.filter(e => e.Name && e.Amount > 0).map((e, i) => ({ label: e.Name, value: e.Amount, color: colorPalette[(billData.length + i) % colorPalette.length] })),
    ];

    return categories.length > 0 ? categories : [{ label: 'No Data', value: 1, color: '#DDD' }];
  }, [billData, expenseData, colors]);

  // Spending Overview - Pie chart data
  const spendingOverviewData = useMemo(() => {
    return [
      { label: 'Bills', value: totalBills, color: colors.primary },
      { label: 'Expenses', value: totalExpenses, color: colors.secondary },
      { label: 'Debt', value: totalDebt, color: colors.accent },
      { label: 'Savings', value: totalSavings, color: '#DDA0DD' },
    ].filter(item => item.value > 0);
  }, [totalBills, totalExpenses, totalDebt, totalSavings, colors]);

  // Budget vs Actual data
  const budgetVsActualCategories = useMemo(() => {
    return ['Savings', 'Bills', 'Expenses', 'Debt'];
  }, []);

  const budgetVsActualBudget = useMemo(() => {
    return [totalBudgetSavings, totalBudgetBills, totalBudgetExpenses, totalBudgetDebt];
  }, [totalBudgetSavings, totalBudgetBills, totalBudgetExpenses, totalBudgetDebt]);

  const budgetVsActualActual = useMemo(() => {
    return [totalSavings, totalBills, totalExpenses, totalDebt];
  }, [totalSavings, totalBills, totalExpenses, totalDebt]);

  // Update income data - simplified without dynamic row logic
  const updateIncomeData = (rowIndex: number, column: string, value: string) => {
    setIncomeData(prevData => {
      const newData = [...prevData];
      
      // Ensure the array is large enough
      while (newData.length <= rowIndex) {
        newData.push({ Name: '', Amount: 0 });
      }
      
      const parsedValue = (column === 'Amount') ? (Number(value) || 0) : value;
      newData[rowIndex] = {
        ...newData[rowIndex],
        [column]: parsedValue
      };

      // Remove empty rows except keep one empty row at the end
      const filteredData = newData.filter((row, index) => {
        const hasData = row.Name || row.Amount;
        // Keep row if it has data, or if it's the last row
        return hasData || index === newData.length - 1;
      });

      // If all rows have data (no empty row at end), add one
      const lastRow = filteredData[filteredData.length - 1];
      const lastHasData = lastRow && (lastRow.Name || lastRow.Amount);
      if (lastHasData) {
        filteredData.push({ Name: '', Amount: 0 });
      }

      // Ensure at least one row
      if (filteredData.length === 0) {
        filteredData.push({ Name: '', Amount: 0 });
      }

      return filteredData;
    });
  };

  // Update expense data - simplified without dynamic row logic
  const updateExpenseData = (rowIndex: number, column: string, value: string) => {
    setExpenseData(prevData => {
      const newData = [...prevData];
      
      // Ensure the array is large enough
      while (newData.length <= rowIndex) {
        newData.push({ Name: '', Budget: 0, Amount: 0 });
      }
      
      const parsedValue = (column === 'Budget' || column === 'Amount') ? (Number(value) || 0) : value;
      newData[rowIndex] = {
        ...newData[rowIndex],
        [column]: parsedValue
      };

      // Remove empty rows except keep one empty row at the end
      const filteredData = newData.filter((row, index) => {
        const hasData = row.Name || row.Budget || row.Amount;
        return hasData || index === newData.length - 1;
      });

      // If all rows have data (no empty row at end), add one
      const lastRow = filteredData[filteredData.length - 1];
      const lastHasData = lastRow && (lastRow.Name || lastRow.Budget || lastRow.Amount);
      if (lastHasData) {
        filteredData.push({ Name: '', Budget: 0, Amount: 0 });
      }

      // Ensure at least one row
      if (filteredData.length === 0) {
        filteredData.push({ Name: '', Budget: 0, Amount: 0 });
      }

      return filteredData;
    });
  };

  // Update bill data
  const updateBillData = (rowIndex: number, column: string, value: string) => {
    setBillData(prevData => {
      const newData = [...prevData];
      
      while (newData.length <= rowIndex) {
        newData.push({ Name: '', Budget: 0, Amount: 0 });
      }
      
      const parsedValue = (column === 'Budget' || column === 'Amount') ? (Number(value) || 0) : value;
      newData[rowIndex] = {
        ...newData[rowIndex],
        [column]: parsedValue
      };

      // Remove empty rows except keep one empty row at the end
      const filteredData = newData.filter((row, index) => {
        const hasData = row.Name || row.Budget || row.Amount;
        return hasData || index === newData.length - 1;
      });

      // If all rows have data (no empty row at end), add one
      const lastRow = filteredData[filteredData.length - 1];
      const lastHasData = lastRow && (lastRow.Name || lastRow.Budget || lastRow.Amount);
      if (lastHasData) {
        filteredData.push({ Name: '', Budget: 0, Amount: 0 });
      }

      // Ensure at least one row
      if (filteredData.length === 0) {
        filteredData.push({ Name: '', Budget: 0, Amount: 0 });
      }

      return filteredData;
    });
  };

  // Update debt data
  const updateDebtData = (rowIndex: number, column: string, value: string) => {
    setDebtData(prevData => {
      const newData = [...prevData];
      
      while (newData.length <= rowIndex) {
        newData.push({ Name: '', Budget: 0, Amount: 0 });
      }
      
      const parsedValue = (column === 'Budget' || column === 'Amount') ? (Number(value) || 0) : value;
      newData[rowIndex] = {
        ...newData[rowIndex],
        [column]: parsedValue
      };

      // Remove empty rows except keep one empty row at the end
      const filteredData = newData.filter((row, index) => {
        const hasData = row.Name || row.Budget || row.Amount;
        return hasData || index === newData.length - 1;
      });

      // If all rows have data (no empty row at end), add one
      const lastRow = filteredData[filteredData.length - 1];
      const lastHasData = lastRow && (lastRow.Name || lastRow.Budget || lastRow.Amount);
      if (lastHasData) {
        filteredData.push({ Name: '', Budget: 0, Amount: 0 });
      }

      // Ensure at least one row
      if (filteredData.length === 0) {
        filteredData.push({ Name: '', Budget: 0, Amount: 0 });
      }

      return filteredData;
    });
  };

  // Update savings data
  const updateSavingsData = (rowIndex: number, column: string, value: string) => {
    setSavingsData(prevData => {
      const newData = [...prevData];
      
      while (newData.length <= rowIndex) {
        newData.push({ Name: '', Budget: 0, Amount: 0 });
      }
      
      const parsedValue = (column === 'Budget' || column === 'Amount') ? (Number(value) || 0) : value;
      newData[rowIndex] = {
        ...newData[rowIndex],
        [column]: parsedValue
      };

      // Remove empty rows except keep one empty row at the end
      const filteredData = newData.filter((row, index) => {
        const hasData = row.Name || row.Budget || row.Amount;
        return hasData || index === newData.length - 1;
      });

      // If all rows have data (no empty row at end), add one
      const lastRow = filteredData[filteredData.length - 1];
      const lastHasData = lastRow && (lastRow.Name || lastRow.Budget || lastRow.Amount);
      if (lastHasData) {
        filteredData.push({ Name: '', Budget: 0, Amount: 0 });
      }

      // Ensure at least one row
      if (filteredData.length === 0) {
        filteredData.push({ Name: '', Budget: 0, Amount: 0 });
      }

      return filteredData;
    });
  };

  return (
    <div className="main-container">
      <ColorPicker />
      
      <MonthCard />

      {headerCards.map((card, index) => (
        <HeaderCard  
          key={index} 
          name={card.name} 
          sold={card.sold}
        />
      ))}

      <ChartCard 
        name="Income Sources" 
        datasets={chartCards}
      />

      <PieChartCard 
        name="Balance Overview"
        data={balanceOverviewData}
      />

      <BarChartCard 
        name="Budget (Left) vs Actual (Right)"
        categories={budgetVsActualCategories}
        budgetData={budgetVsActualBudget}
        actualData={budgetVsActualActual}
      />

      <PieChartCard 
        name="Spending Overview"
        data={spendingOverviewData}
      />

      <Table 
        key="income"
        name="Income" 
        columns={['Name', 'Amount']} 
        data={incomeData}
        onUpdate={(rowIndex, column, value) => updateIncomeData(rowIndex, column, value)}
      />

      <Table 
        key="bills"
        name="Bills" 
        columns={['Name', 'Budget', 'Amount']} 
        data={billData}
        onUpdate={(rowIndex, column, value) => updateBillData(rowIndex, column, value)}
      />

      <Table 
        key="expenses"
        name="Expenses" 
        columns={['Name', 'Budget', 'Amount']} 
        data={expenseData}
        onUpdate={(rowIndex, column, value) => updateExpenseData(rowIndex, column, value)}
      />

      <Table 
        key="debt"
        name="Debt" 
        columns={['Name', 'Budget', 'Amount']} 
        data={debtData}
        onUpdate={(rowIndex, column, value) => updateDebtData(rowIndex, column, value)}
      />

      <Table 
        key="savings"
        name="Savings" 
        columns={['Name', 'Budget', 'Amount']} 
        data={savingsData}
        onUpdate={(rowIndex, column, value) => updateSavingsData(rowIndex, column, value)}
      />

    </div>
  )
}

export default App
