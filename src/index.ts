import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path'
import { ProductTransactionRepository } from './infra/database/pg-promise/repositories/ProductTransactionRepository';
import { CreateProductTransactionUseCase } from './app/usecases/ProductTransaction/CreateProductTransactionUsecase';
import { ConvertFileToProductTransactionUsecase } from './app/usecases/ProductTransaction/ConvertFileToProductTransactionUsecase';
import { ProductTransactionRow } from './domain/interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase';
import { ConvertFileService } from './app/services/file-converter/ConvertFileService';
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }


        let productTransactionRepository: ProductTransactionRepository
        let createProductTransactionUseCase: CreateProductTransactionUseCase
        let convertFileToProductTransactionUsecase: ConvertFileToProductTransactionUsecase
        let fileConverter: ConvertFileService<ProductTransactionRow>

        const filePath = path.join(__dirname, '..', '..', req.file.path);
        fileConverter = new ConvertFileService<ProductTransactionRow>(filePath)
        productTransactionRepository = new ProductTransactionRepository()
        createProductTransactionUseCase = new CreateProductTransactionUseCase(productTransactionRepository)
        convertFileToProductTransactionUsecase = new ConvertFileToProductTransactionUsecase(fileConverter)


        const contentStr = await fileConverter.convertFileToJSON()
        const convertResult = await convertFileToProductTransactionUsecase.handle(contentStr)
        await createProductTransactionUseCase.handle(convertResult.listProductTransaction)
        const productTransactions = await productTransactionRepository.listAll()

        // Remove o arquivo após a conversão
        await fs.unlink(filePath);

        res.json({
            response: productTransactions
        });
    } catch (error) {
        console.error('Erro ao processar o arquivo:', error);
        res.status(500).send('Erro ao processar o arquivo');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})