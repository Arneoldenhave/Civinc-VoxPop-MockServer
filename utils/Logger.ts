const ALogger = function(type: string, moduleName: string) { 

return { 
        spacer : " --- ",
        moduleName: ": " + moduleName,
        type: type,
        msg: "",
        endText: "",

        whiteSpace : function() {
            return new Array(this.spacer.length + 1).join(" ")
        },

        fill : function() {
            const headerText = this.moduleName + this.type
            var half_length = Math.ceil(headerText.length / 2); 
            var lenght = half_length - this.spacer.length  
            var len = lenght - (Math.ceil(this.endText.length / 2))
            return new Array(len + 1).join(" ")
        },
    
        header : function() { 
            return "\n" +  this.spacer + " " + this.type + this.moduleName +  " "  + "\n"
        },

        end : function() {
            return '' // `${this.spacer}${this.whiteSpace()}${this.fill()} ${this.endText} ${this.fill()}${this.whiteSpace()}${this.spacer}`
        },

        setOBJ(obj: any) {
            this.msg += JSON.stringify(obj, null, 2) + "\n"
        },

        set(msg: string) {
            this.msg += msg ?  `${this.whiteSpace()} ${msg}\n` : "";
        },

        log : function (msg: string) {
            this.set(msg);
            console.log(this.header());
            console.log(this.msg);
            console.log(this.end());
            this.clear();
        },

        logOBJ(obj: any) {
            let str = JSON.stringify(obj, null, 2 ) + "\n";
            this.log(str);
        },


        clear : function () {
            this.msg = "";
        }
    }
}
   
const Logger = function(moduleName: string) {
    return ALogger("Logger", moduleName)
}

const NotifactionLogger = function(moduleName: string) {
    return ALogger("Notification", moduleName)
}

const WarningLogger = function(moduleName: string) {
    return ALogger("Warning", moduleName)
}

const ErrorLogger = function(moduleName: string) {
    return ALogger("Error", moduleName)
}


export default { 
    NotifactionLogger,
    WarningLogger,
    ErrorLogger,
    Logger,
}