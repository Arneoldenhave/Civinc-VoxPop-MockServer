const second   = 1000
const minute   = 60 * second
const hour     = 60 * minute

class TIME {
    second: number  
    minute: number
    hour: number

    constructor() {
        this.second = 1000
        this.minute = 60 * second
        this.hour   = 60 * minute
    }

    SECOND   (amount: number)       { return amount ? amount * this.second : this.second  }
    MINUTE   (amount: number)       { return amount ? amount * this.minute : this.minute  }
    HOUR     (amount: number)       { return amount ? amount * this.hour   : this.hour    } 

    ADD      (date: number, number: number) { return date + number }

    NOW      ()             { return Date.now() }
    FROM_NOW (amount: number)       { return this.NOW() +  amount }   
}

export default new TIME();
