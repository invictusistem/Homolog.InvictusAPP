import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";


@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: ChartModel[];
  public bradcastedData: ChartModel[];
  public connectionId: string;

  private hubConnection: signalR.HubConnection

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chart', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .then(() => this.getConnectionId())
      .catch(err => console.log(err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
   //   console.log(data);
    });
  }

  public getConnectionId = () => {
    this.hubConnection.invoke('getconnectionid').then(
      (data) => {
        console.log(data);
          this.connectionId = data;
        }
    ); 
  }

  public broadcastChartData = () => {
    const data = this.data.map(m => {
      const temp = {
        data: m.data,
        label: m.label
      }
      return temp;
    });
 //   console.log('broadcast GET!!!!!!!!!!!!!!!!!!')
    this.hubConnection.invoke('broadcastchartdata', this.data, this.connectionId)
    .catch(err => console.error(err));
  }


  public addBroadcastChartDataListener = () => {
   // console.log('addBroadcastChartDataListener')
    this.hubConnection.on('broadcastchartdata', (data) => {
      this.bradcastedData = data;
    })
  }
}

export interface ChartModel {
    data: [],
    label: string
}

