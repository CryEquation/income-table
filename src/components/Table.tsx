import React from 'react';
import type { ApiData, Manager, MonthData } from '../types';

interface TableProps {
  data: ApiData;
  startMonthIndex: number;
}

const Table: React.FC<TableProps> = ({ data, startMonthIndex }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const displayedMonths = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (startMonthIndex + i) % 12;
    return {
      name: monthNames[monthIndex],
      monthIndex: monthIndex,
    };
  });

  const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

  const renderDataCell = (monthData: MonthData | null, isIncomeRow = false) => {
    if (!monthData) {
      return (
        <div className="flex h-[56px]">
          <div className="w-1/2 flex flex-col justify-between items-center">
            <div className="text-[#A6B1B9]">No data</div>
            <div className="text-[#A6B1B9] text-xs"></div>
          </div>
          <div className="w-1/2 flex flex-col justify-between items-center">
            <div className="text-[#A6B1B9]">No data</div>
            <div className="text-[#A6B1B9] text-xs"></div>
          </div>
        </div>
      );
    }

    const planIncome = `$ ${numberFormatter.format(monthData.plan.income)}`;
    const factIncome = `$ ${numberFormatter.format(monthData.fact.income)}`;
    const planPartners = monthData.plan.activePartners;
    const factPartners = monthData.fact.activePartners;

    return (
      <div className="flex h-[56px]">
        <div className="w-1/2 flex flex-col justify-between items-center">
          <div className={isIncomeRow ? 'font-bold text-[#202F55] text-base' : 'text-[#202F55] text-base opacity-0'}>
            {isIncomeRow ? planIncome : ''}
          </div>
          <div className={!isIncomeRow ? 'text-[#A6B1B9] text-xs' : 'text-xs opacity-0'}>
            {!isIncomeRow ? planPartners : ''}
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-between items-center">
          <div className={isIncomeRow ? 'font-bold text-[#202F55] text-base' : 'text-[#202F55] text-base opacity-0'}>
            {isIncomeRow ? factIncome : ''}
          </div>
          <div className={!isIncomeRow ? 'text-[#A6B1B9] text-xs' : 'text-xs opacity-0'}>
            {!isIncomeRow ? factPartners : ''}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="border border-[#D6E3EC] bg-white text-sm">
      {/* HEADER ROW */}
      <div className="flex border-b border-[#D6E3EC]">
        <div className="w-[220px] flex-shrink-0 border-r border-[#D6E3EC]"></div>
        <div className="w-[180px] flex-shrink-0 border-r border-[#D6E3EC]"></div>
        {displayedMonths.map(({ name }) => (
          <div key={name} className="flex-1 border-r border-[#D6E3EC] last:border-r-0">
            <div className="p-2 text-center font-medium text-[#202F55]">{name}</div>
            <div className="flex">
              <div className="w-1/2 p-1 text-center text-[#A6B1B9]">Plan:</div>
              <div className="w-1/2 p-1 text-center text-[#A6B1B9]">Fact:</div>
            </div>
          </div>
        ))}
      </div>

      {/* TOTALS ROW */}
      <div className="flex border-b border-[#D6E3EC]">
        <div className="w-[220px] p-4 flex items-center justify-start font-medium text-[#202F55] border-r border-[#D6E3EC] flex-shrink-0">
          Manager
        </div>
        <div className="w-[180px] flex flex-col justify-center p-4 border-r border-[#D6E3EC] flex-shrink-0">
          <p className="font-medium text-[#4F669D]">Total income:</p>
          <p className="mt-5 font-medium text-[#4F669D]">Total active partners:</p>
        </div>
        {displayedMonths.map(({ monthIndex }) => (
          <div key={`total-month-${monthIndex}`} className="flex-1 flex flex-col border-r border-[#D6E3EC] last:border-r-0">
            {renderDataCell(data.total[monthIndex], true)}
            {renderDataCell(data.total[monthIndex], false)}
          </div>
        ))}
      </div>

      {/* MANAGER ROWS */}
      {data.table.map((manager: Manager) => (
        <div key={manager.adminName} className="flex border-b border-[#D6E3EC] last:border-b-0">
          <div className="w-[220px] p-4 flex items-center justify-start font-medium text-[#202F55] border-r border-[#D6E3EC] flex-shrink-0">
            {manager.adminName}
          </div>
          <div className="w-[180px] flex flex-col justify-center p-4 border-r border-[#D6E3EC] flex-shrink-0">
            <p className="text-[#A6B1B9]">Income:</p>
            <p className="mt-5 text-[#A6B1B9]">Active partners:</p>
          </div>
          {displayedMonths.map(({ monthIndex }) => (
            <div key={`${manager.adminName}-month-${monthIndex}`} className="flex-1 flex flex-col border-r border-[#D6E3EC] last:border-r-0">
              {renderDataCell(manager.months[monthIndex], true)}
              {renderDataCell(manager.months[monthIndex], false)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table; 