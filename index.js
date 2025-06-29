const axios = require('axios')
const dotenv = require('dotenv')
const fs = require('fs')


dotenv.config()
const DATADOG_API_KEY = process.env.API_KEY
const DATADOG_APP_KEY = process.env.APP_KEY

const api_url = process.env.API_URL
const query = process.env.QUERY

function getTime(year, month, day, hour, minute) {
    const date = new Date(year, month - 1, day, hour, minute, 0, 0)
    return Math.floor(date.getTime() / 1000)
}

async function getValues(params) {
    try {
        const response = await axios.get(api_url, {
            params: params,
            headers: {
                'DD-API-KEY': DATADOG_API_KEY,
                'DD-APPLICATION-KEY': DATADOG_APP_KEY,
            },
        });

        return response.data.series[0].pointlist || []
    } catch (error) {
        console.error('Error - ', error.response)
        return [];
    }
}

async function fetchData() {
    const days = new Array()
    const hours = new Array()
    const dailyAverages = new Array()

    for (let i = process.env.DAY_START; i <= process.env.DAY_END; i++) { days.push(i); }
    for (let i = 0; i < 24; i++) { hours.push(i); }

    for (const day of days) {
        for (const hour of hours) {
            const startTime = getTime(2025, process.env.MONTH, day, hour, 0) 
            const endTime = getTime(2025, process.env.MONTH, day, hour + 1, 0)

            const params = {
                from: startTime,
                to: endTime,
                query: query,
                interval: 3600,
            };

            const data = await getValues(params)

            if (data.length > 0) {
                const sum = data.reduce((acc, value) => acc + value[1], 0)
                const average = sum / data.length
                dailyAverages.push({ day, hour, average })
            } else {
                dailyAverages.push({ day, hour, average: 0 });
            }
        }
    }


    dailyAverages.forEach((item) => {
        fs.appendFileSync(`${process.env.FILE}_${process.env.MONTH}.txt`, `Dia ${item.day} ${item.hour}H00 = ${item.average.toFixed()}\n`)
        console.log(`Dia ${item.day} ${item.hour}H00 = ${item.average.toFixed()}`)
    });
}

fetchData()