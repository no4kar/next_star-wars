import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import HeroesTable from '@/components/HeroesTable/HeroesTable';
import heroesPage from '../../api/heroesPage.json';
import { StarWarsTy } from '@/types/StarWars/StarWars.type';

// onSelectHeroMock will be used deeper
global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('HeroesTable component', () => {

  const onSelectHeroMock = jest.fn();
  const currentHeroesPageMock = heroesPage as StarWarsTy.Data<StarWarsTy.Hero[]>;
  const selectedHeroMock = currentHeroesPageMock.results[0];

  test('renders table headers correctly', () => {
    const { getByText } = render(
      <HeroesTable
        selectedHero={null}
        currentHeroesPage={currentHeroesPageMock}
        onSelectHero={onSelectHeroMock}
      />
    );

    expect(getByText('Birth Year')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Homeworld')).toBeInTheDocument();
  });

  test('renders hero rows correctly', () => {
    const { getByText } = render(
      <HeroesTable
        selectedHero={null}
        currentHeroesPage={currentHeroesPageMock}
        onSelectHero={onSelectHeroMock}
      />
    );

    for (const { birth_year, name, homeworld } of currentHeroesPageMock.results) {
      expect(getByText(birth_year)).toBeInTheDocument();
      expect(getByText(name)).toBeInTheDocument();
      expect(getByText(String(homeworld))).toBeInTheDocument();
    }
  });

  test('calls onSelectHero callback when hero row is clicked', () => {
    const { getByText } = render(
      <HeroesTable
        selectedHero={null}
        currentHeroesPage={currentHeroesPageMock}
        onSelectHero={onSelectHeroMock}
      />
    );

    fireEvent.click(getByText(currentHeroesPageMock.results[1].name));
    expect(onSelectHeroMock).toHaveBeenCalledWith(currentHeroesPageMock.results[1]);
  });

  test('renders HeroInfo component when hero row is selected', () => {
    const { getByTestId, getByText, getAllByText } = render(
      <HeroesTable
        selectedHero={selectedHeroMock}
        currentHeroesPage={currentHeroesPageMock}
        onSelectHero={onSelectHeroMock}
      />
    );

    expect(getByTestId('HeroInfo')).toBeInTheDocument();

    const { birth_year, name, homeworld } = selectedHeroMock;

    expect(getByText(birth_year)).toBeInTheDocument();
    expect(getAllByText(name)).toHaveLength(2);
    expect(getByText(String(homeworld))).toBeInTheDocument();
  });
});
