import mockData from './mock-data';

export const getEvents = async () => {
    return mockData;
};


/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    // we want to remove any duplicates from the extractLocations array
    var locations = [...new Set(extractLocations)];
    return locations;
  };

  export default extractLocations;
