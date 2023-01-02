const cron_jobs = require("node-cron");
const https = require('https');
const CountryModel = require('./models/countryModel');
const StateModel = require('./models/stateModel');
const CityModel = require('./models/cityModel');

function startJobs() {
  console.log("Cron Jobs")
  // testRun();
}


function testRun() {
  console.log('job starteddd');
  let url = "https://raw.githubusercontent.com/ajmanisameer/countries-states-cities-database/master/countries%2Bstates%2Bcities.json";
  https.get(url, (res) => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", () => {
      try {
        let json = JSON.parse(body);
        json.forEach(each => {
          let obj = {
            countryName: each.name,
            countryCode: each.phone_code
          }
          let count = new CountryModel(obj)
          count.save((err, data) => {
            if (err) {
              console.log("bummer country")
            }
            let states = each.states
            states.forEach(state => {
              let sta = {
                stateName: state.name,
                countryId: data._id
              }
              let statestopush = StateModel(sta)
              statestopush.save((err, data1) => {
                if (err) {
                  console.log("bummer state")
                }
                let cities = state.cities
                cities.forEach(eachcity => {
                  let cityobj = {
                    cityName: eachcity.name,
                    stateId: data1._id
                  }

                  let citytopush = CityModel(cityobj)
                  citytopush.save((err, data) => {
                    if (err) {
                      console.log("bummer city")
                    }
                  })

                })


              })

            })
          })
        })

      } catch (error) {
        console.error(error.message);
      };
    });

  }).on("error", (error) => {
    console.error(error.message);
  });



}


module.exports = {
  startJobs: startJobs
};