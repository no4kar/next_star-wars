import { getFilmById, getStarshipById } from '@/api/starWars.api';
import { StarWarsFilmWithId, StarWarsHero, StarWarsStarshipWithId } from '@/types/StarWars/StarWars.type';
import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
} from 'reactflow';

import 'reactflow/dist/style.css';

const styles = {
  hero: {
    background: '#fdba74',
    color: 'white',
    width: 100,
  },
  movie: {
    background: '#63B3ED',
    color: 'white',
    width: 100,
  },
  starship: {
    background: '#10b981',
    color: 'white',
    width: 100,
  },
};

const helperNode: Node = {
  id: 'helper',
  type: 'default',
  style: { width: 'fit-content', border: 'none', },
  data: {
    label: (
      <div className='flex flex-col w-min'>
        <strong style={{ color: styles.hero.background }}>Hero</strong>
        <strong style={{ color: styles.movie.background }}>Movie</strong>
        <strong style={{ color: styles.starship.background }}>Starship</strong>
      </div>
    ),
  },
  draggable: false,
  selectable: false,
  position: { x: 0, y: 0 },
};

const HeroFlowInfo = ({
  hero,
}: {
  hero: StarWarsHero,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);


  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  useEffect(() => {
    (async function () {

      const films: StarWarsFilmWithId[] = [];
      const starships: StarWarsStarshipWithId[] = [];

      for (const id of hero.films) {
        const film = await getFilmById(id).catch(() => null);
        if (film) {
          films.push({ ...film, id });
        }
      }

      for (const id of hero.starships) {
        const starship = await getStarshipById(id).catch(() => null);

        if (starship) {
          starships.push({ ...starship, id });
        }
      }

      const filmNodes: Node[] = films.map((film, i) => ({
        id: `movie${film.id}`,
        style: styles.movie,
        data: { label: film.title },
        position: { x: (i * 100), y: 100 },
      }));

      const starshipNodes: Node[] = starships.map((starship, i) => ({
        id: `starship${starship.id}`,
        type: 'output',
        style: styles.starship,
        data: { label: starship.name },
        position: { x: (i * 100), y: 200 },
      }));

      const heroEdges: Edge[] = films.map((film) => ({
        id: `e-hero-movie${film.id}`,
        source: 'hero',
        target: `movie${film.id}`,
      }));

      const filmEdges: Edge[] = [];

      for (const film of films) {
        filmEdges.push(...starships.filter(starship => film.starships.includes(starship.id))
          .map(starship => ({
            id: `e-movie${film.id}-starship${starship.id}`,
            source: `movie${film.id}`,
            target: `starship${starship.id}`,
          })));
      }

      // console.info(films);
      // console.info(starships);
      // console.info(filmEdges);

      setNodes([
        helperNode,
        {
          id: 'hero',
          type: 'input',
          style: styles.hero,
          data: { label: hero.name },
          position: { x: 100, y: 5 },
        },
        ...filmNodes,
        ...starshipNodes,
      ]);

      setEdges([
        ...heroEdges,
        ...filmEdges,
      ]);
    })();

  }, [hero]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      // onInit={onInit}
      fitView
    >
    </ReactFlow>
  );
};

export default React.memo(HeroFlowInfo,
  (prevProps, nextProps) => prevProps.hero.name === nextProps.hero.name,
);