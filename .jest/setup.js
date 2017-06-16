const arrayItemsMatching = function () {
    return {
        compare: function (actual, regex) {
            let pass = true;
            if (!Array.isArray(actual)) pass = false;
            actual.forEach((a) => {
                if (a.match(regex) === null) pass = false;
            });
            return {
                pass,
            };
        }
    }
}

jasmine.addMatchers({
    arrayItemsMatching,
})