const deleteEventOccurances = (ical, events) => {
    let lines = ical.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('DESCRIPTION:') && !events.some(event => lines[i].includes(event))) {
            lines.splice(i-6, 9);
            i-=9;
        }
    }
    lines = lines.join('\n');
    return lines;
}

const getEventsTitles = (ical) => {
    let lines = ical.split('\n');
    // get descriptions only
    lines = lines.filter(line => {return line.startsWith('DESCRIPTION:')});
    // remove duplicates
    lines = lines.filter((line, index) => {return lines.indexOf(line) == index});
    // remove "DESCRIPTION" in front of event name
    lines = lines.map(line => line.replace('DESCRIPTION:', ''));
    // filter name and type only
    /**
         * Regex: matching up to the first occurrence of a character
         * source: https://stackoverflow.com/questions/2013124/regex-matching-up-to-the-first-occurrence-of-a-character
         * 
         * The [^;] is a character class, it matches everything but a semicolon.
         * ^ (start of line anchor) is added to the beginning of the regex so only the first match on each line is captured. T
         * his may or may not be required, depending on whether possible subsequent matches are desired.
    */
    //lines = lines.map(line => {
    //    let regex2 = /(.*,.*)/;
    //    return line.match(/^[^,]*/)[0];
    //});
    return lines;
}


module.exports = {
    deleteEventOccurances, 
    getEventsTitles
}