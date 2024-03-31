import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import Pagination from '@/components/Pagination/Pagination';

describe('Pagination component', () => {
  const onPageChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination links correctly', () => {
    const { getByText, getByTestId } = render(
      <Pagination
        pagesCount={10}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />
    );
    
    expect(getByTestId('PreviousBtn')).toBeInTheDocument();

    // Assuming 10 pages are rendered
    for (let i = 1; i <= 10; i++) {
      expect(getByText(i.toString())).toBeInTheDocument();
    }

    expect(getByTestId('NextBtn')).toBeInTheDocument();
  });

  test('calls onPageChange callback when page link is clicked', () => {
    const { getByText } = render(
      <Pagination
        pagesCount={10}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />
    );

    fireEvent.click(getByText('3'));
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  test('disables "Previous" link on first page', () => {
    const { getByTestId } = render(
      <Pagination
        pagesCount={10}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />
    );

    fireEvent.click(getByTestId('PreviousBtn'));
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  test('disables "Next" link on last page', () => {
    const { getByTestId } = render(
      <Pagination
        pagesCount={10}
        currentPage={10}
        onPageChange={onPageChangeMock}
      />
    );

    fireEvent.click(getByTestId('NextBtn'));
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });
});
