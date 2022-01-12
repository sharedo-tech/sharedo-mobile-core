import Vue from 'vue';

// Sets CSS visibility based on truthy
Vue.directive('visible', function (el, binding) {
    el.style.visibility = binding.value ? 'visible' : 'hidden';
});

// Shows date as lag, e.g. "Overdue 3d" or "Due 2w" with appropriate CSS
Vue.directive('lag', {
    bind: function (el, binding) {
        var date = binding.value;
        if (!(date instanceof Date)) return;

        el.innerHTML = getLag(date);
        
        var now = new Date();
        if (now > date)
            el.classList.add("red--text")
    }
});


// === PRIVATE METHODS ===

// Returns "Due/Overdue Xh/Xd/etc"
var getLag = function (date) {
    var now = new Date();

    return now > date
        ? "Overdue " + timeDifference(now, date)
        : "Due " + timeDifference(date, now);
};

// Returns one of: Xm, Xh, Xd, Xw, Xy
var timeDifference = function (current, previous) {

    var format = function(val, scale) {
        return val + scale;
    };

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerWeek = msPerDay * 7;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    // Too small
    // if (elapsed < msPerMinute) {
    //      return Math.round(elapsed/1000) + 's';
    // }
    
    if (elapsed < msPerHour) {
         return format(Math.round(elapsed/msPerMinute), 'm');
    }

    else if (elapsed < msPerDay) {
        return format(Math.round(elapsed / msPerHour), 'h');
    }

    else if (elapsed < msPerWeek) {
        return format(Math.round(elapsed / msPerDay), 'd');
    }

    else if (elapsed < msPerYear) {
        return format(Math.round(elapsed / msPerWeek), 'w');
    }

    // Confused with 'minute'
    // else if (elapsed < msPerYear) {
    //     return format(Math.round(elapsed / msPerMonth), ' month');
    // }

    else {
        return format(Math.round(elapsed / msPerYear), 'y');
    }
};
