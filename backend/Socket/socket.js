let io;

const initSocket = (socketIo) => {
    io = socketIo;
}

const getIo = () => {

    if(!io){
        throw new Error("Socket is not initialized");
    }
    return io;
}

module.exports = { initSocket, getIo }