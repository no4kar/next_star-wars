import React, { useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Controls
} from 'reactflow';

import { StarWarsTy } from '@/types/StarWars/StarWars.type';
import 'reactflow/dist/style.css';

// Some styles for the banner
const styles = Object.freeze({
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
});

const bannerNode: Node = Object.freeze({
  id: 'helper',
  type: 'input',
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
});

const HeroFlowInfo = ({
  name,
  films,
  starships
}: {
  name: string,
  films: StarWarsTy.FilmWithId[],
  starships: StarWarsTy.StarShipWithId[],
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    // Creating nodes using ids
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

    // Creating edges from hero to each film
    const heroEdges: Edge[] = films.map((film) => ({
      id: `e-hero-movie${film.id}`,
      source: 'hero',
      target: `movie${film.id}`,
    }));

    /* Creating edges from film to starships.
  We need to do a bit of work here, because one starship may appear in different films,
  and in a single film, a hero may use different starships*/
    const filmEdges: Edge[] = [];

    for (const film of films) {
      filmEdges.push(...starships.filter(starship => film.starships.includes(starship.id))
        .map(starship => ({
          id: `e-movie${film.id}-starship${starship.id}`,
          source: `movie${film.id}`,
          target: `starship${starship.id}`,
        })));
    }

    setNodes([
      bannerNode,
      {
        id: 'hero',
        type: 'input',
        style: styles.hero,
        data: { label: name },
        position: { x: 100, y: 5 },
      },
      ...filmNodes,
      ...starshipNodes,
    ]);

    setEdges([
      ...heroEdges,
      ...filmEdges,
    ]);
  }, [name, films, starships]);

  
  console.info(name);
  console.info(films);
  console.info(starships);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
    >
      <Controls
        showInteractive={false}
        position="top-right"
      />
    </ReactFlow>
  );
};

export default HeroFlowInfo;
