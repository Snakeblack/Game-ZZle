import styled from "styled-components";

export const CommandArea = styled.div`
    cursor: grab;
    width: 30px;
    height: 30px;
    margin: 5px;
    border-radius: 20%;
    background-position: center;
    background-repeat: no-repeat;
    background-color: hsla(0, 0%, 70%, 1);
    border: solid 1px hsla(0, 0%, 40%);
    background-size: 70%, 100%;
    background-image: linear-gradient(
        to top,
        hsla(0, 0%, 0%, 0) 0%,
        hsla(0, 0%, 0%, 0.5) 100%
    );
    pointer-events: none;

    &:active {
        cursor: grabbing;
    }
    
    
`;