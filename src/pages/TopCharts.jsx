import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery({
    genre: 'POP',
    limit: '25',
  });

  if (isFetching) return <Loader title="Fetching local songs" />;

  if (error) return <Error />;

  return (

    <section className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left
        mt-4 mb-10"
      >
        Discover Top Charts
      </h2>

      <div className="flex flex-wrap sm:justify-start
      justify-center gap-8"
      >
        {data.tracks?.map((song, index) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={index}
          />
        ))}

      </div>

    </section>

  );
};

export default TopCharts;
