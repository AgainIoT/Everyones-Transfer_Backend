const dataToPlace = (floor, line, location) => {
    let place;
    if (line == null) {
        place = `${floor}층 ${location}`;
    } else {
        place = `${floor}층 ${line}호선 ${location}`;
    }

    console.log("[dataToPlace] " + place);
    return place;
};

export { dataToPlace };
