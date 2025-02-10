import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";

jest.mock("react-firebase-hooks/auth", () => ({
  useAuthState: jest.fn(),
}));

describe("ProtectedRoute", () => {
  // Testiskenaario: Tarkistaa, että luvattomat käyttäjät uudelleenohjataan kirjautumissivulle.
  test("redirects unauthorized users to login", () => {
    
    useAuthState.mockReturnValue([null, false]);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Tarkistaa, että suojattu sisältö ei näy luvattomille käyttäjille.
    expect(screen.queryByText(/protected content/i)).not.toBeInTheDocument();

    // Tarkistaa, ettei lataustilaviesti näy.
    expect(screen.queryByText(/authenticating/i)).not.toBeInTheDocument();
  });

  // Testiskenaario: Tarkistaa, että valtuutetut käyttäjät näkevät suojatun sisällön.
  test("renders children for authorized users", () => {
    
    useAuthState.mockReturnValue([{ uid: "123" }, false]);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Tarkistaa, että suojattu sisältö näkyy valtuutetuille käyttäjille.
    expect(screen.getByText(/protected content/i)).toBeInTheDocument();
  });

  // Testiskenaario: Tarkistaa, että "Authenticating..." viesti näkyy, kun todennustila on latauksessa.
  test("shows loading state when auth state is loading", () => {
    
    useAuthState.mockReturnValue([null, true]);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Tarkistaa, että lataustilaviesti "Authenticating..." näkyy.
    expect(screen.getByText(/authenticating/i)).toBeInTheDocument();
  });
});
