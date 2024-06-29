document.addEventListener("DOMContentLoaded", function() {
    const earnings = document.getElementById("earnings").textContent;
    const spending = document.getElementById("spending").textContent;
    const profit = document.getElementById("profit").textContent;
    const loss = document.getElementById("loss").textContent;

    const expenses = document.getElementById("expenses").textContent;
    const revenue = document.getElementById("revenue").textContent;
    const grossProfit = document.getElementById("grossProfit").textContent;

    const ctxTodayProfit = document.getElementById("todayProfitChart").getContext("2d");
    const todayProfitChart = new Chart(ctxTodayProfit, {
        type: 'bar',
        data: {
            labels: ['Earnings', 'Spending', 'Profit', 'Loss'],
            datasets: [{
                label: 'Today\'s Profit',
                data: [earnings, spending, profit, loss],
                backgroundColor: ['#4CAF50', '#f44336', '#2196F3', '#FF9800']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxFinancialSummary = document.getElementById("financialSummaryChart").getContext("2d");
    const financialSummaryChart = new Chart(ctxFinancialSummary, {
        type: 'bar',
        data: {
            labels: ['Expenses', 'Revenue', 'Gross Profit'],
            datasets: [{
                label: 'Financial Summary',
                data: [expenses, revenue, grossProfit],
                backgroundColor: ['#f44336', '#4CAF50', '#FF9800']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById("reportButton").addEventListener("click", function() {
        alert("Report generated!");
    });
});
