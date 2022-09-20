
    let id;
    let target;
    let options;

    function success(pos) {
        const crd = pos.coords;

        console.log(crd)
    }

    function error(err) {
        console.error(`ERROR(${err.code}): ${err.message}`);
    }

    options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
    };