const extract = (url, type) => {
    const urlparts = url.split('?');
    if (urlparts.length >= 2) {

        const ret = [];
        const pars= urlparts[1].split(/[&;]/g);
        for(let i = 0; i < pars.length; i++) {
            let value = pars[i].split('=')[1];

            if (pars[i].split('=')[1].indexOf(',') >= 0) {
                var subarr = [];
                let subarray = pars[i].split('=')[1].split(',');
                for (var y = 0; y < subarray.length; y++) {
                    subarr.push(parseInt(subarray[y]) ? parseInt(subarray[y]) : subarray[y]);
                }

                value = subarr;
            }

            if (type === 'plain') {
                ret.push(parseInt(value) ? parseInt(value) : value);
            } else {
                if (!Array.isArray(value)) {
                    ret.push({
                        query: pars[i].split('=')[0],
                        value: parseInt(value) ? parseInt(value) : value,
                    });
                } else {
                    ret.push({
                        query: pars[i].split('=')[0],
                        value: value,
                    });
                }
            }
        }

        return ret;

    }

    return null;
}