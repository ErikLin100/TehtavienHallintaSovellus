import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodoModal from './AddTodoModal';


const mockOnAddTodo = jest.fn();
const mockOnClose = jest.fn();

const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onAddTodo: mockOnAddTodo,
};

describe('AddTodoModal', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    // Testiskenaario: Testaa, että modaalin voi näyttää ja tehtävä voidaan lisätä onnistuneesti.
    test('renders the modal and allows adding a todo', () => {
        render(<AddTodoModal {...defaultProps} />);

        // Tarkista, että modaali näkyy
        expect(screen.getByText('Add New Task')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Task Title')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();

        // Simuloi käyttäjän syöttämää dataa
        fireEvent.change(screen.getByPlaceholderText('Task Title'), {
            target: { value: 'Test Task' }
        });
        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: 'high' } 
        });
        
        // Aseta tuleva päivämäärä
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1); // Asetetaan huominen päivämäärä
        const futureDateString = futureDate.toISOString().split('T')[0];
        fireEvent.change(screen.getByLabelText(/deadline/i), {
            target: { value: futureDateString }
        });
        fireEvent.change(screen.getByPlaceholderText('Comments (optional)'), {
            target: { value: 'Test comments' }
        });

        // Simuloi lomakkeen lähetys
        fireEvent.click(screen.getByRole('button', { name: /add/i }));

        // Tarkista, että onAddTodo-kutsua käytettiin oikeilla tiedoilla
        expect(mockOnAddTodo).toHaveBeenCalledWith({
            title: 'Test Task',
            priority: 'high',
            deadline: expect.any(Date), // Varmista, että deadline on Date-olio
            comments: 'Test comments'
        });

        // Tarkista, että modaali sulkeutuu tehtävän lisäämisen jälkeen
        expect(mockOnClose).toHaveBeenCalled();
    });

    // Testiskenaario: Testaa, että tehtävää ei voi lisätä ilman otsikkoa.
    test('does not call onAddTodo if title is empty', () => {
        render(<AddTodoModal {...defaultProps} />);

        // Simuloi käyttäjän syöttämää dataa ilman otsikkoa
        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: 'high' }
        });
        
        // Aseta tuleva päivämäärä
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1); // Asetetaan huominen päivämäärä
        const futureDateString = futureDate.toISOString().split('T')[0];
        fireEvent.change(screen.getByLabelText(/deadline/i), {
            target: { value: futureDateString }
        });
        fireEvent.change(screen.getByPlaceholderText('Comments (optional)'), {
            target: { value: 'Test comments' }
        });

        // Simuloi lomakkeen lähetys
        fireEvent.click(screen.getByRole('button', { name: /add/i }));

        // Tarkista, että onAddTodo-kutsua ei käytetty
        expect(mockOnAddTodo).not.toHaveBeenCalled();
    });
});
