var fs = require('fs');

const makeid = () => {
    let result = '';
    const characters = '0123456789abcdef';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 24) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const newData = (name, datestring, conv) => ({
    "date": {
      "$date": datestring
    },
    name,
    "_id": {
      "$oid": makeid()
    },
    "hourlyData": Array.from({length: 24}, () => conv + ((Math.random() - 0.5) * 0.35))
  }
)

const dateString = (date) => date.toISOString();
const addDays = (days) => new Date(1672531200000 + ((days) * 60 * 60 * 24 * 1000));

async function main() {
    let array = [];
    for (let dayOffset = 0; dayOffset < 390; dayOffset++) { 
        const dateString = addDays(dayOffset).toISOString();
        for (const [cur, conv] of [
            ["EUR", 0.85],
            ["USD", 0.79],
            ["TKL", 30.52],
        ]) {
            const data = newData(cur, dateString, conv)
            array.push(data);
        }
    }
    fs.writeFileSync('./data.csv', JSON.stringify(array));
}

main();