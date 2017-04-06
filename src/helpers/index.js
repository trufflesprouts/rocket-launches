import moment from 'moment'
import DATA from '../data'

const h = (function() {
  function compareDateTime(dateTimeA, dateTimeB) {
    let momentA = moment(dateTimeA,'MMMM D, YYYY hh:mm:ss')
    let momentB = moment(dateTimeB,'MMMM D, YYYY hh:mm:ss')
    if (momentA > momentB) return 1
    else if (momentA < momentB) return -1
    else return 0
  }
  function compareDateTimeOfLaunch(a,b) {
    return compareDateTime(a.net, b.net)
  }
  function sortLaunches(launches) {
    return launches.sort(compareDateTimeOfLaunch)
  }
  function cleanLaunchData(data,agency) {
    const dataCopy = Object.assign({}, data, {})
    let rocketANDname = dataCopy.name.split(' | ')
    let dateANDtime = dataCopy.net.split(',')
    let newLaunch = {
      agencyAbbrev: agency,
      agency: DATA.agenciesDictionary[agency],
      net: dataCopy.net,
      rocket: rocketANDname[0],
      name: rocketANDname[1],
      date: dateANDtime[0]
    }
    return newLaunch
  }
  function fetchMultipleLaunches(cb,limit, agencies, startdate, enddate) {
    for (let i = 0; i < agencies.length; i++) {
      fetchLaunch(launchCombiner,limit/agencies.length, agencies[i], startdate, enddate)
    }
    let callbacksDone = 0
    let combinedResult = []
    function launchCombiner(data, agency) {
      callbacksDone += 1
      for (let i = 0; i < data.launches.length; i++) {
        const launchCleaned = cleanLaunchData(data.launches[i], agency)
        combinedResult.push(launchCleaned)
      }
      if (callbacksDone === agencies.length) {
        // Final callback, returns to the original fetcher
        cb(sortLaunches(combinedResult))
      }
    }
  }
  function fetchLaunch(cb,limit, agency, startdate, enddate) {
    if (startdate === 'today') {
      startdate = '2017-04-5'
    }
    let url = `https://launchlibrary.net/1.2/launch?agency=${agency}&limit=${limit}&startdate=${startdate}`
    if (enddate) {
      url += `&enddate=${enddate}`
    }
    fetch(url)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status)
          return
        }

        // Examine the text in the response
        response.json().then(function(data) {
          cb(data, agency)
        })
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err)
    })
  }

  function pageRefConverter(val) {
    let result
    if (Number.isInteger(val)) {
      if (val === 0) {
        result = '/'
      } else if (val === 1) {
        result = '/my-feed'
      } else if (val === 2) {
        result = '/search'
      } else if (val === 3) {
        result = '/settings'
      }
    } else {
      if (val === '/') {
        result = 0
      } else if (val === '/my-feed') {
        result = 1
      } else if (val === '/search') {
        result = 2
      } else if (val === '/settings') {
        result = 3
      }
    }
    return result
  }

  return {
    fetchMultipleLaunches: fetchMultipleLaunches,
    fetchLaunch: fetchLaunch,
    pageRefConverter: pageRefConverter
  }
}())


export default h
