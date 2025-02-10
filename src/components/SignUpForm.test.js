import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from './SignUpForm';

jest.mock('../firebase', () => ({
  auth: {}
}));

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn()
}));

describe('SignUpForm', () => {
  // Testiskenaario: Tarkistaa, että kaikki lomakkeen elementit näkyvät oikein.
  test('renders all form elements', () => {
    render(<SignUpForm />);
    
    // Tarkista, että lomakkeen otsikko, sähköposti- ja salasanakentät sekä painike ovat näkyvissä.
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // Testiskenaario: Tarkistaa, että käyttäjä voi syöttää sähköpostin ja salasanan.
  test('allows entering email and password', () => {
    render(<SignUpForm />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    // Syötä arvoja sähköposti- ja salasanakenttiin.
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    
    // Tarkista, että syötetyt arvot tallentuvat oikein.
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('Password123!');
  });

  // Testiskenaario: Tarkistaa, että virheilmoitus näytetään, kun salasana on liian heikko.
  test('shows error message for invalid password', () => {
    render(<SignUpForm />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button');
    
    // Syötä sähköpostiosoite ja liian heikko salasana.
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.click(submitButton);
    
    // Tarkista, että virheilmoitus salasanaa koskien näytetään.
    expect(screen.getByText(/Password must be at least 8 characters/)).toBeInTheDocument();
  });
});
