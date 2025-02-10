import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  // Testiskenaario: Tarkistaa, että kirjautumislomake näkyy oikein.
  test("renders login form", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    expect(screen.getByText(/sign in with email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
  });

  // Testiskenaario: Testaa onnistunutta kirjautumista oikeilla tunnistetiedoilla.
  test("successful login with email and password", async () => {
    
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: "123" } });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    // Simuloi käyttäjän syöttämää dataa
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText(/sign in with email/i));

    // Tarkista, että käyttäjä kirjautuu onnistuneesti
    expect(await screen.findByText(/welcome back!/i)).toBeInTheDocument();
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), "test@example.com", "password");
  });

  // Testiskenaario: Testaa epäonnistunutta kirjautumista ja virheilmoituksen näyttämistä.
  test("failed login displays error message", async () => {
    
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error("Login failed"));

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    // Simuloi käyttäjän syöttämää virheellistä dataa
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByText(/sign in with email/i));

    // Tarkista, että virheilmoitus näkyy
    expect(await screen.findByText(/login failed/i)).toBeInTheDocument();
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), "test@example.com", "wrongpassword");
  });
});

