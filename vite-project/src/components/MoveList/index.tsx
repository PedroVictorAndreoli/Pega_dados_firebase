// MovieList.tsx
import React, { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '../../firebaseconfig';

interface Movie {
    cast?: string[];
    director?: string;
    genre?: string[];
    plot?: string;
    poster_url?: string;
    rating?: number;
    release_date?: string;
    title?: string;
    original_title?: string;
}

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const moviesRef = ref(database, 'movies');
            const snapshot = await get(moviesRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const movieList = Object.keys(data).map(key => data[key]);
                setMovies(movieList);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            {movies.map((movie, index) => (
                <div key={index}>
                    <h2>{movie.title || movie.original_title || 'Unknown Title'}</h2>
                    <p><strong>Director:</strong> {movie.director || 'N/A'}</p>
                    <p><strong>Cast:</strong> {movie.cast ? movie.cast.join(', ') : 'N/A'}</p>
                    <p><strong>Genre:</strong> {movie.genre ? movie.genre.join(', ') : 'N/A'}</p>
                    <p><strong>Plot:</strong> {movie.plot || 'N/A'}</p>
                    <p><strong>Rating:</strong> {movie.rating !== undefined ? movie.rating : 'N/A'}</p>
                    <p><strong>Release Date:</strong> {movie.release_date || 'N/A'}</p>
                    <img src={movie.poster_url || 'https://example.com/posters/placeholder.jpg'} alt={`${movie.title || movie.original_title || 'Unknown Title'} Poster`} />
                </div>
            ))}
        </div>
    );
};

export default MovieList;