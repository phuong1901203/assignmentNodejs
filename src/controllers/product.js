import Joi, { number } from "joi";
import products from "../models/product";

 const productSchema = Joi.object({
    name:Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
    status:Joi.boolean(),
    quality:Joi.number(),
 });

 export const getAll = async (req,res) => {
    try{
        const data = await products.find();
        if(data.length == 0){
            return res.json({
                message:"khong co san pham nao",
            });
        }
        return res.json(data);
    } catch (error){}
 };
 export const get = async (req,res) => {
    try {
        const id = req.params.id;
        const data = await products.findOne({_id:id});
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có sản phẩm",
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
 };
 export const create = async (req, res) => {
    try {
        const body = req.body;
        const {error} = productSchema.validate(body);
        if(error){
            return res.json({
                message: error.details[0].message,
            });
        }
        const { data } = await products.create(body);
        if (data.length === 0) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại",
            });
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
    
        const data = await products.findByIdAndDelete(res.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async (req, res) => {
    try {
        const { data } = await products.findOneAndUpdate({_id:req.params.id},req.body,{
            new: true,
        }
           
        );
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật sản phẩm thất bại",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};