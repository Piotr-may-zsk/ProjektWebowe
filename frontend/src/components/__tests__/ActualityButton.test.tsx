import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActualityButton from '../ActualityButton';

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
      ok: true,
      status: 200,
      headers: new Headers(),
      redirected: false,
      statusText: '',
      type: 'default',
      url: '',
      clone: jest.fn(),
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
      text: jest.fn(),
      body: null,
      bodyUsed: false,
    })
  );
  
describe('ActualityButton', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    it('renders correctly when isActive is true', () => {
        const { getByText } = render(<ActualityButton reportId={1} isActive={true} />);
        expect(getByText('Ustaw jako nieaktywne')).toBeInTheDocument();
    });

    it('renders correctly when isActive is false', () => {
        const { getByText } = render(<ActualityButton reportId={1} isActive={false} />);
        expect(getByText('Ustaw jako aktywne')).toBeInTheDocument();
    });

    it('calls fetch with correct parameters when isActive is true and button is clicked', () => {
        const { getByText } = render(<ActualityButton reportId={1} isActive={true} />);
        fireEvent.click(getByText('Ustaw jako nieaktywne'));

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/location/put/1', expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify({ actual: false }),
        }));
    });

    it('calls fetch with correct parameters when isActive is false and button is clicked', () => {
        const { getByText } = render(<ActualityButton reportId={1} isActive={false} />);
        fireEvent.click(getByText('Ustaw jako aktywne'));

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/location/put/1', expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify({ actual: true }),
        }));
    });

    it('handles fetch error when isActive is true and button is clicked', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('API is down'));

        console.error = jest.fn(); // Suppress console error for this test

        const { getByText } = render(<ActualityButton reportId={1} isActive={true} />);
        fireEvent.click(getByText('Ustaw jako nieaktywne'));

        expect(console.error);
    });

    it('handles fetch error when isActive is false and button is clicked', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('API is down'));

        console.error = jest.fn(); 

        const { getByText } = render(<ActualityButton reportId={1} isActive={false} />);
        fireEvent.click(getByText('Ustaw jako aktywne'));

        expect(console.error);
    });
});
