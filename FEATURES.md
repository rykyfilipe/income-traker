# Income Tracker - Complete Dashboard

## 🎯 Funcționalități Implementate

### 1. **Dashboard Complet cu 5 Tabele**
- ✅ **Income Table**: Name, Payday, Amount
- ✅ **Bills Table**: Name, Budget, Amount  
- ✅ **Expenses Table**: Name, Budget, Amount
- ✅ **Debt Table**: Name, Budget, Amount
- ✅ **Savings Table**: Name, Budget, Amount

### 2. **Header Cards Calculate Automat**
Valorile se calculează dinamic din toate tabelele:
- **Left to Spend**: Total Income - Total Expenses (Bills + Expenses + Debt)
- **Total Expenses**: Suma tuturor cheltuielilor reale (Bills + Expenses + Debt)
- **Available to Budget**: Income - All Expenses - Savings

### 3. **Charts Dinamice**

#### 📊 **Line Chart - Income Trend**
- Arată trendul income-ului pe ultimele 6 luni
- Se actualizează automat când modifici datele de income

#### 🍩 **Pie Chart - Balance Overview**
- Donut chart cu toate categoriile de bills și expenses
- Afișează procentul fiecărei categorii
- Legende cu procente
- Culori diferite pentru fiecare categorie

#### 📊 **Bar Chart - Budget vs Actual**
- Compară Budget-ul planificat cu cheltuielile reale
- Categorii: Savings, Bills, Expenses, Debt
- Două bare pentru fiecare categorie (Budget și Actual)

#### 🍩 **Pie Chart - Spending Overview**
- Distribuția generală a cheltuielilor
- Bills, Expenses, Debt, Savings
- Procente și culori

### 4. **Tabele Inteligente**
- ✅ **Auto-fill**: Tabelele se umplu automat cu rânduri goale până la marginea containerului
- ✅ **Responsive**: Se ajustează la resize
- ✅ **Total Row**: Fiecare tabel are un rând de total la final
- ✅ **Inputuri editabile**: Toate câmpurile pot fi modificate
- ✅ **Calcul automat**: Totalurile se actualizează în timp real

### 5. **Month Selector**
- ✅ Afișează luna curentă automat
- ✅ Design cu accent color

### 6. **Layout Perfect**
```
┌─────────────────────────────────────────┐
│           Month Card (January)          │
├─────────┬─────────┬─────────┬───────────┤
│ Left to │ Total   │Available│           │
│ Spend   │Expenses │to Budget│           │
├─────────┼─────────┼─────────┼───────────┤
│ Income  │ Balance │ Budget  │ Spending  │
│ Chart   │Overview │vs Actual│ Overview  │
├─────────┼─────────┼─────────┼───────────┤
│ Income  │ Bills   │Expenses │   Debt    │
│ Table   │ Table   │ Table   │   Table   │
├─────────┴─────────┴─────────┴───────────┤
│          Savings Table                  │
└─────────────────────────────────────────┘
```

## 🚀 Cum Funcționează

### Adaugă Date:
1. Completează câmpurile în orice tabel
2. Toate calculele se actualizează automat
3. Charts se regenerează instant
4. Totalurile se recalculează

### Flow de Date:
```
User Input (Tabele)
    ↓
useState (5 tabele separate)
    ↓
useMemo (calcule automate)
    ↓
Headers + Charts + Totals
    ↓
UI actualizat în timp real
```

## 💡 Calcule Automate

### Headers:
- **Left to Spend** = Total Income - (Total Bills + Total Expenses + Total Debt)
- **Total Expenses** = Total Bills + Total Expenses + Total Debt
- **Available to Budget** = Total Income - Total Expenses - Total Savings

### Charts:
- **Income Trend**: Distribuie income-ul pe 6 luni
- **Balance Overview**: Toate categoriile individuale cu procente
- **Budget vs Actual**: Compară planul cu realitatea
- **Spending Overview**: Distribuție generală pe categorii majore

### Table Totals:
- Fiecare coloană numerică (Amount, Budget) are total automat
- Se actualizează la fiecare modificare

## 🎨 Features Extra
- ✅ **Type Safety**: TypeScript pentru toate datele
- ✅ **Performance**: useMemo pentru re-render optim
- ✅ **Responsive Tables**: Se adaptează la spațiul disponibil
- ✅ **Real-time Updates**: Toate datele se sincronizează instant
- ✅ **Professional UI**: Layout ca în imagine
- ✅ **Color Coding**: Culori distincte pentru fiecare categorie
- ✅ **Legends with Percentages**: Charts cu informații complete

## 📊 Structura Componentelor

```
App.tsx
├── MonthCard
├── HeaderCard (x3)
├── ChartCard (Income Line)
├── PieChartCard (Balance Overview)
├── BarChartCard (Budget vs Actual)
├── PieChartCard (Spending Overview)
├── Table (Income)
├── Table (Bills)
├── Table (Expenses)
├── Table (Debt)
└── Table (Savings)
```

## 🔥 Tehnologii
- React + TypeScript
- Chart.js + react-chartjs-2
- CSS Grid Layout
- useMemo pentru performance
- useState pentru state management
