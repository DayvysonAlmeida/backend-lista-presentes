const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let presentes = [
    { id: 1, nome: "Fone de Ouvido", reservadoPor: null, link: "https://exemplo.com/fone" },
    { id: 2, nome: "Relógio Smart", reservadoPor: null, link: "https://exemplo.com/relogio" }
];

app.get("/presentes", (req, res) => {
    res.json(presentes);
});

app.post("/reservar", (req, res) => {
    const { id, nomeUsuario } = req.body;
    const presente = presentes.find(p => p.id === id);

    if (presente && !presente.reservadoPor) {
        presente.reservadoPor = nomeUsuario;
        res.json({ mensagem: "Presente reservado com sucesso!" });
    } else {
        res.status(400).json({ mensagem: "Presente já reservado ou inexistente." });
    }
});

const PORT = process.env.PORT || 3001;  // Essa linha já deve estar assim, se não, ajuste
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

