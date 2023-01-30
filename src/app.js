let timer = false;

let event = null;

const captureForInvirtu = () => {
  
    const screenshotTarget = document.getElementById('bodyContainer');

    if (screenshotTarget) {
        html2canvas(screenshotTarget).then(canvas => {

            canvas.toBlob((blob) => {

                const formData = new FormData();
                formData.append('file', blob, 'screenshot.png');
              
                let url = `https://bw.bingewave.com/events/${BWProperties.event_id}/setMainImage`;

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': angular.element(document.getElementById('jwt_token')).val(),
                    },
                    body: formData
                }).then(function(response) {

                    if (!response.ok) {
                        response.text()
                            .then(text => {
                                throw new Error(text);
                            });
                    }

                    return response.json();
                }).then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                });

            });

        });
    }
};

const captureForGlitch = () => {
  	
    const screenshotTarget = document.getElementById('bodyContainer');

    if (screenshotTarget) {
        html2canvas(screenshotTarget).then(canvas => {

            canvas.toBlob((blob) => {

                if (event && event.preferences && event.preferences.glitch_stream_id && BWProperties.user.account.secure_preferences.glitch_auth_token) {

                    url = `https://api.glitch.fun/api/events/${event.preferences.glitch_stream_id}/uploadMainImage`;

                    const formData = new FormData();
                  	
                    formData.append('image', blob, 'pic123.png');

                   console.log( {
                            'Authorization': 'Bearer ' + BWProperties.user.account.secure_preferences.glitch_auth_token,
                        });
                  
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + BWProperties.user.account.secure_preferences.glitch_auth_token,
                        },
                        body: formData
                    }).then(function(response) {

                        if (!response.ok) {
                            response.text()
                                .then(text => {
                                    throw new Error(text);
                                });
                        }

                        return response.json();
                    }).then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.log(error);
                    });
                }

            });

        });
    }
};

function startTimer() {

    if (!timer) {
        timer = setInterval(function() {
            captureForGlitch();
        }, 60000);
    }

}

function stopTimer() {
    clearInterval(timer);
    timer = false;
}

function init() {
    BWAPI.get(`/events/${BWProperties.event_id}`).then(response => {

        if (response.status == "success") {
            event = response.data;
        }
      
    }).catch(error => {

    });
}

BWEvents.subscribe('broadcasting_started', BWProperties.namespace + '_listener_1', function(response) {
    startTimer();
});

BWEvents.subscribe('broadcasting_stopped', BWProperties.namespace + '_listener_1', function(response) {
    stopTimer();
});

BWEvents.subscribe('broadcasting_error', BWProperties.namespace + '_listener_1', function(response) {
    stopTimer();
});


init();
