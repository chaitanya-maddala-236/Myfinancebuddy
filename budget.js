document.addEventListener('DOMContentLoaded', () => {
  const budgetForm = document.getElementById('budgetForm');
  if (budgetForm) {
    budgetForm.addEventListener('submit', (event) => {
      event.preventDefault();
      calculateAndVisualize();
    });
  }
});

function calculateAndVisualize() {
  // Retrieve and parse input values
  const income = parseFloat(document.getElementById('income').value) || 0;
  const fixedExpenses = parseFloat(document.getElementById('fixedExpenses').value) || 0;
  const variableExpenses = parseFloat(document.getElementById('variableExpenses').value) || 0;
  const savings = parseFloat(document.getElementById('savings').value) || 0;
  const investments = parseFloat(document.getElementById('investments').value) || 0;

  // Calculate total expenses and remaining balance
  const totalExpenses = fixedExpenses + variableExpenses;
  const remainingBalance = income - totalExpenses - savings - investments;

  // Prepare data for Chart.js
  const chartData = {
    labels: ['Income', 'Fixed Expenses', 'Variable Expenses', 'Savings', 'Investments', 'Remaining Balance'],
    datasets: [{
      label: 'Budget Breakdown',
      data: [income, fixedExpenses, variableExpenses, savings, investments, remainingBalance],
      backgroundColor: [
        '#00796b',
        '#ff5252',
        '#42a5f5',
        '#ffca28',
        '#66bb6a',
        '#8d6e63'
      ],
      hoverBackgroundColor: [
        '#004d40',
        '#e57373',
        '#1976d2',
        '#ffb300',
        '#388e3c',
        '#6d4c41'
      ]
    }]
  };

  // Create or update the chart
  const ctx = document.getElementById('budgetChart').getContext('2d');
  if (window.budgetChart) {
    window.budgetChart.destroy(); // Destroy the old chart if it exists
  }
  window.budgetChart = new Chart(ctx, {
    type: 'pie',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.raw.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
            }
          }
        }
      }
    }
  });

  // Update summary text with results
  const summaryText = `
    Your total income is ₹${income.toLocaleString()}.
    You have allocated ₹${fixedExpenses.toLocaleString()} for fixed expenses and ₹${variableExpenses.toLocaleString()} for variable expenses.
    You plan to save ₹${savings.toLocaleString()} and invest ₹${investments.toLocaleString()}.
    Your remaining balance is ₹${remainingBalance.toLocaleString()}.
  `;
  document.getElementById('summaryText').innerText = summaryText;
}
