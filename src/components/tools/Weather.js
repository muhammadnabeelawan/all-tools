'use client';
import { useState, useEffect } from 'react';

export default function Weather() {
    const [query, setQuery] = useState('New York');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async (city) => {
        setLoading(true);
        try {
            // 1. Get coordinates using geocoding API (Open-Meteo)
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
            const geoData = await geoRes.json();

            if (!geoData.results?.length) throw new Error('City not found');

            const { latitude, longitude, name, country } = geoData.results[0];

            // 2. Get weather data
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
            const weatherData = await weatherRes.json();

            setWeather({
                city: name,
                country,
                temp: weatherData.current_weather.temperature,
                windspeed: weatherData.current_weather.windspeed,
                code: weatherData.current_weather.weathercode,
                daily: weatherData.daily
            });
        } catch (err) {
            alert(err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchWeather('New York');
    }, []);

    const getWeatherIcon = (code) => {
        if (code <= 3) return '☀️'; // Clear/Cloudy
        if (code <= 48) return '🌫️'; // Fog
        if (code <= 67) return '🌦️'; // Rain
        if (code <= 77) return '❄️'; // Snow
        if (code <= 82) return '🌧️'; // Rain showers
        return '⛈️'; // Storm
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>Search City</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input className="input-field" value={query} onChange={e => setQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && fetchWeather(query)} placeholder="e.g. London, Tokyo..." />
                    <button className="btn btn-primary" onClick={() => fetchWeather(query)} disabled={loading}>
                        {loading ? 'Searching...' : '🔍 Search'}
                    </button>
                </div>
            </div>

            {weather && (
                <div className="metric-card" style={{
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    padding: '2.5rem'
                }}>
                    <div style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>{weather.city}, {weather.country}</div>
                    <div style={{ fontSize: '5rem', margin: '1rem 0' }}>{getWeatherIcon(weather.code)}</div>
                    <div style={{ fontSize: '4rem', fontWeight: '800', color: 'var(--text-primary)' }}>{Math.round(weather.temp)}°C</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
                        <span>💨 {weather.windspeed} km/h</span>
                        <span>🌡️ H: {Math.round(weather.daily.temperature_2m_max[0])}° L: {Math.round(weather.daily.temperature_2m_min[0])}°</span>
                    </div>
                </div>
            )}

            {weather && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                    {weather.daily.time.slice(1, 6).map((time, i) => (
                        <div key={time} className="metric-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                {new Date(time).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div style={{ fontSize: '1.5rem' }}>{getWeatherIcon(weather.daily.weathercode[i + 1])}</div>
                            <div style={{ fontWeight: 'bold', marginTop: '8px' }}>{Math.round(weather.daily.temperature_2m_max[i + 1])}°</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
