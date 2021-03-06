import Head from "next/head";
import { useState } from "react";
import { App, Boards, Container } from "../styles/Home.styled";
import boards from "../assets/data/data.json";
import Game from "./components/Game";

const Home = () => {
    const [selected = "285", setSelected] = useState();
    const [dragging, setDragging] = useState(null);
    const [datos] = boards;
    

    const handleOnClick = (dato) => {
      console.log(dato);
      setSelected(dato);
    }

    return (
        <Container>
            <Head>
                <title>GameZzle</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <App
              className={`${dragging ? "dragging" : ""}`}
            >
                <Boards>
                    {boards.map((dato) => (
                        <p
                            key={dato.Id}
                            className={`${
                                dato.Id === selected ? "selected" : "option"
                            }`}
                            onClick={() => handleOnClick(dato.Id)}
                        >
                            {dato.Title}
                        </p>
                    ))}
                </Boards>
                {selected && (
                  <Game
                    datos={ boards }
                    key={selected}
                    setDragging={which => setDragging({
                      dragging: which
                    })}
                    board={boards.find(b => b.Id === selected)}
                  />
                )}
            </App>
        </Container>
    );
};

export default Home;
