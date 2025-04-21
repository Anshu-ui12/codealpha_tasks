import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { 
  FaPlay, FaPause, FaForward, FaBackward, 
  FaVolumeUp, FaVolumeDown, FaVolumeMute 
} from 'react-icons/fa';

// Sample tracks - in a real app, these would come from your backend
const sampleTracks = [
  {
    id: 1,
    title: "Sample Track 1",
    artist: "Artist 1",
    category: "Pop",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Sample Track 2",
    artist: "Artist 2",
    category: "Rock",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Sample Track 3",
    artist: "Artist 3",
    category: "Jazz",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
];

const MusicPlayer = () => {
  const [tracks] = useState(sampleTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [search, setSearch] = useState('');
  const [filteredTracks, setFilteredTracks] = useState(tracks);
  const audioRef = useRef(new Audio(tracks[0].url));

  useEffect(() => {
    // Filter tracks based on search term
    const filtered = tracks.filter(track => 
      track.title.toLowerCase().includes(search.toLowerCase()) ||
      track.artist.toLowerCase().includes(search.toLowerCase()) ||
      track.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTracks(filtered);
  }, [search, tracks]);

  useEffect(() => {
    // Update audio source when track changes
    audioRef.current.src = tracks[currentTrackIndex].url;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    // Update volume
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentTrackIndex((prev) => 
      prev === tracks.length - 1 ? 0 : prev + 1
    );
  };

  const playPrevious = () => {
    setCurrentTrackIndex((prev) => 
      prev === 0 ? tracks.length - 1 : prev - 1
    );
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleTrackSelect = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    audioRef.current.play();
  };

  return (
    <PlayerContainer>
      <SearchBar
        type="text"
        placeholder="Search tracks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <NowPlaying>
        <h2>{tracks[currentTrackIndex].title}</h2>
        <p>{tracks[currentTrackIndex].artist}</p>
      </NowPlaying>

      <Controls>
        <ControlButton onClick={playPrevious}>
          <FaBackward />
        </ControlButton>
        <ControlButton onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </ControlButton>
        <ControlButton onClick={playNext}>
          <FaForward />
        </ControlButton>
      </Controls>

      <VolumeControl>
        {volume === 0 ? <FaVolumeMute /> : 
         volume < 0.5 ? <FaVolumeDown /> : <FaVolumeUp />}
        <VolumeSlider
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </VolumeControl>

      <PlaylistContainer>
        <h3>Playlist</h3>
        {filteredTracks.map((track, index) => (
          <PlaylistItem
            key={track.id}
            isActive={index === currentTrackIndex}
            onClick={() => handleTrackSelect(index)}
          >
            <div>
              <h4>{track.title}</h4>
              <p>{track.artist}</p>
            </div>
            <span>{track.category}</span>
          </PlaylistItem>
        ))}
      </PlaylistContainer>
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background:rgb(143, 109, 174);
  border-radius: 12px;
  color: white;
`;

const SearchBar = styled.input`
  width: 91%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 6px;
  background:rgb(241, 239, 239);
  color: gray;
  &::placeholder {
    color: #888;
  }
`;

const NowPlaying = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h2 {
    margin: 0;
    color: #fff;
  }
  p {
    margin: 0.5rem 0;
    color: #888;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  &:hover {
    background-color:rgb(126, 128, 185);
  }
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const VolumeSlider = styled.input`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: #555;
  outline: none;
  -webkit-appearance: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
  }
`;

const PlaylistContainer = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
`;

const PlaylistItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  background: ${props => props.isActive ? '#514069' : '#514060'};
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background:rgb(159, 118, 215);
  }

  h4 {
    margin: 0;
    color: ${props => props.isActive ? '#fff' : '#ddd'};
  }

  p {
    margin: 0.2rem 0 0;
    font-size: 0.9rem;
    color: #888;
  }

  span {
    font-size: 0.8rem;
    color: #514069;
    background: #222;
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
  }
`;

export default MusicPlayer;