class ResponseHandler {

    private message = {
        badRequest : "Error: Bad Request",
        notFound : "Error: Not Found",
        internalServerError : "Error: Internal Server Error",
        ok: "Message: OK",
    };

    public badRequest(res: any) {
        return res.status(400).send(this.message.badRequest);
    };

    public notFound(res: any, message? :string) {
        const body = message ? `Error: ${message}`: this.notFound;
        return res.send(404).message(body);
    };

    public internalServerError(res: any, error?: Error) {
       const body = error ? error : this.internalServerError;
       return res.status(500).send(body);
    };

    public ok(res: any, data?: any) {
        const body = data? `data: ${data}` : this.message.ok;
        return res.status(200).send(data);
    };

};

export default new ResponseHandler();