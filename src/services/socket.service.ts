import { Socket, io } from 'socket.io-client';

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private connectPromise: Promise<void> | null = null;
  
  private constructor() {
    this.initSocket();
  }
  
  private initSocket() {
    // Connect to the Socket.IO server
    this.socket = io(process.env.SOCKET_URL as string);
    this.connectPromise = new Promise<void>((resolve, reject) => {
      if (this.socket) {
        this.socket.on('connect', () => {
          console.log('connected');
          resolve();
        });
        this.socket.on('connect_error', (error: any) => {
          reject(error);
        });
      } else {
        reject(new Error('Socket is null'));
      }
    });
  }
  
  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }
  
  getSocket(): Socket | null {
    return this.socket;
  }
}

export default SocketService.getInstance();
