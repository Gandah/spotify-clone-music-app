import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();

  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData,
    isFetching: isFetchingSongDetails,
  } = useGetSongDetailsQuery({ songid });
  const { data,
    isFetching: isFetchingRelatedSongs, error,
  } = useGetSongRelatedQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs) { return <Loader title="Fetching song details" />; }

  if (error) return <Error />;

  return (
    <section className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>

        <div className="mt-5">
          {
            /* Checks whether object conatins lyrics if yes renders it line by line
             if no displays an error message */
            songData?.sections[1]?.type === 'LYRICS'
              ? songData?.sections[1].text.map((Line, i) => (
                <p
                  key={i}
                  className="text-blue-400 text-base my-1"
                >{Line}
                </p>
              )) : (<p className="text-yellow-600 text-base my-1">Sorry, Lyrics not available!</p>)
          }
        </div>
      </div>

      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}

      />
    </section>
  );
};

export default SongDetails;
