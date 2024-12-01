import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useMessageModal } from './useMessageModal';
import sendMessage from '../utils/telegramHelper';

jest.mock('../utils/telegramHelper');

const MockComponent = () => {
    const [openModal, ModalComponent] = useMessageModal();
    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            {ModalComponent}
        </div>
    );
};

describe('MessageModal', () => {
    it('opens the modal when button is clicked', () => {
        render(<MockComponent />);
        fireEvent.click(screen.getByText('Open Modal'));
        expect(screen.getByText(/Є зауваження\? Нудно\?/i)).toBeInTheDocument();
    });

    it('displays error when message is empty and tries to send', () => {
        render(<MockComponent />);
        fireEvent.click(screen.getByText('Open Modal'));

        fireEvent.click(screen.getByText(/Відправити/i));
        expect(screen.getByLabelText(/Текст повідомлення/i)).toHaveAttribute('aria-invalid', 'true');
    });

    it('sends message and closes modal with success snackbar', async () => {
        (sendMessage as jest.Mock).mockResolvedValueOnce({});
        render(<MockComponent />);

        // Open the modal
        fireEvent.click(screen.getByText('Open Modal'));
        const messageInput = screen.getByLabelText(/Текст повідомлення/i);
        const contactInput = screen.getByLabelText(/Спосіб зв'язку з тобою/i);

        // Fill out and submit form
        fireEvent.change(messageInput, { target: { value: 'Test message' } });
        fireEvent.change(contactInput, { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByText(/Відправити/i));

        // Wait for snackbar message after successful send
        await waitFor(() => {
            expect(screen.queryByText(/Є зауваження\?/i)).toBeNull();
            expect(screen.getByText(/Повідомлення відправлене/i)).toBeInTheDocument();
        });
    });

    it('closes the modal when clicking outside', () => {
        render(<MockComponent />);

        // Open the modal
        fireEvent.click(screen.getByText('Open Modal'));

        // Simulate clicking outside the modal by pressing Escape
        fireEvent.keyDown(screen.getByText(/Є зауваження\?/i), {
            key: "Escape",
            code: "Escape",
        });

        // Check modal is closed
        const modalContent = screen.queryByText(/Є зауваження\?/i);
        expect(modalContent).toBeNull();
    });
});
