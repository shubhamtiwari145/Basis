const error = function error(error, res) {
    let error_message;
    if (typeof error === 'string') {
        error_message = error;
    }
    else if (error.details[0].type === 'string.regex.base') {
        let error_id = error.details[0].message.split(" ");
        error_message = `Invalid ${error_id[0]} ${error.details[0].context.value}`
    }
    else if (error.details[0].path.length > 1) {
        error_message = error.details[0].path[0] + ' ' + error.details[0].message
    }
    else {
        error_message = error.details[0].message
    }
    const response = {
        success: false,
        data: error_message
    }
    res.status(error.status || 400).send(response);
    return;
}

module.exports = error
