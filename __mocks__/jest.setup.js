jest.mock("next/image", () => {
    return {
        __esModule: true,
        default: (props) => <img {...props} />
    };
});
  
jest.mock("next/router", () => {
    return {
        __esModule: true,
        useRouter: () => ({
            route: "/",
            pathname: "",
            query: {},
            asPath: "",
            push: jest.fn(),
            replace: jest.fn(),
            reload: jest.fn(),
            back: jest.fn(),
            prefetch: jest.fn(),
            beforePopState: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
                emit: jest.fn(),
            },
        }),
    };
});