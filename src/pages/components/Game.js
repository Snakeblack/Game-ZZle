import { useState } from "react";
import { Dragger, GameBoardHolder } from "../../styles/Game.styled";
import { Commands } from "./Commands";

export const Game = ({props}) => {
    const [board, setBoard] = useState(props);
    const [dragging, setDragging] = useState(false);
    const [clean, setClean] = useState(true);
    const [stack, setStack] = useState([]);
    const [functions, setFunctions] = useState({});
    const [delay, setDelay] = useState(100);
    const { Colors, Items, RobotCol, RobotDir, RobotRow } = board;

    const reset = () => {
        setClean(true);
        setFunctions(functions);
        setStack([]);
        setBoard({props});
    };

    const commandMouseDown = (evt) => {
        const funcnum = evt.target.dataset.funcnum;
        const index = evt.target.dataset.position;
        const position = {
            x: evt.clientX - 15,
            y: evt.clientY - 15,
        };
        setFunctions(() => {

            if (functions[funcum] && functions[funcnum][index]) {
                const { command, color } = functions[funcnum][index];
                setDragging(true);
                document.addEventListener("mousemove", mouseMove);
                document.addEventListener("mouseup", mouseUp);
                return {
                    dragging: {
                        position,
                        command,
                        color,
                    },
                    functions: {
                        ...functions,
                        [funcnum]: functions[funcnum].map((f, i) => {
                            if (i === parseInt(index, 10)) return null;
                            return f;
                        })
                    }
                }
            }
            return {};
        });
    };

    const mouseDown = (position, command, color) => {
        setDragging(true);
        setDragging({
            position: {
                x: position.x - 15,
                y: position.y - 15,
            },
            command,
            color,
        });
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    };

    const mouseMove = (evt) => {
        setDragging({
            ...dragging,
            position: {
                x: dragging.position.x + evt.movementX,
                y: dragging.position.y + evt.movementY,
            },
        });
    };

    const mouseUp = (evt) => {
        document.removeEventListener("mousemove", mouseMove);
        setDragging(false);
        document.removeEventListener("mouseup", mouseUp);
        const funcNum = evt.target.dataset.funcnum;
        const position = parseInt(evt.target.dataset.position, 10);
        if (!funcNum) return setDragging(null);
        const action = {};
        if (dragging.command) action.command = dragging.command;
        if (dragging.color) action.color = dragging.color;
        if (dragging.color === "clear") action.color = null;
        const func = functions[funcNum] || [];
        func[position] = { ...func[position], ...action };
        setFunctions({ ...functions, [funcNum]: func });
        setDragging(null);
    };

    const start = () => {
        reset();
        // Start with F1
        clearTimeout(timeout);
        const starting = functions.f1;
        const stack = [].concat(starting);
        setStack(stack);
        setClean(false);
        setTimeout(runStack, delay);
    };

    const runStack = () => {
        const [state, dispatch] = useReducer(reducer, initialState);
        const { stack, Colors, RobotRow, RobotCol } = state;
        if (stack.length === 0) {
            clearTimeout(this.timeout);
            return;
        }

        const action = stack.shift();
        if (!action) {
            this.runNow();
            return { stack };
        }
        const { command, color } = action;
        const boardColor =
            Colors[parseInt(RobotRow, 10)][parseInt(RobotCol, 10)];

        if (
            !color ||
            (color === "red" && boardColor === "R") ||
            (color === "green" && boardColor === "G") ||
            (color === "blue" && boardColor === "B")
        ) {
            this.performAction(command);
            this.timeout = setTimeout(this.runStack, this.state.delay);
        } else {
            this.runNow();
        }
        return { stack };
    };

    const runNow = () => {
        clearTimeout(timeout);
        timeout = setTimeout(runStack, 0);
    };

    const performAction = action => {
        
    }

    return (
        <>
            <GameBoardHolder>
                {dragging  && (
                    <Dragger
                        style={{
                            transform: `translate(${dragging.position.x}px, ${dragging.position.y}px)`
                        }}
                    >
                        <Commands />
                    </Dragger>
                )}
            </GameBoardHolder>
        </>
    );
};
