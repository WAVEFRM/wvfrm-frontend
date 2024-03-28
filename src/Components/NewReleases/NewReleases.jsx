import React, { useEffect, useState } from 'react';
import './NewReleases';

const NewReleases = () => {
    const [newReleasesData, setNewReleasesData] = useState([]);
   
    const [access_token, setAccessToken] = useState('');

    useEffect(() => {
        const fetchAccessToken = () => {
            const access_token = window.sessionStorage.getItem('access_token');
            setAccessToken(access_token);
        };

        fetchAccessToken();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response = await fetch('https://api.spotify.com/v1/browse/new-releases?country=US&limit=12&offset=0', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + access_token // Assuming access_token is defined somewhere
                    }
                });
                const data = await response.json();
                setNewReleasesData(data.albums.items);
            } catch (error) {
                console.error('Error fetching new releases:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section id="new_release">
            <div className="heading">
                <h1>New Releases</h1>
            </div>
            <div className="card-deck">
                <div className="row">
                    {newReleasesData.map((album, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-2" id={`card${index}`}>
                            <div className="card">
                                <a href={album.external_urls.spotify}>
                                    <img className="card-img-top" src={album.images[1].url} alt={`Cover for ${album.name}`} />
                                </a>
                                <div className="card-body">
                                    <h5 className="card-title">{album.name}</h5>
                                    <p className="card-text">
                                        {album.artists.map((artist, index) => (
                                            <span key={index}>{artist.name}{index !== album.artists.length - 1 && ', '}</span>
                                        ))}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted"></small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default NewReleases;
