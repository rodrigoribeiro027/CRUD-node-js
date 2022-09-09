import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import ProdutoRoute from './routes/ProdutoRoute.js'


const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(ProdutoRoute);


app.listen(5000,()=>console.log('Servidor esta Rodando'));