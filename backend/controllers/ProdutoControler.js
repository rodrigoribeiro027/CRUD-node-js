import Produto from "../models/Produtomodel.js";
import path from "path";
import fs from "fs";


export const GetProdutos = async (req, res) => {
    try {
        const BuscarProdutos = await Produto.findAll();
        res.status(201).json(BuscarProdutos)
    } catch {
        res.status(500).json({ message: error })
    }
}

export const GetProdutoById = async (req, res) => {
    try {
        const BuscarProdutoID = await Produto.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(201).json(BuscarProdutoID)
    } catch {
        res.status(500).json({ message: error })
    }
}
export const SalvarProduto = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "nenhum upload de arquivo" });
    const name = req.body.name;
    const file = req.files.file;
    const fileSize = file.data.lenght;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', 'jpg', '.jpeg'];

    if (allowedType.includes(ext.toLocaleLowerCase()))
        return res.status(422).json({ msg: "Imagen invalida" });
    if (fileSize > 5000000)
        return res.status(422).json({ msg: "imagem deve ser menor que 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err)
            return res.status(500).json({ msg: " error.message" });
        try {
            await Produto.create({ name: name, image: fileName, url: url })
            res.status(201).json({ msg: "Criado Com Sucesso" })
        } catch (error) {
            res.status(500).json({ message: "nenhum dado encontrado" });
        }
    })
}
export const AtualizarProduto = async (req, res) => {
    const produto = await Produto.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!produto) return res.status(404).json({ msg: "nenhum dado encontrado" });
    let fileName = "";
    if(req.files === null){
        fileName = Produto.image;

    }else{
        const file = req.files.file;
        const fileSize = file.data.lenght;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', 'jpg', '.jpeg'];

    if (allowedType.includes(ext.toLocaleLowerCase()))
        return res.status(422).json({ msg: "Imagen invalida" });
    if (fileSize > 5000000)
        return res.status(422).json({ msg: "imagem deve ser menor que 5 MB" });
    
    const filepath = `./public/images/${produto.image}`;
    fs.unlinkSync(filepath);  
    file.mv(`./public/images/${fileName}`,  (err) => {
        if (err)
            return res.status(500).json({ msg: " error.message" });
        
    })
    }
    const name = req.body.name;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try{
        await Produto.update({name:name, image: fileName,url: url},{
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({msg:"Produto Atualizado Com Sucesso."})
    }catch (error){
        console.log(error.message)
    }
}




export const DeletarProduto = async (req, res) => { 
        const produto = await Produto.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!produto) return res.status(404).json({ msg: "nenhum dado encontrado" });
        try {
            const filepath = `./public/images/${produto.image}`;
            fs.unlinkSync(filepath);
            await Produto.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ msg: "Produto deletado Com sucesso" });
        } catch (error){
            res.status(500).json({ message: error });
        }
    

}