import { render, screen } from '@testing-library/react';
import AlbumCard from './AlbumCard.jsx';

test('show title artist and rating', () => {
render(<AlbumCard title="GUTS" artist="Olivia Rodrigo" listens={2} rating={4.5} />);
expect(screen.getByText('GUTS')).toBeTruthy();
expect(screen.getByText('Olivia Rodrigo')).toBeTruthy();
expect(screen.getByText(/4\.5/)).toBeTruthy();
});

test('show no thoughs for no rating', () => {
render(<AlbumCard title="GUTS" artist="Olivia Rodrigo" listens={2} rating={null} />);

expect(screen.getByText(/No thoughts!/)).toBeTruthy();
});