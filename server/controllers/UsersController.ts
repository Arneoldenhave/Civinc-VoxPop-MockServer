import ResponseHandler from './../../utils/ResponseHandler';
import Users from './../models/Users/UsersModel';

export default class UsersController {

    responseHandler = ResponseHandler
    model = Users

    async create(req: any, res: any, next: any) {
        const { setup } = req.body;
                    
        if (!setup){
            this.responseHandler.badRequest(res);
        };
        try {
            let event = await this.model.create(setup);
            let saved = await event.save();
            this.responseHandler.ok(saved);
        } catch(err) {
            this.responseHandler.internalServerError(err);
        };
    };

    async findById(req: any, res: any, next: any) {
        const { id } = req.params;
        if (!id) {
            this.responseHandler.badRequest(res);
        };
        try {
            let found = await this.model.findById(id);
            if (!found) {
                this.responseHandler.notFound(res);
            }
            this.responseHandler.ok(found);
        } catch(err) {
            this.responseHandler.internalServerError(err);
        };
    };

    async updateById(req: any, res: any, next: any) {
        const { id } = req.params;
        const update = req.body;
        if (!id || update) {
            this.responseHandler.badRequest(res);
        };
        try {
            this.model.update({_id: id}, update);
            this.responseHandler.ok(res);
        } catch(err) {
            this.responseHandler.internalServerError(err);
        };
    };

    async deleteById(req: any, res: any, next: any) {
        const { id } = req.params; 
        if(!id) { 
            this.responseHandler.badRequest(res);
        } 
        try {
            this.model.deleteOne({_id: id})
        } catch(err) {
            this.responseHandler.internalServerError(err);
        };
    };
};