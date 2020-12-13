import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway()
@Injectable()
export class AppService implements OnGatewayConnection, OnGatewayDisconnect {
  
    @WebSocketServer()
    private server;

    private connectedClients: number = 0;

    async handleConnection() {
      // a client has connected
      this.connectedClients++;

      // notify connected clients of current users
      this.server.emit('connectedclients', this.connectedClients);
    }

    async handleDisconnect() {
      // a client has disconnected
      this.connectedClients--;

      // notify connected clients of current users
      this.server.emit('connectedclients', this.connectedClients);
    }

    /**
     * Message, wenn Master den Status einer Schätzung ändert (z.B. von OPEN zu RUNNING oder von RUNNING zu DONE).
     * @param client 
     * @param currentMaster 
     * @param currentVote 
     */
    @SubscribeMessage('masterVoteChanged')
    async onMasterVoteChanged(client, currentMaster, currentVote) {
      client.broadcast.emit('masterVoteChanged', currentMaster, currentVote);
    }

    /** Message, wenn Member eine Schätzung speichert */
    @SubscribeMessage('memberVoteChanged')
    async onMemberVoteChanged(client, currentMember, currentVote) {
      client.broadcast.emit('memberVoteChanged', currentMember, currentVote);
    }

    @SubscribeMessage('memberVotingStart')
    async onMemberVotingStart(client, currentMember, currentVote) {
      client.broadcast.emit('memberVotingStart', currentMember, currentVote);
    }

    @SubscribeMessage('memberVotingEnd')
    async onMemberVotingEnd(client, currentMember, currentVote) {
      client.broadcast.emit('memberVotingEnd', currentMember, currentVote);
    }
}
