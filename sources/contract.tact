import "@stdlib/deploy";

message Add {
    amount: Int as uint32;
}

message Sub {
    amount1: Int as uint32;
    amount2: Int as uint32;
}

message Mul {
    amount1: Int as uint32;
    amount2: Int as uint32;
}

message Div {
    amount1: Int as uint32;
    amount2: Int as uint32;
}

contract SampleTactContract with Deployable {

    owner: Address;
    counter: Int as uint32;

    init(owner: Address) {
        self.owner = owner;
        self.counter = 0;
    }

    fun add(v: Int) {
        
        // Check sender
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        
        // Update counter
        self.counter = (self.counter + v);
    }

    fun sub(v: Int) {
        
        // Check sender
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        
        // Update counter
        if(self.counter > v){
            self.counter = (self.counter - v);
        }else{
            self.counter = 0;
        }
    }

    fun sub2(v: Int, s: Int): Int {
        return v - s;
    }

    fun mul(v: Int, s: Int): Int {
        return v * s;
    }

    fun div(v: Int, s: Int): Int  {
        if(s != 0) {
            return v / s;
        }else{
            return 0;
        }
    }

    receive(msg: Add) {
        self.add(msg.amount);
    }

    receive(msg: Sub) {
        self.sub2(msg.amount1, msg.amount2);
        self.reply("Sub".asComment());
    }

    receive(msg: Mul) {
        self.mul(msg.amount1, msg.amount2);
        self.reply("Mul".asComment());
    }

    receive(msg: Div) {
        self.div(msg.amount1, msg.amount2);
        self.reply("Div".asComment());
    }

    receive("increment") {
        self.add(1);
        self.reply("incremented".asComment());
    }

    receive("decrement") {
        self.sub(1);
        self.reply("decremented".asComment());
    }

    get fun counter(): Int {
        return self.counter;
    }

    get fun getOwner(): Address {
        return self.owner;
    }
}