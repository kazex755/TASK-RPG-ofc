import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [contador, setContador] = useState(0);
    const [ativo, setAtivo] = useState(false);
    const [modoEscuro, setModoEscuro] = useState(false);
    const [lista, setLista] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (modoEscuro) {
            document.body.classList.add("modo-escuro");
        } else {
            document.body.classList.remove("modo-escuro");
        }
    }, [modoEscuro]);

    function adicionarTarefa() {
        if (input.trim() === "") {
            alert("Digite alugma tarefa primeiro!");
            return;
        }

        const novaTarefa = {
            id: Date.now(),
            texto: input,
            concluida: false
        };

        setLista([...lista, novaTarefa]);

        setInput("");
    }

    function excluirTarefa(idParaRemover) {
        const listaAtualizada = lista.filter(item => item.id !== idParaRemover);
        setLista(listaAtualizada);
    }

    function alternarConcluida(idParaMudar) {
        const listaAtualizada = lista.map(item => {
            if (item.id === idParaMudar) {
                return { ...item, concluida: !item.concluida };
            }
            return item;
        });
        setLista(listaAtualizada);
    }

    const incrementar = () => {
        setContador(prevContador => {
            return prevContador + 1;
        });
    };

    const diminuir = () => {
        setContador(prevContador => {
            if (prevContador > 0) {
                return prevContador - 1;
            }
            return prevContador;
        });
    };

    const alternaCor = () => {
        setAtivo(prevAtivo => !prevAtivo);
    };

    const modo = () => {
        setModoEscuro(prevModoEscuro => !prevModoEscuro);
    };

    const reset = () => {
        setContador(0);
        setAtivo(false);
        setModoEscuro(false);
    };

    return (
        <div className="container">
            <h1>Contador</h1>
            <p
                style={{
                    color: contador === 0 ? "gray" : "green",
                    fontSize: "24px"
                }}
            >
                {contador}
            </p>
            <button onClick={incrementar}>Aperte para aumentar</button>
            <button onClick={diminuir}>Aperte para diminuir</button>

            <h2>Modo escuro ou claro</h2>
            <button onClick={modo}>
                Mudar para Modo {modoEscuro ? "Claro" : "Escuro"}
            </button>
            <h2>Esse botao vai mudar de cor toda vez que clicar</h2>
            <button
                onClick={alternaCor}
                style={{
                    background: ativo ? "green" : "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                }}
            >
                {ativo ? "ativado" : "desativado"}
            </button>
            <h2>Aperte o botao para resetar tudo</h2>
            <button
                onClick={reset}
                style={{
                    background: "#dc3545",
                    color: "white",
                    border: "none"
                }}
            >
                RESET!!!
            </button>

            <input
                type="text"
                placeholder="O que precisa fazer?"
                value={input}
                onChange={e => setInput(e.target.value)}
            />

            <button onClick={adicionarTarefa}>Adicionar</button>

            <ul>
                {lista.map(item => (
                    <li
                        key={item.id}
                        style={{ margin: "10px 0", listStyle: "none" }}
                    >
                        <span
                            style={{
                                marginRight: "10px",
                                textDecoration: item.concluida
                                    ? "line-through"
                                    : "none",
                                color: item.concluida ? "gray" : "inherit"
                            }}
                        >
                            {item.texto}
                        </span>

                        <button
                            onClick={() => alternarConcluida(item.id)}
                            style={{
                                marginRight: "5px",
                                background: item.concluida
                                    ? "#6c757d"
                                    : "#28a745",
                                color: "white"
                            }}
                        >
                            {""}
                            {item.concluida ? "Desmarcar" : "Concluir"}
                        </button>

                        <button onClick={() => excluirTarefa(item.id)}>
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
            
            <label className="switch">
                 <input type="checkbox" />
                <span className="slider"></span>
            </label>
        </div>
    );
}

export default App;
