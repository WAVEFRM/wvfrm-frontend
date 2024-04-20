const aggregateSongs=(songs)=> {
    const aggregated = {};
  
    // Initialize aggregated values
    const keys = [
      "danceability",
      "energy",
      "loudness",
      "speechiness",
      "duration_ms",
      "acousticness",
      "instrumentalness",
      "liveness",
      "valence",
      "tempo",
      "popularity",
    ];
  
    // Calculate the average for each key
    keys.forEach((key) => {
      // Calculate the sum of the key values for all songs
      const sum = songs.reduce((sum, song) => sum + song[key], 0);
      // Calculate the average by dividing the sum by the number of songs
      const average = sum / songs.length;
      // Store the average in the aggregated object with the key suffixed by '_ar' (average)
      aggregated[`${key}_ar`] = average;
    });
  
    return aggregated;
  }

export {aggregateSongs};