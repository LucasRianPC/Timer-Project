import styled from "styled-components";

export const HomeContainer = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`






export const StartContdownButton = styled.button`
    width: 100%;
    border: none;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    font-weight: bold;
    cursor: pointer;
    background: ${(props => props.theme['green-500'])};
    color: ${(props) => props.theme['gray-100']};
    &:not(:disabled):hover{
        background: ${(props) => props.theme['green-700']};
    }

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
`





export const StopContdownButton = styled.button`
    width: 100%;
    border: none;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    font-weight: bold;
    cursor: pointer;
    background: ${(props => props.theme['red-500'])};
    color: ${(props) => props.theme['gray-100']};
    &:not(:disabled):hover{
        background: ${(props) => props.theme['red-700']};
    }

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
`