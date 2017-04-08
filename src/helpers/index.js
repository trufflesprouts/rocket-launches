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
      id: dataCopy.id,
      agencyAbbrev: agency,
      agency: DATA.agenciesDictionary[agency],
      net: dataCopy.net,
      rocket: rocketANDname[0],
      name: rocketANDname[1],
      date: dateANDtime[0]
    }
    return newLaunch
  }

  function cleanLaunchDetailsData(data,agency) {
    const dataCopy = Object.assign({}, data, {}).launches[0]
    let missionName = dataCopy.name.split(' | ')[1]
    let missionDescription = 'No Description'
    if (dataCopy.missions[0]) {
      missionName = dataCopy.missions[0].name
      missionDescription = dataCopy.missions[0].description
    }
    let newLaunch = {
      agency: DATA.agenciesDictionary[agency],
      agencyAbbrev: agency,
      id: dataCopy.id,
      rocket:dataCopy.rocket.name,
      mission: missionName,
      missionDescription: missionDescription,
      date: dataCopy.net,
      net: dataCopy.net,
      location: dataCopy.location.name
    }
    return newLaunch
  }


  function fetcher(cb,url,agency) {
    fetch(url)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status)
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


  function fetchMultipleLaunches(cb,limit, agencies, startdate, enddate) {
    for (let i = 0; i < agencies.length; i++) {
      fetchLaunch(launchCombiner,limit, agencies[i], startdate, enddate)
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
        const slicedLaunches = sortLaunches(combinedResult).slice(0,limit)
        cb(slicedLaunches)
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
    fetcher(cb,url,agency)
  }


  function fetchLaunchDetails(cb,id,agency) {
    let url = `https://launchlibrary.net/1.2/launch/${id}`
    fetcher(handleData,url,agency)
    function handleData(data) {
      const cleanedData = cleanLaunchDetailsData(data, agency)
      cb(cleanedData)
    }
  }


  function pageRefConverter(val) {
    let result
    if (Number.isInteger(val)) {
      if (val === 0) {
        result = '/'
      } else if (val === 1) {
        result = '/search'
      } else if (val === 2) {
        result = '/settings'
      }
    } else {
      if (val === '/') {
        result = 0
      } else if (val === '/search') {
        result = 1
      } else if (val === '/settings') {
        result = 2
      }
    }
    return result
  }

  function getAbsoluteHeight(el) {
    var styles = window.getComputedStyle(el)
    var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom'])

    return Math.ceil(el.offsetHeight + margin)
  }

  return {
    fetchMultipleLaunches: fetchMultipleLaunches,
    fetchLaunchDetails: fetchLaunchDetails,
    pageRefConverter: pageRefConverter,
    getAbsoluteHeight: getAbsoluteHeight
  }
}())


export default h


// if (Number.isInteger(val)) {
//   if (val === 0) {
//     result = '/'
//   } else if (val === 1) {
//     result = '/search'
//   } else if (val === 2) {
//     result = '/settings'
//   }
// } else {
//   if (val === '/') {
//     result = 0
//   } else if (val === '/search') {
//     result = 1
//   } else if (val === '/settings') {
//     result = 2
//   }
// }
