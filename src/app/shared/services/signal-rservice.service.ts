import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceService {

  messageReceived$ = new Subject<any>();
  connectionEstablished$ = new BehaviorSubject<boolean>(false);

  private hubConnection: signalR.HubConnection;

  readonly apiUrl = environment.baseURL;
 
  constructor(private http: HttpClient) {
    this.createConnection();

  }

  private createConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.None)
    .withAutomaticReconnect()
    .withUrl('/api/notifications',{
      skipNegotiation:false,
      transport: signalR.HttpTransportType.LongPolling
    })
    .build();
    this.registerOnServerEvents();
    this.startConnection();
  }
  private startConnection() {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      return;
    }

    this.hubConnection.start()
      .then(() => {
        console.log('Connection started!');
      })
      .catch(err => console.log('Error while establishing connection :(', err));
  }

    private registerOnServerEvents(): void {
  
      this.hubConnection.on('Send2Message', (data: any) => {
        this.messageReceived$.next(data);
      });
      this.hubConnection.on('SendMessage', (data: any) => {
        this.messageReceived$.next(data);
      });
      this.hubConnection.on('ProcMail', (data: any) => {
        this.messageReceived$.next(data);
      });
      this.hubConnection.onclose((e) => {
        console.log('Connection closed!', e);
      });
      console.log('Trying to connect to hub!');
    }
  }

