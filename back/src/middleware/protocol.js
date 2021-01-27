let protocolNumber = 0;

module.exports = {
    manageProtocol: async (reset = false) => {
        if (reset){
            protocolNumber = 0;
        }else{
            protocolNumber++;
        }
        return protocolNumber;
    }
}
