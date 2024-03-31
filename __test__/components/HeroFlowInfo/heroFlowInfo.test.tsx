import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { StarWarsTy } from '@/types/StarWars/StarWars.type';

import hero from '../../api/heroRicOlie.json';
import film from '../../api/filmThePhantomMenace.json';
import starship from '../../api/starshipNabooRoyal.json';
import HeroFlowInfo from '@/components/HeroFlowInfo/HeroFlowInfo';

global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('HeroFlowInfo component', () => {
  const someHero = hero as StarWarsTy.Hero;
  const someFilm = film as StarWarsTy.Film;
  const someStarship = starship as StarWarsTy.StarShip;

  test('renders with provided props', () => {

    const { getByText, container } = render(
      <HeroFlowInfo
        name={someHero.name}
        films={[{ ...someFilm, id: someHero.films[0] }]}
        starships={[{ ...someStarship, id: someHero.starships[0] }]}
      />
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(getByText(someHero.name)).toBeInTheDocument();
    expect(getByText(someFilm.title)).toBeInTheDocument();
    expect(getByText(someStarship.name)).toBeInTheDocument();
  });
});
