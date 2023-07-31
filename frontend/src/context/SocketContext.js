import { createContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5000");

    socketRef.current.on("disconnect", () => {
      console.log("This user is disconnected");
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{socketRef}}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContext;
