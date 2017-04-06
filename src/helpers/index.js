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

  return {
    fetchLaunches: fetchLaunches
  }
}())


export default h
