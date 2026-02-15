import React from 'react'

const MonthlyTransactions = ({transactions}) => {
    const monthlyData = transactions.reduce((acc, tx) => {
        const date = new Date(tx.date);

        const monthKey = date.toLocaleString("default", {
            month: "short",
            year: "numeric",
    }); 
    if (!acc[monthKey]){
        acc[monthKey] = {income:0, expense:0}
    }

    if(tx.type === "income"){
        acc[monthKey].income += tx.amount;
    }else{
        acc[monthKey].expense += tx.amount;
    }

    return acc;
}, {});
  return (
    <div className='bg-white p-6 rounded-lg shadow-md w-full mt-6'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Monthly Comparison</h2>

        <table className='w-full text-sm text-left border'>
            <thead className='bg-gray-100'>
                <tr>
                    <th className='p-2 border'>Month</th>
                    <th className='p-2 border text-green-600'>Income</th>
                    <th className='p-2 border text-red-600'>Expense</th>
                    <th className='p-2 border'>Balance</th>
                </tr>               
            </thead>
      <tbody>
        {Object.entries(monthlyData).map(([month, data])=>(
            <tr key={month} className='border'>
                <td>{month}</td>
                <td>₹{data.income}</td>
                <td>₹{data.expense}</td>

                <td className={`p-2 border ${data.income - data.expense >=0 
                    ? "text-green-700"
                    : "text-red-700"
                }`}>
                    ₹{data.income-data.expense}
                </td>
            </tr>
        ))}
      </tbody>
        </table>
    </div>
  )
}

export default MonthlyTransactions