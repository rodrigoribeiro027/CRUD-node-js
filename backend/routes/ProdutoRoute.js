import  express  from "express";
import { GetProdutos,AtualizarProduto,DeletarProduto,GetProdutoById,SalvarProduto} from "../controllers/ProdutoControler.js";

const router = express.Router();

router.get('/produtos',GetProdutos)
router.put('/AtualizarProduto/:id',AtualizarProduto)
router.get('/produtos/:id',GetProdutoById)
router.post('/SalvarProduto',SalvarProduto)
router.delete('/DeletarProduto/:id',DeletarProduto)

export default router;
