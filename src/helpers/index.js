const h = (function() {
  function fetchLaunches(limit, agency, startdate, enddate) {
    if (startdate === 'today') {
      startdate = '2017-04-5'
    }
    let url = `https://launchlibrary.ne/1.2/launch?agency=${agency}&limit=${limit}&startdate=${startdate}`
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
          console.log(data)
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
    fetchLaunches: fetchLaunches,
    pageRefConverter: pageRefConverter
  }
}())


export default h
