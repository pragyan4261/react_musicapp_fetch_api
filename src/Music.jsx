import React, { useState } from 'react';

const Music = () => {
  // Define state variables for input value and fetched data
  const [query, setQuery] = useState('');
  const [musicData, setMusicData] = useState(null);

  // Function to fetch music data
  const fetchMusicData = () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '029682c2e3mshef09b9f9dec814ap1e959fjsn006a51ae10f9',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
      },
    };

    fetch(`https://spotify23.p.rapidapi.com/search/?q=${query}`, options)
      .then(response => response.json())
      .then((response) => {
        // Log the response for debugging
        console.log(response);

        // Check if there are any tracks in the response
        if (response.tracks.items.length > 0) {
          const trackID = response.tracks.items[0].data.id;

          // Fetch track data using the track ID
          fetch(`https://spotify23.p.rapidapi.com/tracks/?ids=${trackID}`, options)
            .then(response => response.json())
            .then((trackResponse) => {
              // Log track response for debugging
              console.log(trackResponse);

              // Update the state with the fetched data
              setMusicData(trackResponse);
            })
            .catch(err => console.error(err));
        } else {
          // Handle the case when no tracks are found
          console.log("No tracks found for the query.");
          setMusicData(null); // Clear the musicData state
        }
      })
      .catch(err => console.error(err));
  };

  // Function to handle the search button click
  const handleSearchClick = () => {
    fetchMusicData();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter the music name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" onClick={handleSearchClick}>
        Search
      </button>

      {musicData ? (
        <div>
          <img src={musicData.tracks[0].album.images[0].url} alt="...." />
          <p>{musicData.tracks[0].name}</p>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Music;
