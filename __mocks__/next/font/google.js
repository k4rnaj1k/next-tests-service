module.exports = {
    Roboto: jest.fn(() => ({
        style: {
            fontFamily: '"Roboto", sans-serif',
        },
    })),
    Inter: jest.fn(() => ({
        className: 'inter', // Має бути застосовано саме цей клас
        style: { fontFamily: 'Inter' },
    })),
};
