document.getElementById('calculate').addEventListener('click', function() {
    const symbol = document.getElementById('symbol').value;
    const contract = document.getElementById('contract').value;
    const ticks = parseInt(document.getElementById('ticks').value);

    // Establish WebSocket connection
    const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=YOUR_APP_ID');

    ws.onopen = () => {
        // Subscribe to tick stream
        ws.send(JSON.stringify({
            ticks: symbol
        }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.tick) {
            // Process real-time tick data
            console.log(data.tick);
            let percentage = calculatePercentage(data.tick, contract, ticks);
            document.getElementById('result').textContent = `The percentage for ${symbol} with ${contract} contract over ${ticks} ticks is ${percentage.toFixed(2)}%.`;
        }
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    function calculatePercentage(tickData, contract, ticks) {
        // Implement your calculation logic based on real-time tick data
        if (contract === 'over-under' || contract === 'matches-differs') {
            return (Math.random() * 100) / (ticks * 10);
        } else if (contract === 'even-odd') {
            return (Math.random() * 100) / (ticks * 2);
        } else {
            return (Math.random() * 100) / ticks;
        }
    }
});
