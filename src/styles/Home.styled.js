import styled from "styled-components";

export const Container = styled.div`
    padding: 0;
    max-height: 100vh;
    width: 100%;
`;

export const App = styled.div`
    font-family: sans-serif;
    height: 100vh;
    position: relative;
    display: grid;
    grid-template-columns: 350px 1fr;
    --delay: 500ms;
    user-select: none;
`;

export const Boards = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border: solid 1px rgba(255, 255, 255, 0.5);
    overflow-y: auto;
    padding: 2px;
`;
